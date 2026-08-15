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

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050811, 0.0018);

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // --- 3D Holographic Core Group ---
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Outer Wireframe Icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(22, 2);
    const icoMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const icoMesh = new THREE.Mesh(icoGeometry, icoMaterial);
    coreGroup.add(icoMesh);

    // 2. Inner Glowing Core Sphere
    const sphereGeo = new THREE.SphereGeometry(14, 32, 32);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      emissive: 0xf43f5e,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.9,
      wireframe: true,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    coreGroup.add(sphereMesh);

    // 3. Cyber Ring Lattice
    const torusGeo = new THREE.TorusGeometry(32, 0.8, 16, 100);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const torusMesh1 = new THREE.Mesh(torusGeo, torusMat);
    torusMesh1.rotation.x = Math.PI / 3;
    coreGroup.add(torusMesh1);

    const torusMesh2 = new THREE.Mesh(torusGeo, torusMat.clone());
    torusMesh2.rotation.y = Math.PI / 4;
    (torusMesh2.material as THREE.MeshBasicMaterial).color.setHex(0x00f0ff);
    coreGroup.add(torusMesh2);

    // --- 4. Interactive Particle Nebula ---
    const particleCount = 1800;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const color1 = new THREE.Color(0x00f0ff);
    const color2 = new THREE.Color(0xf43f5e);
    const color3 = new THREE.Color(0x818cf8);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 30 + Math.random() * 90;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      const mixedColor = Math.random() > 0.5 ? color1.clone().lerp(color2, Math.random()) : color3;
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      scales[i] = Math.random() * 2.5 + 0.8;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle Material with Soft Glow
    const particleMat = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- 5. Orbiting 3D Tech Nodes ---
    const techNodesData = [
      { name: "TensorFlow", color: 0xff6f00, dist: 40, speed: 0.008, yOff: 12 },
      { name: "React", color: 0x61dafb, dist: 46, speed: 0.006, yOff: -8 },
      { name: "Kubernetes", color: 0x326ce5, dist: 52, speed: 0.005, yOff: 16 },
      { name: "Python", color: 0x3776ab, dist: 36, speed: 0.011, yOff: -14 },
      { name: "FastAPI", color: 0x009688, dist: 48, speed: 0.007, yOff: 6 },
      { name: "LangChain", color: 0x10b981, dist: 42, speed: 0.009, yOff: -10 },
      { name: "ServiceNow", color: 0x81b441, dist: 55, speed: 0.004, yOff: 4 },
      { name: "Three.js", color: 0x000000, dist: 38, speed: 0.01, yOff: 0 },
    ];

    const techNodes: { mesh: THREE.Mesh; dist: number; speed: number; angle: number; yOff: number }[] = [];

    techNodesData.forEach((t) => {
      const nodeGeo = new THREE.OctahedronGeometry(2.2, 0);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: t.color,
        emissive: t.color,
        emissiveIntensity: 0.8,
        wireframe: true,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      scene.add(nodeMesh);

      techNodes.push({
        mesh: nodeMesh,
        dist: t.dist,
        speed: t.speed,
        angle: Math.random() * Math.PI * 2,
        yOff: t.yOff,
      });
    });

    // --- Ambient & Point Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00f0ff, 3, 150);
    pointLight1.position.set(40, 30, 40);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xf43f5e, 3, 150);
    pointLight2.position.set(-40, -30, 30);
    scene.add(pointLight2);

    // --- Mouse & Gyro Interactivity ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 25;
      targetY = y * 25;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // --- Animation Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Rotate 3D Core
      icoMesh.rotation.x = elapsedTime * 0.15;
      icoMesh.rotation.y = elapsedTime * 0.2;
      sphereMesh.rotation.y = -elapsedTime * 0.3;

      torusMesh1.rotation.z = elapsedTime * 0.25;
      torusMesh2.rotation.x = elapsedTime * 0.2;

      coreGroup.rotation.y = mouseX * 0.02;
      coreGroup.rotation.x = -mouseY * 0.02;
      coreGroup.position.x = mouseX * 0.3;
      coreGroup.position.y = mouseY * 0.3;

      // Particle Nebula Orbit & Wave
      particles.rotation.y = elapsedTime * 0.04;
      particles.rotation.x = Math.sin(elapsedTime * 0.03) * 0.1;

      // Orbiting Tech Nodes
      techNodes.forEach((node) => {
        node.angle += node.speed;
        node.mesh.position.x = Math.cos(node.angle) * node.dist + mouseX * 0.1;
        node.mesh.position.z = Math.sin(node.angle) * node.dist;
        node.mesh.position.y = node.yOff + Math.sin(elapsedTime * 2 + node.angle) * 3 + mouseY * 0.1;

        node.mesh.rotation.x += 0.02;
        node.mesh.rotation.y += 0.03;
      });

      // Camera dynamic parallax
      camera.position.x += (mouseX * 0.4 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 0.4 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      icoGeometry.dispose();
      icoMaterial.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
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
