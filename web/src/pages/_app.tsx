import { GlobalStyle } from 'components/GlobalStyle';
import { StandardEffects, HTML } from 'drei';
import { LayoutComponent, defaultLayout } from 'libs/layouts';
import { useZoom, useTop } from 'libs/pages';
import { fontSizes } from 'libs/theme';
import { AppProps } from 'next/app';
import React, { Fragment, useState, useRef, Suspense } from 'react';
import { Canvas, DomEventHandlers } from 'react-three-fiber';

type Overwrite<T, U> = Omit<T, keyof U> & U;

type Props = Overwrite<
  AppProps,
  {
    Component: LayoutComponent;
  }
>;

export default function App({ Component, pageProps }: Props) {
  const [events, setEvents] = useState<DomEventHandlers>();
  const domPortal = useRef<HTMLDivElement>(null);

  const withLayout = Component.getLayout ?? defaultLayout;
  const Scene = Component.Scene;

  const zoom = useZoom();
  const [, setTop] = useTop();

  return (
    <Fragment>
      <GlobalStyle />
      <Canvas
        concurrent
        colorManagement
        orthographic
        pixelRatio={1}
        camera={{ zoom, position: [0, 0, 500] }}
        gl={{ alpha: true, logarithmicDepthBuffer: true }}
        onCreated={({ events, gl }) => {
          setEvents(events);
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense
          fallback={
            <HTML center>
              <span
                css={{ fontSize: fontSizes[7].rem }}
                role="img"
                aria-label="loading"
              >
                🚀
              </span>
            </HTML>
          }
        >
          <StandardEffects />
          {Scene && <Scene {...pageProps} domPortal={domPortal} />}
        </Suspense>
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
