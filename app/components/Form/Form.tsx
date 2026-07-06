import { useRef, useState } from 'react';
import s from './Form.module.css';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Form() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const serviceRef = useRef<HTMLSelectElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const submitRef = useRef<HTMLButtonElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('send!');
  };

  useGSAP(() => {
    const timeline = gsap.timeline();

    submitRef.current?.addEventListener('mouseenter', () => {
      gsap.to(submitRef.current, {
        scale: 1.05,
        duration: 0.5,
      });
    });

    submitRef.current?.addEventListener('mouseleave', () => {
      gsap.to(submitRef.current, {
        scale: 1,
        duration: 0.5,
      });
    });

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
  });

  return (
    <form className={s.form}>
      <fieldset className={s.fieldset}>
        <label className={s.input}>
          <input
            ref={firstNameRef}
            type="text"
            placeholder="First Name"
            required
          />
        </label>
        <label className={s.input}>
          <input
            ref={lastNameRef}
            type="text"
            placeholder="Last Name"
            required
          />
        </label>
      </fieldset>
      <label className={s.input}>
        <input
          ref={emailRef}
          type="text"
          placeholder="youremail@domain.com"
          required
        />
      </label>
      <label className={s.input}>
        <select ref={serviceRef} className="" defaultValue="">
          <option value="" disabled>
            Select a service
          </option>
          <option value="photography">Photography</option>
          <option value="videography">Videography</option>
          <option value="retouch">Group Session</option>
        </select>
      </label>
      <label className={s.input}>
        <textarea
          ref={descriptionRef}
          placeholder="Tell us about your project..."
          rows={10}
        />
      </label>
      <button ref={submitRef} className={s.submit} type="submit">
        Submit
      </button>
    </form>
  );
}
