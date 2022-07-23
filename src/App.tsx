import React, { FC, Suspense } from 'react';

import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';

import Home from './pages/Home';
import { MainLayout } from './components/MainLayout';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));
const FullPizza = React.lazy(() =>
  import(/* webpackChunkName: "FullPizza" */ './components/FullPizza').then((m) => ({
    default: m.FullPizza,
  })),
);

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div className="container">Загрузка корзины...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div className="container">Загрузка корзины...</div>}>
              <NotFound />
            </Suspense>
          }
        />
        <Route
          path="/pizza/:id"
          element={
            <Suspense fallback={<div className="container">Загрузка корзины...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
