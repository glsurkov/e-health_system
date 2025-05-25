import { type RouteProps } from 'react-router-dom';
import * as Pages from "@/pages";

export const adminRoutes: Array<RouteProps> = [
    { path: '/register', element: <Pages.RegisterPage/> },
];
