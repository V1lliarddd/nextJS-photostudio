import s from './Contacts.module.css';
import Form from '../components/Form/Form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacts — Get in Touch',
  description:
    'Contact us for professional photography, videography and retouching services.',
};

export default function Contacts() {
  return (
    <section className={s.contacts}>
      <div className={s.heading}>
        <h1 className={s.title}>Get In Touch</h1>
        <p className={s.subtitle}>Ready To Create Your Own Piece Of Memory?</p>
      </div>
      <div className={s.contacts_content}>
        <Form />
      </div>
    </section>
  );
}
