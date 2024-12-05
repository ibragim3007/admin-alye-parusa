import LoginPage from '@/pages/login/LoginPage';
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { config } from './routerConfig';
import CardsPage from '@/pages/cards/CardsPage';
import { authService } from '@/shared/api/api';
import { ClientsPage } from '@/pages/clients';
import { useMe } from '@/entities/me/me.repository';

const AppRoter: React.FC = () => {
  const { data, isLoading, isError } = useMe();

  useEffect(() => {
    if (!isLoading && !data) {
      authService.setToken('');
    }
  }, [isLoading, data]);

  return (
    <BrowserRouter>
      <Suspense fallback="loading...">
        {!data?.userName ? (
          <Routes>
            <Route path={config.login} element={<LoginPage />} />
            <Route path="*" element={<Navigate to={config.login} />} />
          </Routes>
        ) : (
          <Routes>
            <Route path={config.cards} element={<CardsPage />} />
            <Route path={config.clients} element={<ClientsPage />} />
            <Route path="*" element={<Navigate to={config.cards} />} />
          </Routes>
        )}
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoter;
