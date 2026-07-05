'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { IMAGE_DATA } from '../../constants.ts/image-data';
import './Spotligh.module.css';

const PANEL_WIDTH_COLLAPSED = 20;
const PANEL_WIDTH_EXPANDED = 400;
const PANEL_WIDTH_EXPANDED_MOBILE = 100;
const PANEL_GAP = 15;
const PANEL_COUNT_DESKTOP = 20;
const PANEL_COUNT_MOBILE = 10;
const BREAKPOINT_MOBILE = 1000;

export default function Spotlight() {
  const trackRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [focusedPanel, setFocusedPanel] = useState(0);
  const prevPanelCountRef = useRef(0);

  const panelCount = isMobile ? PANEL_COUNT_MOBILE : PANEL_COUNT_DESKTOP;
  const expandedWidth = isMobile
    ? PANEL_WIDTH_EXPANDED_MOBILE
    : PANEL_WIDTH_EXPANDED;

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setTrackWidth(entry.contentRect.width);
      setIsMobile(window.innerWidth < BREAKPOINT_MOBILE);
    });
    if (trackRef.current) observer.observe(trackRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (prevPanelCountRef.current !== panelCount) {
      setFocusedPanel(0);
      prevPanelCountRef.current = panelCount;
    }
  }, [panelCount]);

  const getPanelPosition = useCallback(
    (panelIndex: number) => {
      const totalTrackWidth =
        (panelCount - 1) * (PANEL_WIDTH_COLLAPSED + PANEL_GAP) + expandedWidth;

      const offsetToCenter = (trackWidth - totalTrackWidth) / 2;

      let left = offsetToCenter;
      for (let i = 0; i < panelIndex; i++) {
        const w = i === focusedPanel ? expandedWidth : PANEL_WIDTH_COLLAPSED;
        left += w + PANEL_GAP;
      }

      const width =
        panelIndex === focusedPanel ? expandedWidth : PANEL_WIDTH_COLLAPSED;

      return { left, width };
    },
    [focusedPanel, panelCount, expandedWidth, trackWidth]
  );

  const focusPanel = useCallback((index: number) => {
    setFocusedPanel(index);
  }, []);

  const getFocusIndicatorPosition = useCallback(() => {
    return getPanelPosition(focusedPanel);
  }, [focusedPanel, getPanelPosition]);

  const titleData = IMAGE_DATA[focusedPanel];

  return (
    <section className="spotlight">
      <h1 className="text-7xl text-white z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif pointer-events-none">
        AGAWA
      </h1>
      <div className="spotlight-track" ref={trackRef}>
        <div className="spotlight-panels">
          <div
            className="spotlight-focus-indicator"
            style={getFocusIndicatorPosition()}
          >
            <h2
              className={`text-lg text-white absolute mt-2.5 font-serif ${isMobile ? 'bottom-full' : 'top-full'}`}
            >
              {titleData[0]}
            </h2>
            <h2 className="text-lg text-white absolute top-full right-0 mt-2.5 font-serif">
              {titleData[1]}
            </h2>
          </div>
          {Array.from({ length: panelCount }, (_, i) => (
            <div
              key={`${i}`}
              className="spotlight-panel"
              style={getPanelPosition(i)}
              onMouseEnter={!isMobile ? () => focusPanel(i) : undefined}
              onClick={isMobile ? () => focusPanel(i) : undefined}
            >
              <img src={`./images/spotlight-${i + 1}.jpg`} alt="" />
            </div>
          ))}
        </div>
      </div>
      <p
        className={`absolute text-2xl text-white top-11/12 left-1/2 -translate-x-1/2 font-serif ${isMobile ? 'w-full text-center' : ''}`}
      >
        We create unforgettable moments.
      </p>
    </section>
  );
}
