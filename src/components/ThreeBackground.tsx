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

    // --- 3D Holographic Purple Globe Group with Red Orbits ---
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Central Wireframe Cyber Sphere (Vibrant Purple / Violet)
    const globeRadius = isMobile ? 16 : 20;
    const globeGeo = new THREE.SphereGeometry(globeRadius, 26, 26);
    const globeMat = new THREE.MeshBasicMaterial({
      color: 0x9333ea,
      wireframe: true,
      transparent: true,
      opacity: 0.32,
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    globeGroup.add(globeMesh);

    // 2. Inner Glowing Core (Deep Violet / Magenta)
    const innerCoreGeo = new THREE.IcosahedronGeometry(globeRadius * 0.7, 1);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    globeGroup.add(innerCoreMesh);

    // 3. Orbital Equatorial Rings (Neon Red / Crimson)
    const ringGeo = new THREE.TorusGeometry(globeRadius * 1.35, 0.45, 8, 56);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xf43f5e,
      transparent: true,
      opacity: 0.5,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo, ringMat1);
    ringMesh1.rotation.x = Math.PI / 2.4;
    globeGroup.add(ringMesh1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xe11d48,
      transparent: true,
      opacity: 0.4,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo, ringMat2);
    ringMesh2.rotation.y = Math.PI / 3;
    globeGroup.add(ringMesh2);

    const ringMat3 = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.3,
    });
    const ringMesh3 = new THREE.Mesh(ringGeo, ringMat3);
    ringMesh3.rotation.z = Math.PI / 4;
    globeGroup.add(ringMesh3);

    // --- 4. Ambient Particle Atmosphere ---
    const particleCount = isMobile ? 120 : 380;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cPurple = new THREE.Color(0xa855f7);
    const cRed = new THREE.Color(0xf43f5e);
    const cDeep = new THREE.Color(0x7c3aed);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const r = globeRadius * 1.5 + Math.random() * (isMobile ? 35 : 55);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      const chosenColor = Math.random() > 0.6 ? cPurple : Math.random() > 0.3 ? cRed : cDeep;
      colors[i3] = chosenColor.r;
      colors[i3 + 1] = chosenColor.g;
      colors[i3 + 2] = chosenColor.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 1.2 : 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- 5. Interactive Click-to-Burst Shockwave Particle System ---
    const burstCount = 70;
    const burstGeo = new THREE.BufferGeometry();
    const burstPos = new Float32Array(burstCount * 3);
    const burstVels: { x: number; y: number; z: number }[] = [];
    const burstColors = new Float32Array(burstCount * 3);

    for (let i = 0; i < burstCount; i++) {
      const i3 = i * 3;
      burstPos[i3] = 0;
      burstPos[i3 + 1] = 0;
      burstPos[i3 + 2] = 0;

      const angle = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const speed = 0.8 + Math.random() * 1.6;

      burstVels.push({
        x: Math.sin(phi) * Math.cos(angle) * speed,
        y: Math.sin(phi) * Math.sin(angle) * speed,
        z: Math.cos(phi) * speed,
      });

      const bColor = Math.random() > 0.5 ? cRed : cPurple;
      burstColors[i3] = bColor.r;
      burstColors[i3 + 1] = bColor.g;
      burstColors[i3 + 2] = bColor.b;
    }

    burstGeo.setAttribute("position", new THREE.BufferAttribute(burstPos, 3));
    burstGeo.setAttribute("color", new THREE.BufferAttribute(burstColors, 3));

    const burstMat = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });

    const burstMesh = new THREE.Points(burstGeo, burstMat);
    scene.add(burstMesh);

    let burstLife = 0;
    let globeScaleTarget = 1;
    let globeScaleCurrent = 1;

    // Trigger shockwave burst on click anywhere
    const handleGlobalClick = () => {
      burstLife = 1.0;
      globeScaleCurrent = 1.12; // Spring pop

      const posAttr = burstGeo.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < burstCount; i++) {
        const i3 = i * 3;
        arr[i3] = (Math.random() - 0.5) * 4;
        arr[i3 + 1] = (Math.random() - 0.5) * 4;
        arr[i3 + 2] = (Math.random() - 0.5) * 4;
      }
      posAttr.needsUpdate = true;
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

    // --- Animation Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;

      // Globe Scale Spring Recovery
      globeScaleCurrent += (globeScaleTarget - globeScaleCurrent) * 0.08;
      globeGroup.scale.set(globeScaleCurrent, globeScaleCurrent, globeScaleCurrent);

      // Globe & Rings Rotation
      globeGroup.rotation.y = elapsed * 0.12 + mouseX * 0.015;
      globeGroup.rotation.x = Math.sin(elapsed * 0.08) * 0.1 - mouseY * 0.015;

      innerCoreMesh.rotation.y = -elapsed * 0.18;
      innerCoreMesh.rotation.z = elapsed * 0.1;

      ringMesh1.rotation.z = elapsed * 0.15;
      ringMesh2.rotation.x = elapsed * 0.12;
      ringMesh3.rotation.y = elapsed * 0.14;

      particles.rotation.y = elapsed * 0.03;
      particles.rotation.x = Math.sin(elapsed * 0.02) * 0.05;

      // Update Particle Burst on Click
      if (burstLife > 0.01) {
        burstLife -= 0.02;
        burstMat.opacity = burstLife * 0.9;

        const posAttr = burstGeo.attributes.position as THREE.BufferAttribute;
        const arr = posAttr.array as Float32Array;

        for (let i = 0; i < burstCount; i++) {
          const i3 = i * 3;
          arr[i3] += burstVels[i].x * 1.4;
          arr[i3 + 1] += burstVels[i].y * 1.4;
          arr[i3 + 2] += burstVels[i].z * 1.4;
        }
        posAttr.needsUpdate = true;
      } else {
        burstMat.opacity = 0;
      }

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
      ringGeo.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      ringMat3.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      burstGeo.dispose();
      burstMat.dispose();
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
