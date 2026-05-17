import { useRef, Suspense, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function Model({ wireframe, hovered }: { wireframe: boolean; hovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const hudRef = useRef<THREE.MeshStandardMaterial>(null);
  const portRef = useRef<THREE.MeshStandardMaterial>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.05;
    }
    // Pulsing emissive effect
    if (hudRef.current) {
      hudRef.current.emissiveIntensity = 5 + Math.sin(time * 2) * 3;
    }
    if (portRef.current) {
      portRef.current.emissiveIntensity = 1 + Math.sin(time * 2) * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh 
        ref={meshRef}
      >
        {/* Main Body */}
        <boxGeometry args={[3, 0.8, 2]} />
        <meshStandardMaterial 
          color={hovered ? "#0a0a0a" : "#050505"} 
          roughness={0.15}
          metalness={1}
          wireframe={wireframe}
          transparent={true}
          opacity={wireframe ? 0.8 : 1}
        />
        
        {/* HUD Interface */}
        <mesh position={[0, 0.41, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.5, 64]} />
          <meshStandardMaterial 
            ref={hudRef}
            color="#6EE7F9" 
            emissive="#6EE7F9"
            emissiveIntensity={5}
            toneMapped={false}
            wireframe={wireframe}
          />
        </mesh>

        {/* Diagnostic Port Lights */}
        <mesh position={[1.51, 0, 0]}>
          <boxGeometry args={[0.01, 0.1, 1.2]} />
          <meshStandardMaterial 
            ref={portRef}
            color="#6EE7F9" 
            emissive="#6EE7F9" 
            emissiveIntensity={1} 
            wireframe={wireframe}
          />
        </mesh>
      </mesh>
    </Float>
  );
}

export default function Core3D() {
  const [wireframe, setWireframe] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="w-full h-full relative group cursor-grab active:cursor-grabbing"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* 3D View Controls */}
      <div className="absolute top-6 right-6 z-20 flex flex-col gap-3">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setWireframe(!wireframe);
          }}
          className={`px-3 py-1.5 text-[9px] uppercase tracking-widest font-bold border transition-all duration-300 rounded backdrop-blur-md ${
            wireframe ? 'bg-white text-black border-white' : 'bg-black/40 text-white/40 border-white/10 hover:border-white/40'
          }`}
        >
          {wireframe ? 'Solid' : 'Wireframe'}
        </button>
      </div>

      <Canvas 
        shadows 
        dpr={[1, 2]} 
        gl={{ antialias: true }}
      >
        <PerspectiveCamera makeDefault position={[6, 4, 6]} fov={30} />
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          minDistance={4}
          maxDistance={10}
          zoomSpeed={0.5}   // Smoother zoom
          rotateSpeed={0.5} // Smoother rotation
          makeDefault 
        />
        
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <Suspense fallback={null}>
          <Model wireframe={wireframe} hovered={hovered} />
          
          <ContactShadows 
            position={[0, -1, 0]} 
            opacity={0.6} 
            scale={10} 
            blur={2.5} 
            far={4} 
            color="#000000"
          />
          
          <Environment preset="night" />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-6 left-6 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <p className="text-[9px] uppercase tracking-[0.2em] text-white/20 font-bold">
          {wireframe ? 'Diagnostic Protocol Active' : 'Neural Core Synchronized'}
        </p>
      </div>
    </div>
  );
}

