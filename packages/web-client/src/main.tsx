import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';

window.addEventListener('vite:preloadError', () => {
    console.log('Call reload');
    window.location.reload();
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
