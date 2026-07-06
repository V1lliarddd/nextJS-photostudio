'use client';

import Link from 'next/link';
import s from './Layout.module.css';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const container = useRef(null);
  const links = useRef<(HTMLAnchorElement | null)[]>([]);
  useGSAP(() => {
    gsap.fromTo(
      links.current,
      {
        y: '-150%',
      },
      {
        y: '0%',
        duration: 0.5,
        stagger: 0.1,
      },
    );
  });

  const setLinkRef = (index: number) => (el: HTMLAnchorElement | null) => {
    links.current[index] = el;
  };

  return (
    <>
      <div className={s.layout_overlay} ref={container}>
        <nav className={s.layout_overlay_nav}>
          <Link ref={setLinkRef(0)} className={s.layout_overlay_link} href="/">
            Main
          </Link>
          <Link
            ref={setLinkRef(1)}
            className={s.layout_overlay_link}
            href="/about-us"
          >
            About Us
          </Link>
          <Link
            ref={setLinkRef(2)}
            className={s.layout_overlay_link}
            href="/contacts"
          >
            Contacts
          </Link>
          <Link
            ref={setLinkRef(3)}
            className={s.layout_overlay_link}
            href="/prices"
          >
            Prices
          </Link>
        </nav>
        {children}
        <h2 className={s.layout_overlay_year}>2026</h2>
      </div>
    </>
  );
}
