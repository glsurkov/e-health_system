import { Navigate, createBrowserRouter } from 'react-router-dom';

import * as Pages from '@/pages';

import { AuthProvider } from '../providers/auth';
import { publicRoutes } from './public';
import { privateRoutes } from "./private";
import { adminRoutes } from './admin';

export const router = createBrowserRouter([
    ...publicRoutes.map(({ path, element }) => ({
        path,
        element,
    })),
    ...privateRoutes.map(({ path, element }) => ({
        path,
        element: <AuthProvider component={element} />,
    })),
    ...adminRoutes.map(({ path, element }) => ({
        path,
        element: <AuthProvider component={element} isAdminRoute={true} />,
    })),
    {
        path: '/not-found',
        element: <AuthProvider component={<Pages.NotFoundPage />} />,
    },
    { path: '*', element: <Navigate to="/card/me" replace /> },
]);
