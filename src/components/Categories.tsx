import React from 'react';
import { FC } from 'react';

import { setSelectedCategory } from '../redux/slices/filter';
import { useAppDispatch } from '../redux/store';

export const Categories: FC<{ selectedCategory: number }> = React.memo(({ selectedCategory }) => {
  const dispatch = useAppDispatch();
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const handlerCategories = (index: number) => {
    dispatch(setSelectedCategory(index));
  };

  const categoriesJSX = categories.map((value, index) => {
    return (<li
      key={index}
      onClick={() => handlerCategories(index)}
      className={selectedCategory === index ? 'active' : ''}>
      {value}
    </li>);
  });

  return (
    <div className="categories">
      <ul>{categoriesJSX}</ul>
    </div>
  );
});