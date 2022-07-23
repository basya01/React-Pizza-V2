import { ChangeEvent, FC, useCallback, useRef, useState } from 'react';

import debounce from 'lodash.debounce';

import { setSearchValue } from '../../redux/slices/filter';

import styles from './Search.module.scss';
import { RootState, useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';

export const Search:FC = () => {
  const searchValue = useSelector<RootState, string>(state => state.filter.searchValue);
  const [inputValue, setInputValue] = useState(searchValue);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const setSearchValueDebounce = useCallback(
    debounce((str: string) => dispatch(setSearchValue(str)), 800),
    [],
  );

  const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setSearchValueDebounce(event.target.value);
  };

  const xMarkHandler = () => {
    dispatch(setSearchValue(''));
    setInputValue('');
    searchInputRef.current?.focus();
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.searchIcon}
        enableBackground="new 0 0 32 32"
        id="Editable-line"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_42_"
          r="9"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          id="XMLID_44_"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"
        />
      </svg>
      <input
        ref={searchInputRef}
        onChange={(event) => onChangeSearchValue(event)}
        value={inputValue}
        className={styles.input}
        type="text"
        placeholder="Найти пиццу..."
      />
      {inputValue && (
        <svg
          onClick={xMarkHandler}
          className={styles.xmark}
          height ="48"
          viewBox="0 0 48 48"
          width="48"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
          <path d="M0 0h48v48h-48z" fill="none" />
        </svg>
      )}
    </div>
  );
}