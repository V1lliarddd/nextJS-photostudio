import gsap from 'gsap';
import { Ref, RefObject } from 'react';

interface Refs {
  firstNameRef: RefObject<HTMLInputElement | null>;
  lastNameRef: RefObject<HTMLInputElement | null>;
  emailRef: RefObject<HTMLInputElement | null>;
  serviceRef: RefObject<HTMLSelectElement | null>;
  descriptionRef: RefObject<HTMLTextAreaElement | null>;
  submitRef: RefObject<HTMLButtonElement | null>;
}

function createInitAnimation(refs: Refs): GSAPTimeline {
  const {
    firstNameRef,
    lastNameRef,
    emailRef,
    serviceRef,
    descriptionRef,
    submitRef,
  } = refs;

  const timeline = gsap.timeline();

  timeline
    .fromTo(
      firstNameRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        onComplete: () => firstNameRef.current?.focus(),
      },
      '<0.1',
    )
    .fromTo(
      lastNameRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
      '<0.1',
    )
    .fromTo(
      emailRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
      '<0.1',
    )
    .fromTo(
      serviceRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
      '<0.1',
    )
    .fromTo(
      descriptionRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
    )
    .fromTo(
      submitRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
    );

  return timeline;
}

function createButtonAnimations(refs: Refs) {
  const { submitRef } = refs;

  return {
    onMouseEnterAnimation: () => {
      gsap.to(submitRef.current, {
        scale: 1.05,
        duration: 0.5,
      });
    },
    onMouseLeaveAnimation: () => {
      gsap.to(submitRef.current, {
        scale: 1,
        duration: 0.5,
      });
    },
  };
}

export function initAnimations(refs: Refs) {
  const initAnimation = createInitAnimation(refs);
  const { onMouseEnterAnimation, onMouseLeaveAnimation } =
    createButtonAnimations(refs);

  return { initAnimation, onMouseEnterAnimation, onMouseLeaveAnimation };
}
