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

    // 2. Inner Glowing Core (Electric Cyan / Ice Blue plasma core that creates high contrast)
    const innerCoreGeo = new THREE.IcosahedronGeometry(globeRadius * 0.65, 2);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8, // Electric Cyan Ice Blue
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    globeGroup.add(innerCoreMesh);

    // 3. Ultra-Dense Center Energy Nucleus
    const nucleusGeo = new THREE.SphereGeometry(globeRadius * 0.3, 16, 16);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: 0xf43f5e, // Radiant Rose/Red Heart
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    globeGroup.add(nucleusMesh);

    // 4. Glowing Orbital Rings (Neon Red & Crimson with High Opacity)
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

    // --- 5. Orbiting Glowing Light Beacons / Satellites ---
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

    // --- 6. Particle Field with Smooth Blackhole Gravitational Singularity ---
    const particleCount = isMobile ? 180 : 420;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originPositions: { x: number; y: number; z: number; speed: number; angle: number; r: number }[] = [];
    const colors = new Float32Array(particleCount * 3);

    const cPurple = new THREE.Color(0xa855f7);
    const cRed = new THREE.Color(0xf43f5e);
    const cCyan = new THREE.Color(0x38bdf8);
    const cWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const r = globeRadius * 1.4 + Math.random() * (isMobile ? 40 : 65);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const px = r * Math.sin(phi) * Math.cos(theta);
      const py = r * Math.sin(phi) * Math.sin(theta);
      const pz = r * Math.cos(phi);

      positions[i3] = px;
      positions[i3 + 1] = py;
      positions[i3 + 2] = pz;

      originPositions.push({
        x: px,
        y: py,
        z: pz,
        speed: 0.2 + Math.random() * 0.5,
        angle: theta,
        r: r,
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
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Black Hole Gravitational Pull State ---
    let blackHoleTarget = 0; // 0 = normal orbit, 1 = maximum gravitational collapse
    let blackHoleCurrent = 0;

    const handleGlobalClick = () => {
      // Trigger smooth black hole gravitational collapse
      blackHoleTarget = 1.0;
      setTimeout(() => {
        blackHoleTarget = 0; // Smooth recovery back to orbit
      }, 700);
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

    // --- Silky 60 FPS Animation Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;

      // Smooth Black Hole Gravitational Lerp
      blackHoleCurrent += (blackHoleTarget - blackHoleCurrent) * 0.07;

      // Globe & Rings Rotation
      globeGroup.rotation.y = elapsed * 0.12 + mouseX * 0.015;
      globeGroup.rotation.x = Math.sin(elapsed * 0.08) * 0.1 - mouseY * 0.015;

      // Pulse Cyan Inner Core
      innerCoreMesh.rotation.y = -elapsed * 0.22;
      innerCoreMesh.rotation.z = elapsed * 0.15;
      const coreScale = 1 + Math.sin(elapsed * 2) * 0.04 + blackHoleCurrent * 0.25;
      innerCoreMesh.scale.set(coreScale, coreScale, coreScale);

      // Nucleus Spin
      nucleusMesh.rotation.x = elapsed * 0.3;
      nucleusMesh.rotation.y = -elapsed * 0.25;

      // Ring Rotations
      ringMesh1.rotation.z = elapsed * 0.16;
      ringMesh2.rotation.x = elapsed * 0.13;
      ringMesh3.rotation.y = elapsed * 0.15;

      // Animate Orbiting Beacons along rings
      const orbitR = globeRadius * 1.38;
      for (let b = 0; b < beaconCount; b++) {
        const bSpeed = elapsed * (0.8 + b * 0.3);
        beaconMeshes[b].position.set(
          Math.cos(bSpeed) * orbitR,
          Math.sin(bSpeed) * Math.cos(b * 1.2) * orbitR,
          Math.sin(bSpeed) * Math.sin(b * 1.2) * orbitR
        );
      }

      // Gravitational Particle Dynamics (Smooth Black Hole Attraction on Click)
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const orig = originPositions[i];

        // Orbit drift
        const currentAngle = orig.angle + elapsed * 0.04 * orig.speed;
        const currentRadius = orig.r * (1 - blackHoleCurrent * 0.75); // Shrinks inward toward 25% radius on blackhole pull

        // Tangential vortex rotation when collapsing
        const vortexAngle = currentAngle + blackHoleCurrent * 1.8;

        const targetPx = (orig.x / orig.r) * currentRadius * Math.cos(vortexAngle);
        const targetPy = (orig.y / orig.r) * currentRadius;
        const targetPz = (orig.z / orig.r) * currentRadius * Math.sin(vortexAngle);

        posArr[i3] += (targetPx - posArr[i3]) * 0.08;
        posArr[i3 + 1] += (targetPy - posArr[i3 + 1]) * 0.08;
        posArr[i3 + 2] += (targetPz - posArr[i3 + 2]) * 0.08;
      }
      posAttr.needsUpdate = true;

      particles.rotation.y = elapsed * 0.02;

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
