// components/ParticleBackground.js
import React, { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

function ParticleField() {
  const pointsRef = useRef()
  const particles = useMemo(() => {
    const count = 1000
    const temp = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      temp[i] = (Math.random() - 0.5) * 10
    }
    return temp
  }, [])

  useEffect(() => {
    // Animate rotation with GSAP
    gsap.to(pointsRef.current.rotation, {
      y: Math.PI * 2,
      repeat: -1,
      ease: 'none',
      duration: 60,
    })
  }, [])

  return (
    <Points ref={pointsRef} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  )
}

export default function ParticleBackground() {
  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100%',
        height: '100%',
      }}
      camera={{ position: [0, 0, 5], fov: 75 }}
    >
      <ambientLight intensity={0.5} />
      <ParticleField />
    </Canvas>
  )
}
