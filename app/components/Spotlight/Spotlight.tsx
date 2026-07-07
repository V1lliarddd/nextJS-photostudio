'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { IMAGE_DATA } from '../../constants/image-data';
import s from './Spotlight.module.css';
import * as spotlightData from '../../constants/spotlight-data';

export default function Spotlight() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [focusedPanel, setFocusedPanel] = useState(0);
  const prevPanelCountRef = useRef(0);

  const panelCount = isMobile
    ? spotlightData.PANEL_COUNT_MOBILE
    : spotlightData.PANEL_COUNT_DESKTOP;
  const expandedWidth = isMobile
    ? spotlightData.PANEL_WIDTH_EXPANDED_MOBILE
    : spotlightData.PANEL_WIDTH_EXPANDED;

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setTrackWidth(entry.contentRect.width);
      setIsMobile(window.innerWidth < spotlightData.BREAKPOINT_MOBILE);
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
        (panelCount - 1) *
          (spotlightData.PANEL_WIDTH_COLLAPSED + spotlightData.PANEL_GAP) +
        expandedWidth;

      const offsetToCenter = (trackWidth - totalTrackWidth) / 2;

      let left = offsetToCenter;
      for (let i = 0; i < panelIndex; i++) {
        const w =
          i === focusedPanel
            ? expandedWidth
            : spotlightData.PANEL_WIDTH_COLLAPSED;
        left += w + spotlightData.PANEL_GAP;
      }

      const width =
        panelIndex === focusedPanel
          ? expandedWidth
          : spotlightData.PANEL_WIDTH_COLLAPSED;

      return { left, width };
    },
    [focusedPanel, panelCount, expandedWidth, trackWidth],
  );

  const focusPanel = useCallback((index: number) => {
    setFocusedPanel(index);
  }, []);

  const getFocusIndicatorPosition = useCallback(() => {
    return getPanelPosition(focusedPanel);
  }, [focusedPanel, getPanelPosition]);

  const titleData = IMAGE_DATA[focusedPanel];

  return (
    <section className={s.spotlight}>
      <h1 className={s.title}>AGAWA</h1>
      <div className={s.spotlight_track} ref={trackRef}>
        <div className={s.spotlight_panels}>
          <div
            className={s.spotlight_focus_indicator}
            style={getFocusIndicatorPosition()}
          >
            <h2
              className={`${s.spotlight_focus_indicator_title} ${
                isMobile ? s.bottom_full : s.top_full
              }`}
            >
              {titleData[0]}
            </h2>
            <h2 className={s.spotlight_focus_indicator_date}>{titleData[1]}</h2>
          </div>
          {Array.from({ length: panelCount }, (_, i) => (
            <div
              key={`panel-${i}`}
              className={s.spotlight_panel}
              style={getPanelPosition(i)}
              onMouseEnter={!isMobile ? () => focusPanel(i) : undefined}
              onClick={isMobile ? () => focusPanel(i) : undefined}
            >
              <img src={`./images/spotlight-${i + 1}.jpg`} alt="" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
