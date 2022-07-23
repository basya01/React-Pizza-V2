import axios from 'axios';
import { FC, useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './FullPizza.module.scss';

export const FullPizza: FC = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
  }>();

  useEffect(() => {
    const fetchPizzaById = async () => {
      try {
        const { data } = await axios.get('https://62c2b2a5ff594c656762b994.mockapi.io/items/' + id);
        setPizza(data);
      } catch {
        console.log('error');
      }
    };
    fetchPizzaById();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <div className={styles.pizza}>
        <img src={pizza.imageUrl} className={styles.pizzaImage} />
        <div className={styles.pizzaInfo}>
          <h2>{pizza.title}</h2>
        </div>
      </div>
    </div>
  );
};