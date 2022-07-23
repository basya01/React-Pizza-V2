import { FC, useEffect } from 'react';
import React, { useState } from 'react';

import { setSelectedSort } from '../redux/slices/filter';
import { useAppDispatch } from '../redux/store';

export const Sort: FC<{ selectedSort: number }> = React.memo(({ selectedSort }) => {
  const dispatch = useAppDispatch();

  const [visiblePopup, setVisiblePopup] = useState(false);

  const sortList = [
    'популярности (по возрастанию)',
    'популярности (по убыванию)',
    'цене (по возрастанию)',
    'цене (по убыванию)',
    'алфавиту (по возрастанию)',
    'алфавиту (по убыванию)',
  ];

  function popupHandler(index: number) {
    dispatch(setSelectedSort(index));
    setVisiblePopup(false);
  }

  useEffect(() => {
    const bodyHandler = (event: Event) => {
      if ((event.target as HTMLBodyElement).closest('.sort')) return;
      setVisiblePopup(false);
    };

    document.body.addEventListener('click', bodyHandler);

    return () => {
      document.body.removeEventListener('click', bodyHandler);
    };
  }, []);

  return (
    <div className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setVisiblePopup(!visiblePopup)}>{sortList[selectedSort]}</span>
      </div>
      {visiblePopup && (
        <div className="sort__popup">
          <ul>
            {sortList.map((name, index) => (
              <li
                onClick={() => popupHandler(index)}
                className={index === selectedSort ? 'active' : ''}
                key={index}>
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});