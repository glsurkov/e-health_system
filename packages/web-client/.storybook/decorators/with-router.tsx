import React from 'react';
import { MemoryRouter } from 'react-router-dom';

export const withRouter = (Story: React.FC) => (
    <MemoryRouter>
        <Story />
    </MemoryRouter>
);
