import { lazy } from 'react';

const TourFormLazy = lazy(() => import('./TourForm'));
const TourFieldsLazy = lazy(() => import('./TourFields/TourFields'));

export { TourFormLazy, TourFieldsLazy };
