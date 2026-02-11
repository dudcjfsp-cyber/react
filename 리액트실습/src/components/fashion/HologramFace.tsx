import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// 1. Particle Cloud (Starfield / Data points)
const Particles = (props: any) => {
    const ref = useRef<any>();
    const [sphere] = useState(() => {
        const Float32Array = (window as any).Float32Array || Float32Array; // Safety check
        // Generate random points in a sphere
        const count = 1000; // Number of particles
        const positions = new Float32Array(count * 3);
        const radius = 1.5;
        for (let i = 0; i < count; i++) {
            const r = radius * Math.cbrt(Math.random());
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
        }
        return positions;
    });

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#00f3ff"
                    size={0.02}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

// 2. Main Cyber Core (Wireframe Sphere)
const CyberCore = () => {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame(({ mouse }) => {
        // Mouse interaction: Rotate towards mouse
        const x = (mouse.x * Math.PI) / 10;
        const y = (mouse.y * Math.PI) / 10;

        meshRef.current.rotation.x = -y;
        meshRef.current.rotation.y = x;
    });

    return (
        <Sphere args={[1, 32, 32]} ref={meshRef}>
            <MeshDistortMaterial
                color="#7000ff"
                attach="material"
                distort={0.4} // Wobbly effect
                speed={2}
                roughness={0}
                metalness={1}
                wireframe // Show wireframe
                emissive="#00f3ff"
                emissiveIntensity={0.5}
            />
        </Sphere>
    );
};

// 3. Scanning Ring
const ScanRing = () => {
    const ref = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        ref.current.rotation.x = Math.PI / 2;
        ref.current.rotation.z = t; // Spin
        ref.current.position.y = Math.sin(t) * 1.2; // Move up and down automatically
        ref.current.scale.setScalar(1 + Math.sin(t * 2) * 0.1); // Pulse
    });

    return (
        <mesh ref={ref}>
            <torusGeometry args={[1.6, 0.02, 16, 100]} />
            <meshBasicMaterial color="#bc13fe" transparent opacity={0.6} />
        </mesh>
    );
};

// Main Component
export const HologramFace = () => {
    return (
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
            <Canvas camera={{ position: [0, 0, 4] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} color="#00f3ff" />
                <directionalLight position={[-10, -10, -5]} intensity={1} color="#bc13fe" />

                <Particles />
                <CyberCore />
                <ScanRing />
            </Canvas>
        </div>
    );
};
