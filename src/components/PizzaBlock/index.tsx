import { useState, FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItem } from '../../redux/slices/cart';
import { useAppDispatch } from '../../redux/store';
import { RootState } from '../../redux/store';

type PizzaBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export const PizzaBlock: FC<PizzaBlockProps> = ({ id, title, price, imageUrl, sizes, types }) => {
  const typesNames = ['тонкая', 'традиционная'];

  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const { count } = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === id),
  ) ?? { count: 0 };

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const addPizzaHandler = () => {
    const itemBase = {
      id,
      title,
      price,
      imageUrl,
      activeType: typesNames[activeType],
      activeSize: sizes[activeSize],
      count: 1,
    };
    dispatch(addItem(itemBase));
  };

  const pizzaImgHandler = () => {
    navigate(`/pizza/${id}`);
  };

  return (
    <div className="pizza-block">
      <img onClick={pizzaImgHandler} className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 onClick={pizzaImgHandler} className="pizza-block__title">
        {title}
      </h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((typeId) => (
            <li
              key={typeId}
              className={activeType === typeId || types.length === 1 ? 'active' : ''}
              onClick={() => setActiveType(typeId)}>
              {typesNames[typeId]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              key={size}
              className={activeSize === index ? 'active' : ''}
              onClick={() => setActiveSize(index)}>
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <div onClick={addPizzaHandler} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          <i>{count}</i>
        </div>
      </div>
    </div>
  );
};