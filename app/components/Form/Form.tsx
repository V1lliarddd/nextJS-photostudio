import { useRef, useState } from 'react';
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

  const [formData, setFromData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    service: '',
    description: '',
  });

  interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    service: string;
    description: string;
  }

  interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    service?: string;
    description?: string;
  }

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmit, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFromData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }

    if (!formData.service.trim()) {
      newErrors.service = 'Select a service';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setIsError(false);
    setIsSuccess(true);
    console.log('Ну как-будто что-то отправилось и вообще все в шоколаде');
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
    <form className={s.form} onSubmit={handleSubmit}>
      <fieldset className={s.fieldset}>
        <label className={s.input}>
          <input
            ref={firstNameRef}
            value={formData.firstName}
            name="firstName"
            onChange={handleChange}
            type="text"
            placeholder="First Name"
          />
          {errors.firstName && (
            <span className={s.error}>{errors.firstName}</span>
          )}
        </label>
        <label className={s.input}>
          <input
            ref={lastNameRef}
            value={formData.lastName}
            onChange={handleChange}
            type="text"
            name="lastName"
            placeholder="Last Name"
          />
          {errors.lastName && (
            <span className={s.error}>{errors.lastName}</span>
          )}
        </label>
      </fieldset>
      <fieldset className={s.fieldset}>
        <label className={s.input}>
          <input
            ref={emailRef}
            value={formData.email}
            onChange={handleChange}
            type="text"
            name="email"
            placeholder="youremail@domain.com"
          />
          {errors.email && <span className={s.error}>{errors.email}</span>}
        </label>
        <label className={s.input}>
          <select
            ref={serviceRef}
            value={formData.service}
            onChange={handleChange}
            name="service"
          >
            <option value="" disabled>
              Select a service
            </option>
            <option value="photography">Photography</option>
            <option value="videography">Videography</option>
            <option value="retouch">Group Session</option>
          </select>
          {errors.service && <span className={s.error}>{errors.service}</span>}
        </label>
      </fieldset>
      <label className={s.input}>
        <textarea
          ref={descriptionRef}
          value={formData.description}
          onChange={handleChange}
          name="description"
          placeholder="Tell us about your project..."
          rows={8}
        />
        {errors.description && (
          <span className={s.error}>{errors.description}</span>
        )}
      </label>
      <button
        ref={submitRef}
        className={s.submit}
        type="submit"
        disabled={isSubmit}
      >
        Submit
      </button>
    </form>
  );
}
