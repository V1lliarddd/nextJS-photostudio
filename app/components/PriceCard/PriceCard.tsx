import s from './PriceCard.module.css';

interface PriceCardProps {
  title: string;
  price: string;
  description: string;
}

export default function PriceCard({
  title,
  price,
  description,
}: PriceCardProps) {
  return (
    <>
      <div className={s.card}>
        <h3 className={s.title}>{title}</h3>
        <p className={s.description}>{description}</p>
        <h2 className={s.price}>{price}</h2>
        <button className={s.button}>Try now!</button>
      </div>
    </>
  );
}
