import LoginPage from '@/pages/login/LoginPage';
import React, { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { config } from './routerConfig';
import CardsPage from '@/pages/cards/CardsPage';
import { authService } from '@/shared/api/api';

const AppRoter: React.FC = () => {
  const token = authService.getToken();

  return (
    <BrowserRouter>
      <Suspense fallback="loading...">
        {!token ? (
          <Routes>
            <Route path={config.login} element={<LoginPage />} />
            <Route path="*" element={<Navigate to={config.login} />} />
          </Routes>
        ) : (
          <Routes>
            <Route path={config.cards} element={<CardsPage />} />
            <Route path="*" element={<Navigate to={config.login} />} />
          </Routes>
        )}
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoter;
