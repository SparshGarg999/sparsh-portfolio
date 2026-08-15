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

    // 1. Central Wireframe Cyber Sphere (Vibrant Purple / Violet - HERO FOCUS)
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

    // 2. Inner Glowing Core (Electric Cyan Ice Blue)
    const innerCoreGeo = new THREE.IcosahedronGeometry(globeRadius * 0.65, 2);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8, // Electric Cyan Ice Blue
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    globeGroup.add(innerCoreMesh);

    // 3. Innermost Radiant Red Nucleus / Solar Reactor Ball
    const nucleusRadius = globeRadius * 0.28;
    const nucleusGeo = new THREE.SphereGeometry(nucleusRadius, 16, 16);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: 0xf43f5e, // Radiant Rose/Red Core
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    globeGroup.add(nucleusMesh);

    // 4. Heat Energy Solar Rays / Corona Filaments radiating from Red Nucleus
    const rayCount = 18;
    const rayGroup = new THREE.Group();
    const rayLines: THREE.Line[] = [];

    for (let r = 0; r < rayCount; r++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const innerR = nucleusRadius * 0.9;
      const outerR = nucleusRadius * (1.8 + Math.random() * 1.4);

      const p1 = new THREE.Vector3(
        innerR * Math.sin(phi) * Math.cos(theta),
        innerR * Math.sin(phi) * Math.sin(theta),
        innerR * Math.cos(phi)
      );

      const p2 = new THREE.Vector3(
        outerR * Math.sin(phi) * Math.cos(theta),
        outerR * Math.sin(phi) * Math.sin(theta),
        outerR * Math.cos(phi)
      );

      const rayGeo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      const rayMat = new THREE.LineBasicMaterial({
        color: Math.random() > 0.4 ? 0xf43f5e : 0xfb7185,
        transparent: true,
        opacity: 0.4 + Math.random() * 0.35,
        blending: THREE.AdditiveBlending,
      });

      const line = new THREE.Line(rayGeo, rayMat);
      rayGroup.add(line);
      rayLines.push(line);
    }
    globeGroup.add(rayGroup);

    // 5. Glowing Orbital Rings (Neon Red & Crimson)
    const ringGeo = new THREE.TorusGeometry(globeRadius * 1.38, 0.45, 8, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xf43f5e,
      transparent: true,
      opacity: 0.55,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo, ringMat1);
    ringMesh1.rotation.x = Math.PI / 2.3;
    globeGroup.add(ringMesh1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xe11d48,
      transparent: true,
      opacity: 0.45,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo, ringMat2);
    ringMesh2.rotation.y = Math.PI / 3.2;
    globeGroup.add(ringMesh2);

    const ringMat3 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.3,
    });
    const ringMesh3 = new THREE.Mesh(ringGeo, ringMat3);
    ringMesh3.rotation.z = Math.PI / 4.2;
    globeGroup.add(ringMesh3);

    // 6. Delicate Orbiting Beacons (Reduced Size for sleek hero focus)
    const beaconCount = 3;
    const beaconMeshes: THREE.Mesh[] = [];
    const beaconGeo = new THREE.SphereGeometry(0.45, 6, 6);
    const beaconColors = [0x38bdf8, 0xf43f5e, 0xa855f7];

    for (let b = 0; b < beaconCount; b++) {
      const bMat = new THREE.MeshBasicMaterial({
        color: beaconColors[b],
        transparent: true,
        opacity: 0.85,
      });
      const bMesh = new THREE.Mesh(beaconGeo, bMat);
      globeGroup.add(bMesh);
      beaconMeshes.push(bMesh);
    }

    // --- 7. Delicate Fine Particle Field (Smaller size so Globe is the Hero) ---
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
    const cCyan = new THREE.Color(0x38bdf8);
    const cWhite = new THREE.Color(0xffffff);

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
        colorRoll > 0.65 ? cPurple : colorRoll > 0.35 ? cRed : colorRoll > 0.15 ? cCyan : cWhite;

      colors[i3] = chosenColor.r;
      colors[i3 + 1] = chosenColor.g;
      colors[i3 + 2] = chosenColor.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Delicate stardust size so the 3D globe is the undisputed hero
    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.75 : 0.95,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- 8. Localized Click Ripple Wave State (Only affects clicked location) ---
    interface LocalRipple {
      originX: number;
      originY: number;
      originZ: number;
      progress: number; // 0 to 3.5
    }
    const activeRipples: LocalRipple[] = [];

    const handleContainerClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseNdcX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseNdcY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      // Unproject 2D click point into 3D world space at globe depth (z ~ 0)
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

      // Keep maximum 3 concurrent localized ripples
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

    // --- Silky 60 FPS Fluid Animation Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;

      // Globe & Rings Rotation
      globeGroup.rotation.y = elapsed * 0.1 + mouseX * 0.015;
      globeGroup.rotation.x = Math.sin(elapsed * 0.06) * 0.08 - mouseY * 0.015;

      // Pulse Cyan Inner Core
      innerCoreMesh.rotation.y = -elapsed * 0.16;
      innerCoreMesh.rotation.z = elapsed * 0.1;
      const coreScale = 1 + Math.sin(elapsed * 1.5) * 0.03;
      innerCoreMesh.scale.set(coreScale, coreScale, coreScale);

      // Animate Solar Heat Energy Rays / Corona from Red Nucleus
      rayGroup.rotation.y = elapsed * 0.18;
      rayGroup.rotation.z = -elapsed * 0.12;
      const solarPulse = 1 + Math.sin(elapsed * 3.5) * 0.08;
      rayGroup.scale.set(solarPulse, solarPulse, solarPulse);

      // Ring Rotations
      ringMesh1.rotation.z = elapsed * 0.12;
      ringMesh2.rotation.x = elapsed * 0.1;
      ringMesh3.rotation.y = elapsed * 0.11;

      // Animate Orbiting Beacons along rings
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
        activeRipples[r].progress += 0.015; // Slow, fluid localized wave
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

        // Gentle ambient breathing
        const ambientDrift = Math.sin(elapsed * 0.6 * p.driftSpeed + p.theta * 2 + p.phi) * 0.8;

        let totalDisplacementX = 0;
        let totalDisplacementY = 0;
        let totalDisplacementZ = 0;

        // Apply wave only if near a localized click point
        for (const rip of activeRipples) {
          const dx = p.baseX - rip.originX;
          const dy = p.baseY - rip.originY;
          const dz = p.baseZ - rip.originZ;
          const distFromClick = Math.hypot(dx, dy, dz);

          const waveRadius = rip.progress * 24; // Expanding localized wavefront
          const waveThickness = 18; // Width of the local ripple crest
          const distDiff = distFromClick - waveRadius;

          if (Math.abs(distDiff) < waveThickness && distFromClick > 0.1) {
            const envelope = Math.cos((distDiff / waveThickness) * (Math.PI / 2));
            const fade = Math.max(0, 1 - rip.progress / 3.2);
            const intensity = envelope * fade * 4.5; // Subtle localized pulse

            // Displace radially outward from click origin
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
      innerCoreGeo.dispose();
      innerCoreMat.dispose();
      nucleusGeo.dispose();
      nucleusMat.dispose();
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
