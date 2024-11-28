import React, { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { config } from './routerConfig';

const AppRoter: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback="loading...">
        <Routes>
          <Route path={config.home} element={<p>Home</p>} />

          <Route path="*" element={<Navigate to={config.home} />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoter;
