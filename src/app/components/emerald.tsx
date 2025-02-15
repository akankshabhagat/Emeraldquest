"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Emerald: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return; // Store the reference in a variable and ensure it's not null

    // Initialize scene
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, 800 / 600, 1, 100);
    camera.position.z = 17;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(400, 400);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;

    mount.appendChild(renderer.domElement); // Append renderer to the stored mount reference

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 6);
    directionalLight.position.set(-5, 5, 5);
    scene.add(directionalLight);

    // Geometry and Material setup
    const geometry = new THREE.OctahedronGeometry(6);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x50c878,
      metalness: 1,
      roughness: 3,
      clearcoat: 1,
      clearcoatRoughness: 0,
      reflectivity: 1,
    });

    const octahedron = new THREE.Mesh(geometry, material);
    scene.add(octahedron);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      octahedron.rotation.x += 0.005;
      octahedron.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="" />;
};

export default Emerald;
