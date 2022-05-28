import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Loading from 'components/Loading';
import styles from './main.module.scss';

const Search = lazy(() => import('pages/Search'));
const PageNotFound = lazy(() => import('pages/PageNotFound'));

const Main = () => {
  return (
    <main className={styles.main}>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<Search />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </main>
  );
};

export default Main;
