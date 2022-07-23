import { FC } from 'react';
import ContentLoader from 'react-content-loader';

export const SkeletonPizzaBlock: FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="140" cy="125" r="125" />
    <rect x="0" y="270" rx="11" ry="11" width="280" height="27" />
    <rect x="0" y="315" rx="13" ry="13" width="280" height="88" />
    <rect x="0" y="428" rx="10" ry="10" width="90" height="27" />
    <rect x="128" y="420" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
);