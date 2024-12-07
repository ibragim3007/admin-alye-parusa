import { useMe } from '@/entities/me/me.repository';
import { CardsPageLazy } from '@/pages/cards';
import { ClientsPage } from '@/pages/clients';
import LoginPage from '@/pages/login/LoginPage';
import { authService } from '@/shared/api/api';
import LoaderFullScreen from '@/shared/ui/loader/LoaderFullScreen';
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { config } from './routerConfig';
import { TourPageLazy } from '@/pages/tour';

const AppRoter: React.FC = () => {
  const { data, isLoading } = useMe();

  useEffect(() => {
    if (!isLoading && !data) {
      authService.setToken('');
    }
  }, [isLoading, data]);

  if (isLoading) return <LoaderFullScreen />;

  return (
    <BrowserRouter>
      <Suspense fallback={<LoaderFullScreen />}>
        {!data?.userName ? (
          <Routes>
            <Route path={config.login} element={<LoginPage />} />
            <Route path="*" element={<Navigate to={config.login} />} />
          </Routes>
        ) : (
          <Routes>
            <Route path={config.cards}>
              <Route index element={<CardsPageLazy />} />
              <Route path={':pageNumber'} element={<CardsPageLazy />} />
              <Route path={'id/:cardId'} element={<TourPageLazy />} />
            </Route>
            <Route path={config.clients} element={<ClientsPage />} />
            <Route path="*" element={<Navigate to={config.cards} />} />
          </Routes>
        )}
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoter;
