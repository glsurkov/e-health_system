import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';

import { ModalRoot } from '@/shared/ui';

import { router } from './router';
import { StoreProvider } from './store';
import './styles/index.scss';

export function App() {
    return (
        <StoreProvider>
            <RouterProvider router={router} />
            <ModalRoot />
            <Toaster />
        </StoreProvider>
    );
}
