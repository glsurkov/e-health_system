import { type RouteProps } from 'react-router-dom';

import * as Pages from '@/pages';

export const publicRoutes: Array<RouteProps> = [
    { path: '/enroll', element: <Pages.EnrollPage /> },
];
