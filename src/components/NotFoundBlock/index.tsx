import { FC } from 'react';

import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock: FC = () => {
  return (
    <h1 className={styles.root}>
      <span>😢</span>
      <br />
      Страница не найдена
    </h1>
  );
};