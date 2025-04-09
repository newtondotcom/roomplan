import { Dimensions, Transform } from "@/types/coreModel";
import * as THREE from 'three';
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { SUBTRACTION, Brush, Evaluator } from 'three-bvh-csg';


// Wall Component
export function Wall({ dimensions, transform, cutouts }: { dimensions: Dimensions, transform: Transform, cutouts: { x: number, y: number, width: number, height: number }[] }) {
  const [width, height, depth] = dimensions;
  const meshRef = useRef<THREE.Mesh>(null);

  // Convert the transform array to a THREE.Matrix4
  const matrix = new THREE.Matrix4().fromArray(transform);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.matrix.copy(matrix);
      meshRef.current.matrix.decompose(meshRef.current.position, meshRef.current.quaternion, meshRef.current.scale);
    }
  });

  return (
    <mesh ref={meshRef} >
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
}

// Floor Component
export function Floor({ dimensions, transform }: { dimensions: Dimensions, transform: Transform }) {
  const [width, height] = dimensions;
  const meshRef = useRef<THREE.Mesh>(null);

  // Convert the transform array to a THREE.Matrix4
  const matrix = new THREE.Matrix4().fromArray(transform);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.matrix.copy(matrix);
      meshRef.current.matrix.decompose(meshRef.current.position, meshRef.current.quaternion, meshRef.current.scale);
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial color="lightgray" />
    </mesh>
  );
}

// Door Component
export function Door({ dimensions, transform, isOpen }: { dimensions: Dimensions, transform: Transform, isOpen: boolean }) {
  const [width, height, depth] = dimensions;
  const meshRef = useRef<THREE.Mesh>(null);

  // Convert the transform array to a THREE.Matrix4
  const matrix = new THREE.Matrix4().fromArray(transform);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.matrix.copy(matrix);
      meshRef.current.matrix.decompose(meshRef.current.position, meshRef.current.quaternion, meshRef.current.scale);

      // Rotate the door if it's open
      if (isOpen) {
        meshRef.current.rotation.y = -Math.PI / 2; // Rotate 90 degrees around the Y-axis
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial color="brown" />
    </mesh>
  );
}

// Window Component
export function Window({ dimensions, transform }: { dimensions: Dimensions, transform: Transform }) {
  const [width, height, depth] = dimensions;
  const meshRef = useRef<THREE.Mesh>(null);

  // Convert the transform array to a THREE.Matrix4
  const matrix = new THREE.Matrix4().fromArray(transform);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.matrix.copy(matrix);
      meshRef.current.matrix.decompose(meshRef.current.position, meshRef.current.quaternion, meshRef.current.scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial color="blue" transparent opacity={0.5} />
    </mesh>
  );
}
