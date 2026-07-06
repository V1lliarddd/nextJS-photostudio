'use client';

import s from './Contacts.module.css';
import Form from '../components/Form/Form';

export default function Contacts() {
  return (
    <>
      <section className={s.contacts}>
        <div className={s.heading}>
          <h1 className={s.title}>Get In Touch</h1>
          <p className={s.subtitle}>
            Ready To Create Your Own Piece Of Memory?
          </p>
        </div>
        <div className={s.contacts_content}>
          <Form />
        </div>
      </section>
    </>
  );
}
