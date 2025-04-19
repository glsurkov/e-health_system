import type { Preview } from '@storybook/react';

import '../src/app/styles/index.scss';
import { withRouter } from './decorators/with-router';

const preview: Preview = {
    decorators: [withRouter],
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
