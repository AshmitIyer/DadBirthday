'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Flame = ({ position, blownOut }: { position: [number, number, number], blownOut: boolean }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current && !blownOut) {
      ref.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 10) * 0.1;
      ref.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 15) * 0.05;
      ref.current.scale.z = 1 + Math.sin(state.clock.elapsedTime * 15) * 0.05;
    }
  });

  if (blownOut) return null;

  return (
    <mesh position={position} ref={ref}>
      <coneGeometry args={[0.08, 0.3, 16]} />
      <meshStandardMaterial color="#ffa500" emissive="#ff8c00" emissiveIntensity={2} roughness={0.2} transparent opacity={0.9} />
    </mesh>
  );
}

const Candle = ({ position, blownOut }: { position: [number, number, number], blownOut: boolean }) => {
  return (
    <group position={position}>
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} />
      </mesh>
      <Flame position={[0, 0.9, 0]} blownOut={blownOut} />
    </group>
  );
}

const Cake = ({ onBlowOut, blownOut }: { onBlowOut: () => void, blownOut: boolean }) => {
  return (
    <group 
      onClick={onBlowOut} 
      onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }} 
      onPointerOut={(e) => { e.stopPropagation(); document.body.style.cursor = 'auto'; }}
    >
      {/* Plate */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[2.8, 3, 0.2, 64]} />
        <meshStandardMaterial color="#dddddd" metalness={0.2} roughness={0.1} />
      </mesh>
      
      {/* Base Tier */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[2, 2, 1, 64]} />
        <meshStandardMaterial color="#4a2511" roughness={0.9} /> {/* Chocolate */}
      </mesh>
      {/* Frosting Base */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[2.05, 2.05, 0.1, 64]} />
        <meshStandardMaterial color="#ffb6c1" roughness={0.5} /> {/* Pink */}
      </mesh>

      {/* Middle Tier */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.9, 64]} />
        <meshStandardMaterial color="#4a2511" roughness={0.9} />
      </mesh>
      {/* Frosting Middle */}
      <mesh position={[0, 1.45, 0]}>
        <cylinderGeometry args={[1.55, 1.55, 0.1, 64]} />
        <meshStandardMaterial color="#ffb6c1" roughness={0.5} />
      </mesh>

      {/* Top Tier */}
      <mesh position={[0, 1.9, 0]}>
        <cylinderGeometry args={[1, 1, 0.8, 64]} />
        <meshStandardMaterial color="#4a2511" roughness={0.9} />
      </mesh>
      {/* Frosting Top */}
      <mesh position={[0, 2.3, 0]}>
        <cylinderGeometry args={[1.05, 1.05, 0.1, 64]} />
        <meshStandardMaterial color="#ffb6c1" roughness={0.5} />
      </mesh>

      {/* Candles */}
      <Candle position={[-0.5, 2.35, 0]} blownOut={blownOut} />
      <Candle position={[0.5, 2.35, 0]} blownOut={blownOut} />
      <Candle position={[0, 2.35, 0.5]} blownOut={blownOut} />
      <Candle position={[0, 2.35, -0.5]} blownOut={blownOut} />
      <Candle position={[0, 2.35, 0]} blownOut={blownOut} />
    </group>
  );
}

export const CakeSection = () => {
  const [blownOut, setBlownOut] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/audio/song.mp3');
  }, []);

  const handleBlowOut = () => {
    if (!blownOut) {
      setBlownOut(true);
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      }
    }
  };

  return (
    <div className="h-screen w-full bg-transparent relative flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute top-[10%] z-10 text-center pointer-events-none w-full px-4">
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-1000">
          {blownOut ? "Make a wish! 🎉" : "Click the cake to blow out candles!"}
        </h2>
        {!blownOut && (
          <p className="text-white/60 mt-4 text-lg animate-pulse">
            Interact with the 3D cake below
          </p>
        )}
      </div>
      <Canvas camera={{ position: [0, 4, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, 10, -5]} intensity={0.5} />
        {!blownOut && <pointLight position={[0, 4, 0]} intensity={3} color="#ffaa00" distance={15} />}
        <Suspense fallback={null}>
          <Cake onBlowOut={handleBlowOut} blownOut={blownOut} />
        </Suspense>
        <OrbitControls 
          enableZoom={false} 
          maxPolarAngle={Math.PI / 2 + 0.1} 
          minPolarAngle={0} 
          enablePan={false}
          autoRotate={!blownOut}
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
}
