import { type RouteProps } from 'react-router-dom';
import * as Pages from "@/pages";

// import * as Pages from '@/pages';

export const privateRoutes: Array<RouteProps> = [
    { path: '/permissions/:userId', element: <Pages.PermissionsPage/> },
    { path: '/card/:userId', element: <Pages.CardPage/> },
    { path: '/note/:noteId', element: <Pages.NotePage/> },
];
