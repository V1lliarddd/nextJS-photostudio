import { Metadata } from 'next';
import Spotlight from './components/Spotlight/Spotlight';

export const metadata: Metadata = {
  title: 'Photostudio — Professional Photography & Videography',
  description:
    'We create unforgettable moments. Professional photography, videography, and retouching studio.',
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return <Spotlight />;
}
