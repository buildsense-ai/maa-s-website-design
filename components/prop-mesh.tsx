"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type MeshNode = {
  mesh: THREE.Mesh;
  baseScale: number;
  phase: number;
  speed: number;
};

type Edge = {
  a: number;
  b: number;
  line: THREE.Line;
  baseOpacity: number;
  targetOpacity: number;
  fadeSpeed: number;
};

export function PropMesh() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.className = "prop-mesh-canvas";
    renderer.domElement.style.background = "transparent";
    renderer.domElement.style.opacity = "0";
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambient);

    const pointLight = new THREE.PointLight(0x6366f1, 1.2, 10);
    pointLight.position.set(2, 2, 4);
    scene.add(pointLight);

    const networkGroup = new THREE.Group();
    const nodeGroup = new THREE.Group();
    const edgeGroup = new THREE.Group();
    networkGroup.add(nodeGroup);
    networkGroup.add(edgeGroup);
    scene.add(networkGroup);

    const nodes: MeshNode[] = [];
    const nodeCount = 30;
    const nodeGeometry = new THREE.IcosahedronGeometry(0.08, 0);

    for (let i = 0; i < nodeCount; i++) {
      const material = new THREE.MeshPhongMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.8,
        emissive: new THREE.Color(0x3a3cc2),
        emissiveIntensity: 0.8,
        shininess: 80,
      });
      const mesh = new THREE.Mesh(nodeGeometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 4.6,
        (Math.random() - 0.5) * 3.1,
        (Math.random() - 0.5) * 3.6
      );
      nodeGroup.add(mesh);
      nodes.push({
        mesh,
        baseScale: 1,
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 0.6,
      });
    }

    const edges: Edge[] = [];
    const edgeIndex = new Set<string>();
    const maxDistance = 2.6;
    const connectionChance = 0.15;
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodes[i].mesh.position.distanceTo(nodes[j].mesh.position);
        if (dist < maxDistance && Math.random() < connectionChance) {
          const baseOpacity = 0.3 + (1 - dist / maxDistance) * 0.1;
          const geometry = new THREE.BufferGeometry().setFromPoints([
            nodes[i].mesh.position,
            nodes[j].mesh.position,
          ]);
          const material = new THREE.LineBasicMaterial({
            color: 0x8a8dff,
            transparent: true,
            opacity: baseOpacity,
          });
          const line = new THREE.Line(geometry, material);
          edgeGroup.add(line);
          edges.push({
            a: i,
            b: j,
            line,
            baseOpacity,
            targetOpacity: baseOpacity,
            fadeSpeed: 0.8,
          });
          edgeIndex.add(`${i}-${j}`);
        }
      }
    }

    const particleCount = 100;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 6;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 2.5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 2;
      particleSpeeds[i] = 0.006 + Math.random() * 0.01;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x8a8cf5,
      size: 0.02,
      transparent: true,
      opacity: 0.35,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(0, 0);
    let hoveredIndex: number | null = null;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleMouseLeave = () => {
      hoveredIndex = null;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    let lastMetabolize = 0;
    const clock = new THREE.Clock();

    const metabolize = () => {
      if (edges.length < 4) return;
      const toRemove = Math.min(2, edges.length);
      const candidates = [...edges].sort((a, b) => a.baseOpacity - b.baseOpacity);
      for (let i = 0; i < toRemove; i++) {
        const edge = candidates[i];
        edge.targetOpacity = 0;
      }

      let a = Math.floor(Math.random() * nodeCount);
      let b = Math.floor(Math.random() * nodeCount);
      let attempts = 0;
      while ((a === b || edgeIndex.has(`${Math.min(a, b)}-${Math.max(a, b)}`)) && attempts < 10) {
        a = Math.floor(Math.random() * nodeCount);
        b = Math.floor(Math.random() * nodeCount);
        attempts += 1;
      }
      if (a !== b) {
        const dist = nodes[a].mesh.position.distanceTo(nodes[b].mesh.position);
        const geometry = new THREE.BufferGeometry().setFromPoints([
          nodes[a].mesh.position,
          nodes[b].mesh.position,
        ]);
        const material = new THREE.LineBasicMaterial({
          color: 0x8a8dff,
          transparent: true,
          opacity: 0,
        });
        const line = new THREE.Line(geometry, material);
        edgeGroup.add(line);
        const baseOpacity = Math.min(0.8, 0.4 + (1 - dist / maxDistance) * 0.4);
        const edge: Edge = {
          a,
          b,
          line,
          baseOpacity,
          targetOpacity: baseOpacity,
          fadeSpeed: 1.4,
        };
        edges.push(edge);
        edgeIndex.add(`${Math.min(a, b)}-${Math.max(a, b)}`);
      }
    };

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const delta = clock.getDelta();

      if (elapsed - lastMetabolize > 3) {
        lastMetabolize = elapsed;
        metabolize();
      }

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeGroup.children, false);
      hoveredIndex = intersects.length
        ? nodes.findIndex((n) => n.mesh === intersects[0].object)
        : null;

      nodes.forEach((node, idx) => {
        const intensity = Math.sin(elapsed * node.speed + node.phase) * 0.1 + 1;
        const boost = hoveredIndex === idx ? 1.1 : 1;
        const scale = THREE.MathUtils.clamp(intensity, 0.9, 1.1) * boost;
        node.mesh.scale.setScalar(node.baseScale * scale);
        const material = node.mesh.material as THREE.MeshPhongMaterial;
        material.emissiveIntensity = hoveredIndex === idx ? 1.25 : 0.85;
      });

      edges.forEach((edge) => {
        const material = edge.line.material as THREE.LineBasicMaterial;
        const target = edge.targetOpacity;
        const nextOpacity =
          material.opacity + (target - material.opacity) * Math.min(1, delta * edge.fadeSpeed);
        material.opacity = nextOpacity;
        if (hoveredIndex !== null && (edge.a === hoveredIndex || edge.b === hoveredIndex)) {
          material.opacity = Math.min(0.9, material.opacity + 0.25);
        }
      });

      for (let i = edges.length - 1; i >= 0; i--) {
        const edge = edges[i];
        if (edge.targetOpacity === 0) {
          const material = edge.line.material as THREE.LineBasicMaterial;
          if (material.opacity <= 0.02) {
            edgeGroup.remove(edge.line);
            edge.line.geometry.dispose();
            material.dispose();
            const key = `${Math.min(edge.a, edge.b)}-${Math.max(edge.a, edge.b)}`;
            edgeIndex.delete(key);
            edges.splice(i, 1);
          }
        }
      }

      for (let i = 0; i < particleCount; i++) {
        const index = i * 3;
        particlePositions[index] += particleSpeeds[i];
        if (particlePositions[index] > 3) {
          particlePositions[index] = -3;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;

      networkGroup.rotation.y += 0.0005;
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height);
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    renderer.domElement.style.opacity = "1";
    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      nodeGeometry.dispose();
      edges.forEach((edge) => {
        edge.line.geometry.dispose();
        (edge.line.material as THREE.LineBasicMaterial).dispose();
      });
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="prop-mesh-canvas" />;
}
