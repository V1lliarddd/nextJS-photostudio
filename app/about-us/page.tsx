import '../components/AboutUsSpotlight/Spotlight';
import Spotlight from '../components/AboutUsSpotlight/Spotlight';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — Photostudio | Our Team & Story',
  description:
    'Learn about our professional photography studio, our team of experienced photographers, and our passion for capturing unforgettable moments.',
  alternates: {
    canonical: '/about-us',
  },
};

export default function AboutUs() {
  return <Spotlight />;
}
