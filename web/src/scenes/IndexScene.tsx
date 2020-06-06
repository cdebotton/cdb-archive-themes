import { Block } from 'components/Block';
import { useMode } from 'libs/mode';
import { colors } from 'libs/theme';
import React, { useRef, useState, useEffect } from 'react';
import { useFrame, ReactThreeFiber } from 'react-three-fiber';
import { Mesh, Group } from 'three';

export function IndexScene() {
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
          <Dodecahedron size={1.5} position={[2, 3.75, 0]} />
        </Block>
        <Block factor={2}>
          <Dodecahedron size={3} position={[5, -4, 0]} />
        </Block>
      </Block>
      <Orbs />
    </group>
  );
}

function Orbs() {
  const orbs = useRef<Group>(null);

  useFrame(() => {
    orbs.current!.rotation.y += 0.02;
    orbs.current!.rotation.z += 0.01;
    orbs.current!.rotation.z += 0.01;
  });

  return (
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
  );
}

function Orb(props: ReactThreeFiber.Object3DNode<Mesh, typeof Mesh>) {
  const mode = useMode();
  const color = mode === 'light' ? 'black' : 'white';
  const inverse = mode === 'light' ? 'dark' : 'light';
  const light = colors.values.primary[inverse];

  return (
    <mesh {...props}>
      <sphereBufferGeometry attach="geometry" args={[1, 15, 15]} />
      <meshPhongMaterial attach="material" color={color} />
      <pointLight args={[light, 100, 500, 50]} position={[0, 0, 0]} />
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
