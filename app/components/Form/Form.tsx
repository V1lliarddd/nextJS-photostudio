'use client';

import { useRef, useState } from 'react';
import s from './Form.module.css';
import { useGSAP } from '@gsap/react';
import { initAnimations } from './Form.animation';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema, TSchema } from './Form.schema';
import { useForm, SubmitHandler } from 'react-hook-form';

export default function Form() {
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const serviceRef = useRef<HTMLSelectElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const submitRef = useRef<HTMLButtonElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    setError,
  } = useForm<TSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      service: '',
      description: '',
    },
  });

  const onSubmit: SubmitHandler<TSchema> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      reset();
    } catch (e) {
      setError('root', { message: 'Something went wrong :(' });
    }
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
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={s.fieldset}>
        <label className={s.input}>
          <input
            {...register('firstName')}
            ref={(e) => {
              register('firstName').ref(e);
              firstNameRef.current = e;
            }}
            name="firstName"
            type="text"
            placeholder="First Name"
          />
          {errors.firstName && (
            <span className={s.error}>{errors.firstName.message}</span>
          )}
        </label>
        <label className={s.input}>
          <input
            {...register('lastName')}
            ref={(e) => {
              register('lastName').ref(e);
              lastNameRef.current = e;
            }}
            type="text"
            name="lastName"
            placeholder="Last Name"
          />
          {errors.lastName && (
            <span className={s.error}>{errors.lastName.message}</span>
          )}
        </label>
      </fieldset>
      <fieldset className={s.fieldset}>
        <label className={s.input}>
          <input
            {...register('email')}
            ref={(e) => {
              register('email').ref(e);
              emailRef.current = e;
            }}
            type="text"
            name="email"
            placeholder="youremail@domain.com"
          />
          {errors.email && (
            <span className={s.error}>{errors.email.message}</span>
          )}
        </label>
        <label className={s.input}>
          <select
            {...register('service')}
            ref={(e) => {
              register('service').ref(e);
              serviceRef.current = e;
            }}
            name="service"
          >
            <option value="" disabled>
              Select a service
            </option>
            <option value="photography">Photography</option>
            <option value="videography">Videography</option>
            <option value="retouch">Group Session</option>
          </select>
          {errors.service && (
            <span className={s.error}>{errors.service.message}</span>
          )}
        </label>
      </fieldset>
      <label className={s.input}>
        <textarea
          {...register('description')}
          ref={(e) => {
            register('description').ref(e);
            descriptionRef.current = e;
          }}
          name="description"
          placeholder="Tell us about your project..."
          rows={8}
        />
        {errors.description && (
          <span className={s.error}>{errors.description.message}</span>
        )}
      </label>
      <button
        ref={submitRef}
        className={s.submit}
        type="submit"
        disabled={isSubmitting}
      >
        Submit
      </button>
    </form>
  );
}
