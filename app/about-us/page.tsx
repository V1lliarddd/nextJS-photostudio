'use client';

import { useRef } from 'react';
import s from './AboutUs.module.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import TextPlugin from 'gsap/TextPlugin';

export default function AboutUs() {
  const container = useRef<HTMLElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const introPhraseRef = useRef<HTMLHeadingElement | null>(null);
  const firstDescriptionPart = useRef<HTMLParagraphElement | null>(null);
  const secondDescriptionPart = useRef<HTMLParagraphElement | null>(null);
  useGSAP(() => {
    gsap.registerPlugin(TextPlugin);
    const animation = gsap.timeline();
    animation
      .fromTo(
        imageContainerRef.current,
        { left: '100%' },
        { left: '0%', duration: 2 },
      )
      .to(introPhraseRef.current, {
        text: { value: 'we create memories' },
        duration: 1,
      });
    const images = imageContainerRef.current?.querySelectorAll('img');
    images?.forEach((img, index) => {
      const yOffset = index % 2 === 0 ? '-100%' : '100%';

      animation.to(img, {
        y: yOffset,
        duration: 0.7,
        opacity: 0,
      });
    });

    animation.to(introPhraseRef.current, {
      top: '10%',
    });

    animation
      .fromTo(
        firstDescriptionPart.current,
        { left: '100%' },
        { left: '50%', transform: 'translateX(-50%)', top: '20%' },
      )
      .fromTo(
        secondDescriptionPart.current,
        { left: '100%' },
        { left: '50%', transform: 'translateX(-50%)', top: '60%' },
      );
  });
  return (
    <>
      <section ref={container} className={s.about_us}>
        <div className={s.image_container_row} ref={imageContainerRef}>
          <img src="./images/spotlight-1.jpg" alt="" />
          <img src="./images/spotlight-2.jpg" alt="" />
          <img src="./images/spotlight-3.jpg" alt="" />
          <img src="./images/spotlight-4.jpg" alt="" />
          <img src="./images/spotlight-5.jpg" alt="" />
          <h2 ref={introPhraseRef} className={s.image_container_row_text}></h2>
        </div>
        <p ref={firstDescriptionPart} className={s.description}>
          We are a studio where moments are born. Not just photographs, but real
          stories told through the lens. Our approach is a balance between
          technical excellence and pure intuition. We don't shoot "beautiful" —
          we shoot "authentic."
        </p>
        <p ref={secondDescriptionPart} className={s.description}>
          Every project is a new chapter for us. We explore light, shadows, and
          space to create frames that stay in memory. Our team is a collective
          of artists who are passionate about their craft, ready to bring even
          the boldest ideas to life.
        </p>
      </section>
    </>
  );
}
