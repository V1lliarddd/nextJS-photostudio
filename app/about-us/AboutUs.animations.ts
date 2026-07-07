import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import TextPlugin from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/all';
import { RefObject } from 'react';

gsap.registerPlugin(TextPlugin, ScrollTrigger);

interface Refs {
  container: RefObject<HTMLElement | null>;
  imageContainerRef: RefObject<HTMLDivElement | null>;
  introPhraseRef: RefObject<HTMLHeadingElement | null>;
  firstDescriptionPart: RefObject<HTMLHeadingElement | null>;
  secondDescriptionPart: RefObject<HTMLHeadingElement | null>;
}

function createInitialAnimation(refs: Refs) {
  const { container, imageContainerRef, introPhraseRef } = refs;

  const tl = gsap.timeline();

  tl.fromTo(
    imageContainerRef.current,
    {
      left: '100%',
    },
    { left: '0%', duration: 2, ease: 'power4.inOut' },
  ).to(
    introPhraseRef.current,
    {
      text: { value: 'we create memories' },
      duration: 1.5,
      ease: 'power2.inOut',
    },
    '+=0.3',
  );
  const images = imageContainerRef.current?.querySelectorAll('img');
  images?.forEach((img, index) => {
    const yOffset = index % 2 === 0 ? '-100%' : '100%';
    tl.to(
      img,
      {
        y: yOffset,
        duration: 0.7,
        opacity: 0,
        ease: 'power2.inOut',
        onComplete: () => {
          if (index === images.length - 1) {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            if (container.current) {
              container.current.style.overflow = '';
            }
          }
        },
      },
      '+=0.1',
    );
  });

  return tl;
}

function createScrollAnimation(refs: Refs) {
  const {
    container,
    introPhraseRef,
    firstDescriptionPart,
    secondDescriptionPart,
  } = refs;

  const scrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: container.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      pin: false,
    },
  });

  scrollTl
    .to(introPhraseRef.current, {
      top: '10%',
      scale: 0.8,
      opacity: 0.7,
      duration: 1.2,
      ease: 'power2.inOut',
    })
    .fromTo(
      firstDescriptionPart.current,
      {
        left: '100%',
        opacity: 0,
        rotationY: 30,
        filter: 'blur(10px)',
      },
      {
        left: '50%',
        opacity: 1,
        rotationY: 0,
        filter: 'blur(0px)',
        transform: 'translateX(-50%)',
        duration: 2,
        ease: 'power3.out',
        top: '35%',
      },
      0,
    )
    .fromTo(
      secondDescriptionPart.current,
      {
        left: '100%',
        opacity: 0,
        rotationY: -30,
        filter: 'blur(10px)',
      },
      {
        left: '50%',
        opacity: 1,
        rotationY: 0,
        filter: 'blur(0px)',
        transform: 'translateX(-50%)',
        duration: 2,
        ease: 'power3.out',
        top: '65%',
      },
    );

  return scrollTl;
}

export function initAnimations(refs: Refs) {
  const initialAnimation = createInitialAnimation(refs);
  const scrollAnimation = createScrollAnimation(refs);

  return { initialAnimation, scrollAnimation };
}
