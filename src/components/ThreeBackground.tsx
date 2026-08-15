import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeBackgroundProps {
  interactive?: boolean;
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ interactive = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const isMobile = window.innerWidth < 768;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.002);

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      500
    );
    camera.position.z = isMobile ? 110 : 75;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
    container.appendChild(renderer.domElement);

    // --- 3D Holographic Cyber Globe Group ---
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Central Wireframe Cyber Sphere (Vibrant Purple / Violet - Hero Outer Lattice)
    const globeRadius = isMobile ? 16 : 20;
    const globeGeo = new THREE.SphereGeometry(globeRadius, 26, 26);
    const globeMat = new THREE.MeshBasicMaterial({
      color: 0x9333ea, // Vibrant Purple
      wireframe: true,
      transparent: true,
      opacity: 0.38,
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    globeGroup.add(globeMesh);

    // --- 2. SUPER-BRIGHT FLOWING MAGENTA & GOLDEN-AMBER ENERGY BALL CORE ---
    // Layer A: Outer Plasma Energy Current Lattice (Vibrant Electric Neon Magenta)
    const plasmaRadius = globeRadius * 0.65;
    const plasmaGeo = new THREE.IcosahedronGeometry(plasmaRadius, 3);
    const plasmaPosAttr = plasmaGeo.attributes.position as THREE.BufferAttribute;
    const originalPlasmaPositions = new Float32Array(plasmaPosAttr.array);

    const plasmaMat = new THREE.MeshBasicMaterial({
      color: 0xe879f9, // Electric Neon Magenta (Harmonized with Purple & Crimson)
      wireframe: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const plasmaMesh = new THREE.Mesh(plasmaGeo, plasmaMat);
    globeGroup.add(plasmaMesh);

    // Layer B: Swirling Mid Energy Vortex (Radiant Golden-Rose / Neon Crimson)
    const vortexRadius = globeRadius * 0.48;
    const vortexGeo = new THREE.IcosahedronGeometry(vortexRadius, 2);
    const vortexMat = new THREE.MeshBasicMaterial({
      color: 0xf43f5e, // Radiant Neon Crimson
      wireframe: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const vortexMesh = new THREE.Mesh(vortexGeo, vortexMat);
    globeGroup.add(vortexMesh);

    // Layer C: Ultra-Bright White/Gold Fusion Core
    const nucleusRadius = globeRadius * 0.32;
    const nucleusGeo = new THREE.SphereGeometry(nucleusRadius, 20, 20);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: 0xffffff, // Blinding White-Hot Fusion Heart
      wireframe: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    globeGroup.add(nucleusMesh);

    // Layer D: Inner Solid Radiant Golden-Rose Glow Sphere
    const innerGlowGeo = new THREE.SphereGeometry(nucleusRadius * 0.75, 16, 16);
    const innerGlowMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b, // Amber Gold Core Glow
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const innerGlowMesh = new THREE.Mesh(innerGlowGeo, innerGlowMat);
    globeGroup.add(innerGlowMesh);

    // --- 3. Glowing Orbital Rings (Neon Red, Crimson, and Magenta) ---
    const ringGeo = new THREE.TorusGeometry(globeRadius * 1.38, 0.45, 8, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xf43f5e, // Neon Red / Rose
      transparent: true,
      opacity: 0.6,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo, ringMat1);
    ringMesh1.rotation.x = Math.PI / 2.3;
    globeGroup.add(ringMesh1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xe11d48, // Crimson Red
      transparent: true,
      opacity: 0.5,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo, ringMat2);
    ringMesh2.rotation.y = Math.PI / 3.2;
    globeGroup.add(ringMesh2);

    const ringMat3 = new THREE.MeshBasicMaterial({
      color: 0xd946ef, // Electric Magenta Accent Ring
      transparent: true,
      opacity: 0.4,
    });
    const ringMesh3 = new THREE.Mesh(ringGeo, ringMat3);
    ringMesh3.rotation.z = Math.PI / 4.2;
    globeGroup.add(ringMesh3);

    // 4. Orbiting Glowing Light Satellites
    const beaconCount = 3;
    const beaconMeshes: THREE.Mesh[] = [];
    const beaconGeo = new THREE.SphereGeometry(0.45, 6, 6);
    const beaconColors = [0xe879f9, 0xf43f5e, 0xf59e0b];

    for (let b = 0; b < beaconCount; b++) {
      const bMat = new THREE.MeshBasicMaterial({
        color: beaconColors[b],
        transparent: true,
        opacity: 0.9,
      });
      const bMesh = new THREE.Mesh(beaconGeo, bMat);
      globeGroup.add(bMesh);
      beaconMeshes.push(bMesh);
    }

    // --- 5. Delicate Fine Particle Field (Globe is Hero) ---
    const particleCount = isMobile ? 160 : 360;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    interface ParticleData {
      baseX: number;
      baseY: number;
      baseZ: number;
      r: number;
      theta: number;
      phi: number;
      driftSpeed: number;
    }
    const particleData: ParticleData[] = [];

    const cPurple = new THREE.Color(0xa855f7);
    const cRed = new THREE.Color(0xf43f5e);
    const cMagenta = new THREE.Color(0xe879f9);
    const cGold = new THREE.Color(0xf59e0b);

    // Uniform 360-degree spherical distribution
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = globeRadius * 1.45 + Math.random() * (isMobile ? 32 : 50);

      const nx = Math.sin(phi) * Math.cos(theta);
      const ny = Math.sin(phi) * Math.sin(theta);
      const nz = Math.cos(phi);

      const px = nx * r;
      const py = ny * r;
      const pz = nz * r;

      positions[i3] = px;
      positions[i3 + 1] = py;
      positions[i3 + 2] = pz;

      particleData.push({
        baseX: px,
        baseY: py,
        baseZ: pz,
        r,
        theta,
        phi,
        driftSpeed: 0.2 + Math.random() * 0.4,
      });

      const colorRoll = Math.random();
      const chosenColor =
        colorRoll > 0.65 ? cPurple : colorRoll > 0.35 ? cRed : colorRoll > 0.15 ? cMagenta : cGold;

      colors[i3] = chosenColor.r;
      colors[i3 + 1] = chosenColor.g;
      colors[i3 + 2] = chosenColor.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.75 : 0.95,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- 6. Localized Click Ripple Wave State ---
    interface LocalRipple {
      originX: number;
      originY: number;
      originZ: number;
      progress: number;
    }
    const activeRipples: LocalRipple[] = [];

    const handleContainerClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseNdcX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseNdcY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      const vector = new THREE.Vector3(mouseNdcX, mouseNdcY, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distanceToZ0 = -camera.position.z / dir.z;
      const clickWorld = camera.position.clone().add(dir.multiplyScalar(distanceToZ0));

      activeRipples.push({
        originX: clickWorld.x,
        originY: clickWorld.y,
        originZ: clickWorld.z,
        progress: 0,
      });

      if (activeRipples.length > 3) {
        activeRipples.shift();
      }
    };

    window.addEventListener("click", handleContainerClick);

    // --- Mouse Interactivity ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 15;
      targetY = y * 15;
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.position.z = width < 768 ? 110 : 75;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // --- Silky 60 FPS Fluid Energy Animation Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;

      // Outer Globe Rotation
      globeGroup.rotation.y = elapsed * 0.1 + mouseX * 0.015;
      globeGroup.rotation.x = Math.sin(elapsed * 0.06) * 0.08 - mouseY * 0.015;

      // 🌀 FLOWING MAGENTA ENERGY BALL ANIMATION:
      const currentPos = plasmaPosAttr.array as Float32Array;
      const vCount = currentPos.length / 3;

      for (let v = 0; v < vCount; v++) {
        const v3 = v * 3;
        const ox = originalPlasmaPositions[v3];
        const oy = originalPlasmaPositions[v3 + 1];
        const oz = originalPlasmaPositions[v3 + 2];

        // Fluid flowing energy displacement wave function
        const wave =
          Math.sin(elapsed * 3.2 + ox * 0.35 + oy * 0.4) * 0.08 +
          Math.cos(elapsed * 2.4 + oz * 0.4) * 0.06;
        const scale = 1 + wave;

        currentPos[v3] = ox * scale;
        currentPos[v3 + 1] = oy * scale;
        currentPos[v3 + 2] = oz * scale;
      }
      plasmaPosAttr.needsUpdate = true;

      // Counter-Rotating Energy Layers
      plasmaMesh.rotation.y = -elapsed * 0.28;
      plasmaMesh.rotation.z = elapsed * 0.18;

      vortexMesh.rotation.y = elapsed * 0.42;
      vortexMesh.rotation.x = -elapsed * 0.32;
      const vortexPulse = 1 + Math.sin(elapsed * 4.0) * 0.06;
      vortexMesh.scale.set(vortexPulse, vortexPulse, vortexPulse);

      // High-Energy Fusion Nucleus Shimmer
      nucleusMesh.rotation.x = elapsed * 0.5;
      nucleusMesh.rotation.z = -elapsed * 0.45;
      const corePulse = 1 + Math.sin(elapsed * 5.0) * 0.04;
      nucleusMesh.scale.set(corePulse, corePulse, corePulse);

      innerGlowMesh.scale.set(corePulse * 1.1, corePulse * 1.1, corePulse * 1.1);

      // Rings Rotation
      ringMesh1.rotation.z = elapsed * 0.12;
      ringMesh2.rotation.x = elapsed * 0.1;
      ringMesh3.rotation.y = elapsed * 0.11;

      // Animate Orbiting Beacons
      const orbitR = globeRadius * 1.38;
      for (let b = 0; b < beaconCount; b++) {
        const bSpeed = elapsed * (0.6 + b * 0.2);
        beaconMeshes[b].position.set(
          Math.cos(bSpeed) * orbitR,
          Math.sin(bSpeed) * Math.cos(b * 1.2) * orbitR,
          Math.sin(bSpeed) * Math.sin(b * 1.2) * orbitR
        );
      }

      // Progress Localized Ripples
      for (let r = activeRipples.length - 1; r >= 0; r--) {
        activeRipples[r].progress += 0.015;
        if (activeRipples[r].progress > 3.2) {
          activeRipples.splice(r, 1);
        }
      }

      // Update Particle Positions (Localized ripple strictly around clicked point)
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const p = particleData[i];

        const ambientDrift = Math.sin(elapsed * 0.6 * p.driftSpeed + p.theta * 2 + p.phi) * 0.8;

        let totalDisplacementX = 0;
        let totalDisplacementY = 0;
        let totalDisplacementZ = 0;

        for (const rip of activeRipples) {
          const dx = p.baseX - rip.originX;
          const dy = p.baseY - rip.originY;
          const dz = p.baseZ - rip.originZ;
          const distFromClick = Math.hypot(dx, dy, dz);

          const waveRadius = rip.progress * 24;
          const waveThickness = 18;
          const distDiff = distFromClick - waveRadius;

          if (Math.abs(distDiff) < waveThickness && distFromClick > 0.1) {
            const envelope = Math.cos((distDiff / waveThickness) * (Math.PI / 2));
            const fade = Math.max(0, 1 - rip.progress / 3.2);
            const intensity = envelope * fade * 4.5;

            totalDisplacementX += (dx / distFromClick) * intensity;
            totalDisplacementY += (dy / distFromClick) * intensity;
            totalDisplacementZ += (dz / distFromClick) * intensity;
          }
        }

        const scale = (p.r + ambientDrift) / p.r;
        posArr[i3] = p.baseX * scale + totalDisplacementX;
        posArr[i3 + 1] = p.baseY * scale + totalDisplacementY;
        posArr[i3 + 2] = p.baseZ * scale + totalDisplacementZ;
      }
      posAttr.needsUpdate = true;

      particles.rotation.y = elapsed * 0.012;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("click", handleContainerClick);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      globeGeo.dispose();
      globeMat.dispose();
      plasmaGeo.dispose();
      plasmaMat.dispose();
      vortexGeo.dispose();
      vortexMat.dispose();
      nucleusGeo.dispose();
      nucleusMat.dispose();
      innerGlowGeo.dispose();
      innerGlowMat.dispose();
      ringGeo.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      ringMat3.dispose();
      beaconGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden w-full h-full"
      style={{ opacity: 0.95 }}
    />
  );
};

export default ThreeBackground;
