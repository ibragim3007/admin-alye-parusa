import LoginPage from '@/pages/login/LoginPage';
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { config } from './routerConfig';
import CardsPage from '@/pages/cards/CardsPage';
import { authService } from '@/shared/api/api';
import { ClientsPage } from '@/pages/clients';
import { useMe } from '@/entities/me/me.repository';
import { CardsPageLazy } from '@/pages/cards';
import LoaderGeneral from '@/shared/ui/LoaderGeneral';
import { Grid2 } from '@mui/material';

const AppRoter: React.FC = () => {
  const { data, isLoading, isError } = useMe();

  useEffect(() => {
    if (!isLoading && !data) {
      authService.setToken('');
    }
  }, [isLoading, data]);

  if (isLoading) {
    return (
      <Grid2 container justifyContent="center" alignItems="center" height="100vh">
        <LoaderGeneral />
      </Grid2>
    );
  }

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <Grid2 container justifyContent="center" alignItems="center" height="100vh">
            <LoaderGeneral />
          </Grid2>
        }
      >
        {!data?.userName ? (
          <Routes>
            <Route path={config.login} element={<LoginPage />} />
            <Route path="*" element={<Navigate to={config.login} />} />
          </Routes>
        ) : (
          <Routes>
            <Route path={config.cards} element={<CardsPageLazy />}>
              <Route path={':pageNumber'} element={<CardsPageLazy />} />
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
