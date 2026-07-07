'use client';

import { useRef } from 'react';
import s from './AboutUs.module.css';
import { initAnimations } from './AboutUs.animations';
import { useGSAP } from '@gsap/react';

export default function AboutUs() {
  const container = useRef<HTMLElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const introPhraseRef = useRef<HTMLHeadingElement | null>(null);
  const firstDescriptionPart = useRef<HTMLParagraphElement | null>(null);
  const secondDescriptionPart = useRef<HTMLParagraphElement | null>(null);

  useGSAP(() => {
    const refs = {
      container,
      imageContainerRef,
      introPhraseRef,
      firstDescriptionPart,
      secondDescriptionPart,
    };

    const animations = initAnimations(refs);

    return () => animations.unlockScroll();
  });

  return (
    <section ref={container} className={s.about_us}>
      <div className={s.image_container_row} ref={imageContainerRef}>
        <img src="./images/spotlight-1.jpg" loading="lazy" alt="" />
        <img src="./images/spotlight-2.jpg" loading="lazy" alt="" />
        <img src="./images/spotlight-3.jpg" loading="lazy" alt="" />
        <img src="./images/spotlight-4.jpg" loading="lazy" alt="" />
        <img src="./images/spotlight-5.jpg" loading="lazy" alt="" />
        <h2 ref={introPhraseRef} className={s.image_container_row_text}></h2>
      </div>

      <p
        ref={firstDescriptionPart}
        className={`${s.description} ${s.description_first}`}
      >
        We are a studio where moments are born. Not just photographs, but real
        stories told through the lens. Our approach is a balance between
        technical excellence and pure intuition. We don't shoot "beautiful" — we
        shoot "authentic."
      </p>

      <p
        ref={secondDescriptionPart}
        className={`${s.description} ${s.description_second}`}
      >
        Every project is a new chapter for us. We explore light, shadows, and
        space to create frames that stay in memory. Our team is a collective of
        artists who are passionate about their craft, ready to bring even the
        boldest ideas to life.
      </p>
    </section>
  );
}
