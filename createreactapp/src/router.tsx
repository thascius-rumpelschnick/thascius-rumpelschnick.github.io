import React, { lazy } from 'react';
import { createBrowserRouter } from "react-router-dom";

const App = lazy(() => import('./App'));
const About = lazy(() => import('./app/about/About'));

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/about', element: <About /> },
]);

export default router;
