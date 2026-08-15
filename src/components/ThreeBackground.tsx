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

    // 1. Central Wireframe Cyber Sphere (Vibrant Purple / Violet)
    const globeRadius = isMobile ? 16 : 20;
    const globeGeo = new THREE.SphereGeometry(globeRadius, 26, 26);
    const globeMat = new THREE.MeshBasicMaterial({
      color: 0x9333ea, // Vibrant Purple
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    globeGroup.add(globeMesh);

    // 2. Inner Glowing Core (Electric Cyan Ice Blue plasma core)
    const innerCoreGeo = new THREE.IcosahedronGeometry(globeRadius * 0.65, 2);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8, // Electric Cyan Ice Blue
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    globeGroup.add(innerCoreMesh);

    // 3. Center Energy Nucleus (Radiant Crimson Heart)
    const nucleusGeo = new THREE.SphereGeometry(globeRadius * 0.28, 16, 16);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: 0xf43f5e, // Radiant Rose/Red Heart
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    globeGroup.add(nucleusMesh);

    // 4. Glowing Orbital Rings (Neon Red & Crimson)
    const ringGeo = new THREE.TorusGeometry(globeRadius * 1.38, 0.5, 8, 64);
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
      color: 0x38bdf8, // Glowing Cyan Accent Ring
      transparent: true,
      opacity: 0.35,
    });
    const ringMesh3 = new THREE.Mesh(ringGeo, ringMat3);
    ringMesh3.rotation.z = Math.PI / 4.2;
    globeGroup.add(ringMesh3);

    // 5. Orbiting Glowing Light Satellites
    const beaconCount = 4;
    const beaconMeshes: THREE.Mesh[] = [];
    const beaconGeo = new THREE.SphereGeometry(0.8, 8, 8);
    const beaconColors = [0x38bdf8, 0xf43f5e, 0xa855f7, 0xf43f5e];

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

    // --- 6. Uniform Spherical Particle Field with Slow-Motion Fluid Organic Ripple ---
    const particleCount = isMobile ? 180 : 420;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    interface ParticleData {
      nx: number;
      ny: number;
      nz: number;
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
      const r = globeRadius * 1.45 + Math.random() * (isMobile ? 35 : 55);

      const nx = Math.sin(phi) * Math.cos(theta);
      const ny = Math.sin(phi) * Math.sin(theta);
      const nz = Math.cos(phi);

      positions[i3] = nx * r;
      positions[i3 + 1] = ny * r;
      positions[i3 + 2] = nz * r;

      particleData.push({
        nx,
        ny,
        nz,
        r,
        theta,
        phi,
        driftSpeed: 0.3 + Math.random() * 0.4,
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

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 1.4 : 1.7,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Slow-Motion Organic Fluid Ripple State ---
    let rippleProgress = 999; // 999 = idle, 0 to 4.0 = active slow graceful ripple
    let globeImpulse = 0;

    const handleGlobalClick = () => {
      // Trigger slow graceful fluid wave (over ~3.5s)
      rippleProgress = 0;
      globeImpulse = 1.0;
    };

    window.addEventListener("click", handleGlobalClick);

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

      // Gentle Pulse Cyan Inner Core
      innerCoreMesh.rotation.y = -elapsed * 0.16;
      innerCoreMesh.rotation.z = elapsed * 0.1;
      globeImpulse *= 0.96; // Smooth, slow decay
      const coreScale = 1 + Math.sin(elapsed * 1.5) * 0.03 + globeImpulse * 0.08;
      innerCoreMesh.scale.set(coreScale, coreScale, coreScale);

      // Nucleus Spin
      nucleusMesh.rotation.x = elapsed * 0.2;
      nucleusMesh.rotation.y = -elapsed * 0.18;

      // Ring Rotations
      ringMesh1.rotation.z = elapsed * 0.12;
      ringMesh2.rotation.x = elapsed * 0.1;
      ringMesh3.rotation.y = elapsed * 0.11;

      // Animate Orbiting Beacons smoothly along rings
      const orbitR = globeRadius * 1.38;
      for (let b = 0; b < beaconCount; b++) {
        const bSpeed = elapsed * (0.6 + b * 0.2);
        beaconMeshes[b].position.set(
          Math.cos(bSpeed) * orbitR,
          Math.sin(bSpeed) * Math.cos(b * 1.2) * orbitR,
          Math.sin(bSpeed) * Math.sin(b * 1.2) * orbitR
        );
      }

      // Slow-Motion Organic Fluid Wave across particles
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;

      // Advance slow graceful wave progress
      if (rippleProgress < 4.0) {
        rippleProgress += 0.012; // Slow, fluid propagation (takes ~3.5 seconds)
      }

      const waveRadius = globeRadius + rippleProgress * 22; // Gentle outward wavefront speed
      const waveThickness = 28; // Wide, soft, silky wave crest

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const p = particleData[i];

        // Continuous gentle floating organic breathing
        const organicDrift = Math.sin(elapsed * 0.7 * p.driftSpeed + p.theta * 2 + p.phi) * 1.8;

        // Slow graceful ripple wave calculation
        let rippleDisplacement = 0;
        if (rippleProgress < 4.0) {
          const distDiff = p.r - waveRadius;
          if (Math.abs(distDiff) < waveThickness) {
            const envelope = Math.cos((distDiff / waveThickness) * (Math.PI / 2));
            const fade = Math.max(0, 1 - rippleProgress / 4.0);
            rippleDisplacement = envelope * fade * 8.5; // Soft, undulating silky rise
          }
        }

        const finalR = p.r + organicDrift + rippleDisplacement;
        posArr[i3] = p.nx * finalR;
        posArr[i3 + 1] = p.ny * finalR;
        posArr[i3 + 2] = p.nz * finalR;
      }
      posAttr.needsUpdate = true;

      particles.rotation.y = elapsed * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("click", handleGlobalClick);
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
