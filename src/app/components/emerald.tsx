"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Emerald: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Create Scene
    const scene = new THREE.Scene();


    // const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const camera = new THREE.PerspectiveCamera(45, 800/600, 1, 100);
    
    camera.position.z = 17; 

    // Create Renderer (Transparent Background)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(400, 400);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping; // Improved brightness
    renderer.toneMappingExposure = 1.5;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 6);
    directionalLight.position.set(-5, 5, 5);
    scene.add(directionalLight);

    // Create Octahedron (Fixed Size)
    const geometry = new THREE.OctahedronGeometry(6);
    // const material = new THREE.MeshStandardMaterial({
    //   color: 0x16C47F,
    //   metalness: 0.1,
    //   roughness: 0.2,
    // });
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x50C878, // Emerald Green
      metalness: 1, // Fully metallic for reflections
      roughness: 3, // Perfectly smooth surface
      clearcoat: 1, // Adds an extra reflective layer
      clearcoatRoughness: 0, // No roughness for maximum shine
      reflectivity: 1, // Full reflection
    });
    const octahedron = new THREE.Mesh(geometry, material);
    scene.add(octahedron);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      octahedron.rotation.x += 0.005;
      octahedron.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="" />;
};

export default Emerald;
