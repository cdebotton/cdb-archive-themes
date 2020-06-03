import { GlobalStyle } from 'components/GlobalStyle';
import { LayoutComponent, defaultLayout } from 'libs/layouts';
import { useMode } from 'libs/mode';
import { useZoom, useTop } from 'libs/pages';
import { colors } from 'libs/theme';
import { AppProps } from 'next/app';
import React, { Fragment, useState, useRef, useEffect } from 'react';
import { Canvas, PointerEvents, useThree } from 'react-three-fiber';

type Overwrite<T, U> = Omit<T, keyof U> & U;

type Props = Overwrite<
  AppProps,
  {
    Component: LayoutComponent;
  }
>;

export default function App({ Component, pageProps }: Props) {
  const [events, setEvents] = useState<PointerEvents>();
  const domPortal = useRef<HTMLDivElement>(null);

  const withLayout = Component.getLayout ?? defaultLayout;
  const Scene = Component.Scene;
  const mode = useMode();
  const zoom = useZoom();
  const [, setTop] = useTop();

  return (
    <Fragment>
      <GlobalStyle />
      <Canvas
        concurrent
        orthographic
        pixelRatio={1}
        camera={{ zoom, position: [0, 0, 500] }}
        gl={{ alpha: true }}
        onCreated={({ events, gl }) => {
          setEvents(events);
          gl.setClearColor(colors.values.background[mode]);
        }}
      >
        <Background />
        {Scene && <Scene {...pageProps} domPortal={domPortal} />}
      </Canvas>
      <div
        {...events}
        onScroll={(e) => void setTop(e.currentTarget.scrollTop)}
        ref={domPortal}
        css={{
          width: '100%',
          height: '100vh',
          position: 'absolute',
          top: 0,
          overflow: 'auto',
        }}
      >
        <div
          css={{ position: 'sticky', top: 0, width: '100%', minHeight: '100%' }}
        >
          {withLayout(<Component {...pageProps} />)}
        </div>
      </div>
    </Fragment>
  );
}

function Background() {
  const { gl } = useThree();
  const mode = useMode();

  useEffect(() => {
    gl.setClearColor(colors.values.background[mode]);
  }, [gl, mode]);

  return null;
}
