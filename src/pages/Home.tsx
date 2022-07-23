import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import qs from 'qs';

import { Categories, Sort, PizzaBlock, SkeletonPizzaBlock, Pagination } from '../components';

import { fetchPizzas, PizzaState } from '../redux/slices/pizza';
import { RootState, useAppDispatch } from '../redux/store';
import { FilterState } from '../redux/slices/filter';

const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { selectedCategory, selectedSort, selectedPage, searchValue } = useSelector<
    RootState,
    FilterState
  >((state) => state.filter);

  const { items, status } = useSelector<RootState, PizzaState>((state) => state.pizza);

  const queryPizzas = async () => {
    const sortProperties = [
      'rating:asc',
      'rating:desc',
      'price:asc',
      'price:desc',
      'title:asc',
      'title:desc',
    ];
    const category = selectedCategory > 0 ? `category=${selectedCategory}` : '';
    const [sortKey, orderValue] = sortProperties[selectedSort].split(':');
    const sortBy = sortKey ? `sortby=${sortKey}` : '';
    const order = orderValue ? `order=${orderValue}` : '';
    const search = searchValue ? `filter=${searchValue}` : '';
    const page = selectedPage + 1 ? `page=${selectedPage + 1}` : '0';

    dispatch(fetchPizzas({ category, sortBy, order, search, page }));
  };

  useEffect(() => {
    const paramsUrl = qs.stringify(
      {
        selectedCategory: selectedCategory > 0 ? selectedCategory : null,
        selectedSort: selectedSort > 0 ? selectedSort : null,
        selectedPage: selectedPage > 0 ? selectedPage : null,
        searchValue: searchValue ? searchValue : null,
      },
      { skipNulls: true },
    );

    navigate(`?${paramsUrl}`);
    queryPizzas();
  }, [selectedCategory, selectedSort, selectedPage, searchValue]);

  const contentItems =
    status === 'pending'
      ? [...new Array(8)].map((_, index) => <SkeletonPizzaBlock key={index} />)
      : items.map((item) => <PizzaBlock key={item.id} {...item} />);

  return (
    <>
      <div className="content__top">
        <Categories selectedCategory={selectedCategory} />
        <Sort selectedSort={selectedSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="pizzas-not-found">
          <span>😕</span>
          <h2>Пиццы не найдены</h2>
          <p>
            К сожалению, произошла ошибка.
            <br />
            Попробуйте выполнить запрос позже.
          </p>
        </div>
      ) : (
        <div className="content__items">{contentItems}</div>
      )}
      <Pagination />
    </>
  );
};

export default Home;
