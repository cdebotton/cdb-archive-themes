import { Block } from 'components/Block';
import { useMode } from 'libs/mode';
import { colors } from 'libs/theme';
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useThree, useFrame, ReactThreeFiber } from 'react-three-fiber';
import { Mesh, Vector2, Group } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

export default function IndexScene() {
  const { gl, scene, camera, size } = useThree();

  const composer = useMemo(() => {
    const composer = new EffectComposer(gl);

    composer.addPass(new RenderPass(scene, camera));

    const res = new Vector2(size.width, size.height);
    const bloom = new UnrealBloomPass(res, 2, 1, 0.991);

    composer.addPass(bloom);

    return composer;
  }, [gl, camera, scene, size]);

  useFrame((_, delta) => {
    composer.render(delta);
  }, 1);

  const orbs = useRef<Group>(null);

  useFrame(() => {
    orbs.current!.rotation.y += 0.02;
    orbs.current!.rotation.z += 0.01;
    orbs.current!.rotation.z += 0.01;
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <spotLight position={[0, 0, 20]} intensity={2} />
      <Block factor={1}>
        <Block factor={1.5}>
          <Dodecahedron size={2} position={[-5, 0, 0]} />
        </Block>
        <Block factor={0.5}>
          <Dodecahedron size={1} position={[-0.5, -3.5, 0]} />
        </Block>
        <Block factor={1}>
          <Dodecahedron size={1.5} position={[2, 2.75, 0]} />
        </Block>
      </Block>
      <Block ref={orbs} offset={1} factor={1}>
        <Block factor={2}>
          <Orb position={[-2, -2, 0]} scale={[0.5, 0.5, 0.5]} />
        </Block>
        <Block factor={3}>
          <Orb position={[1, 2, 0]} />
        </Block>
        <Block factor={4}>
          <Orb position={[2, -3, 0]} />
        </Block>
      </Block>
    </group>
  );
}

function Orb(props: ReactThreeFiber.Object3DNode<Mesh, typeof Mesh>) {
  return (
    <mesh {...props}>
      <sphereBufferGeometry attach="geometry" />
      <meshPhongMaterial attach="material" color="white" />
    </mesh>
  );
}

function Dodecahedron({
  size = 1,
  position = [0, 0, 0] as [number, number, number],
}) {
  const mode = useMode();
  const primary = colors.values.primary[mode];

  useEffect(() => void setColor(primary), [primary]);

  const ref = useRef<Mesh>(null);

  const [color, setColor] = useState(primary);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z = ref.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      ref={ref}
      position={position}
      onPointerOver={() => setColor('hotpink')}
      onPointerOut={() => setColor(primary)}
    >
      <dodecahedronBufferGeometry attach="geometry" args={[size]} />
      <meshPhongMaterial attach="material" color={color} />
    </mesh>
  );
}
