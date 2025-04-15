// src/GLBViewer.tsx
import React, { useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

interface ModelProps {
  url: string;
}

const Model: React.FC<ModelProps> = ({ url }) => {
  const gltf = useGLTF(url);
  return <primitive object={gltf.scene} />;
};

interface GLBViewerProps {
  modelPath: string;
}

const SceneSetup: React.FC = () => {
  const { gl, scene, camera } = useThree();
  const controlsRef = useRef<THREE.OrbitControls>(null);

  useEffect(() => {
    const loadEnvironmentMap = async () => {
      const pmremGenerator = new THREE.PMREMGenerator(gl);
      pmremGenerator.compileCubemapShader();

      const rgbeLoader = new RGBELoader();
      const texture = await new Promise<THREE.DataTexture>((resolve, reject) => {
        rgbeLoader.load(
          'studio_country_hall_1k.hdr',
          (texture) => resolve(texture),
          undefined,
          (error) => reject(error)
        );
      });

      const hdrRenderTarget = pmremGenerator.fromEquirectangular(texture);
      texture.mapping = THREE.EquirectangularReflectionMapping;
      texture.needsUpdate = true;
      window.envMap = hdrRenderTarget.texture;
      hdrRenderTarget.texture.colorSpace = THREE.LinearSRGBColorSpace;

      scene.background = new THREE.Color(0xffffff);
      scene.environment = hdrRenderTarget.texture;
      
      pmremGenerator.dispose();
    };

    loadEnvironmentMap();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      gl.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [gl, scene, camera]);

  useEffect(() => {
    if (controlsRef.current) {
      fitCamera(camera as THREE.PerspectiveCamera, controlsRef.current, [scene]);
    }
  }, [camera, scene]);

  const fitCamera = (
    camera: THREE.PerspectiveCamera,
    controls: THREE.OrbitControls,
    selection: THREE.Group[],
    fitOffset = 1.5
  ): void => {
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    const box = new THREE.Box3();

    box.makeEmpty();
    for (const object of selection) {
      box.expandByObject(object);
    }

    box.getSize(size);
    box.getCenter(center);

    const maxSize = Math.max(size.x, size.y, size.z);
    const fitHeightDistance = maxSize / (2 * Math.atan((Math.PI * camera.fov) / 360));
    const fitWidthDistance = fitHeightDistance / camera.aspect;
    const distance = fitOffset * Math.max(fitHeightDistance, fitWidthDistance);

    const direction = controls.target
      .clone()
      .sub(camera.position)
      .normalize()
      .multiplyScalar(distance);

    controls.maxDistance = distance * 10;
    controls.target.copy(center);

    camera.near = distance / 100;
    camera.far = distance * 100;
    camera.updateProjectionMatrix();

    camera.position.copy(controls.target).sub(direction);

    controls.update();
  };

  return <OrbitControls ref={controlsRef} />;
};

const GLBViewer: React.FC<GLBViewerProps> = ({ modelPath }) => {
  return (
    <div className="flex flex-col items-center justify-center align-center h-screen">
    <Canvas style={{height : "90vh", width : "90vw"}} className='border-indigo-200 border-2'>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} />
      <Model url={modelPath} />
      <SceneSetup />
    </Canvas>
    </div>
  );
};

export default GLBViewer;
