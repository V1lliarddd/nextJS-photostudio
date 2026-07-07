import { useRef } from 'react';
import s from './Form.module.css';
import { useGSAP } from '@gsap/react';
import { initAnimations } from './Form.animation';

export default function Form() {
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
    const refs = {
      firstNameRef,
      lastNameRef,
      emailRef,
      serviceRef,
      descriptionRef,
      submitRef,
    };

    const { initAnimation, onMouseEnterAnimation, onMouseLeaveAnimation } =
      initAnimations(refs);

    submitRef.current?.addEventListener('mouseenter', () => {
      onMouseEnterAnimation();
    });

    submitRef.current?.addEventListener('mouseleave', () => {
      onMouseLeaveAnimation();
    });

    initAnimation.play();
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
