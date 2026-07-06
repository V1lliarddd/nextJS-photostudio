import s from './Contacts.module.css';

export default function Contacts() {
  return (
    <>
      <section className={s.contacts}>
        <div className={s.heading}>
          <h1 className={s.title}>Let's get in touch</h1>
          <p className={s.subtitle}>
            Ready to create your own piece of memory?
          </p>
        </div>
        <div className={s.contacts_content}>
          <div className={s.contacts_left_side}>
            <div className={s.contacts_left_side_info}>
              <h3>Manhattan, New York</h3>
              <h3>2024</h3>
            </div>
            <div className={s.contacts_left_side_info}>
              <h3>Office hours</h3>
              <h3>Monday - Friday</h3>
              <h3>11 AM - 2 PM</h3>
            </div>
          </div>
          <div className={s.contacts_right_side}></div>
        </div>
      </section>
    </>
  );
}
