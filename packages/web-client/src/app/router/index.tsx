import { Navigate, createBrowserRouter } from 'react-router-dom';

import * as Pages from '@/pages';

import { AuthProvider } from '../providers/auth';
// import { privateRoutes } from './private';
import { publicRoutes } from './public';
import { privateRoutes } from "./private";

export const router = createBrowserRouter([
    // {
    //     path: '/',
    //     element: <Pages.HomePage />,
    // },
    ...privateRoutes.map(({ path, element }) => ({
        path,
        element: <AuthProvider component={element} />,
    })),
    ...publicRoutes.map(({ path, element }) => ({
        path,
        element,
    })),
    // ...adminRoutes.map(({ path, element }) => ({
    //     path,
    //     element: <AuthProvider component={element} isAdminRoute={true} />,
    // })),
    {
        path: '/not-found',
        element: <AuthProvider component={<Pages.NotFoundPage />} />,
    },
    { path: '*', element: <Navigate to="/not-found" replace /> },
]);
