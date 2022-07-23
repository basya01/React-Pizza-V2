import { FC } from 'react';
import ReactPaginate from 'react-paginate';

import { setSelectedPage } from '../../redux/slices/filter';
import { useAppDispatch } from '../../redux/store';

import styles from './Pagination.module.scss';

export const Pagination: FC = () => {
  const dispatch = useAppDispatch();

  const handlePageClick = (selected: number) => {
    dispatch(setSelectedPage(selected));
  };

  return (
    <>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={({ selected }) => handlePageClick(selected)}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel="<"
      />
    </>
  );
};
