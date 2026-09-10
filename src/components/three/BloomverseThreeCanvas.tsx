'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface BloomverseThreeCanvasProps {
  className?: string;
  showMandala?: boolean;
  particleCount?: number;
  interactive?: boolean;
}

export default function BloomverseThreeCanvas({
  className = '',
  showMandala = true,
  particleCount = 80,
  interactive = true,
}: BloomverseThreeCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Scene & Camera
    const width = mount.clientWidth || window.innerWidth || 800;
    const height = mount.clientHeight || window.innerHeight || 600;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      height > 0 ? width / height : 1,
      0.1,
      1000
    );
    camera.position.z = 25;

    // 2. WebGL Renderer with safe fallback
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.domElement.style.pointerEvents = 'none';
      mount.appendChild(renderer.domElement);
    } catch {
      return;
    }

    // 3. Stardust Particle System (Subtle & Elegant)
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const goldColor = new THREE.Color('#D4A853');
    const lavenderColor = new THREE.Color('#B8A9C9');

    for (let i = 0; i < particleCount; i++) {
      const radius = 10 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      positions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      positions[i * 3 + 1] = radius * Math.sin(phi);
      positions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi) - 5;

      const chosenColor = Math.random() < 0.5 ? goldColor : lavenderColor;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      gradient.addColorStop(0.3, 'rgba(212, 168, 83, 0.4)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.45,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
      opacity: 0.4,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 4. Botanical Runic Mandala Rings (if enabled)
    const mandalaGroup = new THREE.Group();
    mandalaGroup.position.set(0, 2, -4);

    if (showMandala) {
      // Outer ring
      const ringGeo1 = new THREE.RingGeometry(6.5, 6.55, 64);
      const ringMat1 = new THREE.MeshBasicMaterial({
        color: 0xd4a853,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.25,
      });
      const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
      mandalaGroup.add(ring1);

      // Middle petal segmented ring
      const ringGeo2 = new THREE.RingGeometry(4.8, 4.85, 32);
      const ringMat2 = new THREE.MeshBasicMaterial({
        color: 0xb8a9c9,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.2,
      });
      const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
      mandalaGroup.add(ring2);

      // Inner ornate 8-petal mandala structure
      const innerGroup = new THREE.Group();
      for (let i = 0; i < 8; i++) {
        const petalCurve = new THREE.EllipseCurve(
          0,
          2.2,
          0.7,
          1.8,
          0,
          2 * Math.PI,
          false,
          0
        );
        const points = petalCurve.getPoints(24);
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        const lineMat = new THREE.LineBasicMaterial({
          color: 0xd4a853,
          transparent: true,
          opacity: 0.18,
        });
        const petal = new THREE.Line(lineGeo, lineMat);
        petal.rotation.z = (i * Math.PI) / 4;
        innerGroup.add(petal);
      }
      mandalaGroup.add(innerGroup);

      // Subtle star core
      const coreGeo = new THREE.RingGeometry(1.2, 1.25, 24);
      const coreMat = new THREE.MeshBasicMaterial({
        color: 0xd4a853,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35,
      });
      mandalaGroup.add(new THREE.Mesh(coreGeo, coreMat));

      scene.add(mandalaGroup);
    }

    // 5. Floating Firefly Orbs (Subtle)
    const fireflyCount = 6;
    const fireflies: {
      mesh: THREE.Mesh;
      basePos: THREE.Vector3;
      speed: number;
      offset: number;
    }[] = [];

    const fireflyGeo = new THREE.SphereGeometry(0.1, 8, 8);
    const fireflyMat = new THREE.MeshBasicMaterial({
      color: 0xf5ede0,
      transparent: true,
      opacity: 0.4,
    });

    for (let i = 0; i < fireflyCount; i++) {
      const mesh = new THREE.Mesh(fireflyGeo, fireflyMat);
      const basePos = new THREE.Vector3(
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 12
      );
      mesh.position.copy(basePos);
      scene.add(mesh);

      fireflies.push({
        mesh,
        basePos,
        speed: 0.5 + Math.random() * 0.8,
        offset: Math.random() * Math.PI * 2,
      });
    }

    // 6. Interactive Mouse Physics
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = mount.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 2.5;
      targetY = -y * 2.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;

      camera.position.x = mouseX * 2;
      camera.position.y = mouseY * 1.5;
      camera.lookAt(0, 0, 0);

      // Rotate stardust
      particles.rotation.y = elapsedTime * 0.04;
      particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05;

      // Rotate Mandala
      if (showMandala) {
        mandalaGroup.rotation.z = elapsedTime * 0.03;
        mandalaGroup.rotation.y = Math.sin(elapsedTime * 0.05) * 0.15;
      }

      // Animate fireflies with organic bobbing
      fireflies.forEach((f) => {
        const t = elapsedTime * f.speed + f.offset;
        f.mesh.position.x = f.basePos.x + Math.sin(t) * 1.2;
        f.mesh.position.y = f.basePos.y + Math.cos(t * 1.3) * 1.2;
        f.mesh.position.z = f.basePos.z + Math.sin(t * 0.7) * 0.8;
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 8. Responsive Resize
    const handleResize = () => {
      if (!mount || !renderer) return;
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (width <= 0 || height <= 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(mount);

    // 9. Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);

      particleGeo.dispose();
      particleMat.dispose();
      particleTexture.dispose();
      fireflyGeo.dispose();
      fireflyMat.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [interactive, particleCount, showMandala]);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: 1 }}
    />
  );
}
