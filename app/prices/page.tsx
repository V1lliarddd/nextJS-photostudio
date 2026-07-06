import s from './Prices.module.css';
import { services } from '../constants/service-data';
import PriceCard from '../components/PriceCard/PriceCard';

export default function Prices() {
  return (
    <>
      <section className={s.prices}>
        {services.map((service) => (
          <PriceCard
            description={service.description}
            key={service.id}
            price={service.price}
            title={service.title}
          />
        ))}
      </section>
    </>
  );
}
