import type { Meta, StoryObj } from '@storybook/react';

import { GenericPageLoader } from './index.tsx';

const meta = {
    title: 'molecules/loader-page',
    component: GenericPageLoader,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof GenericPageLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        width: 200,
        height: 200,
    },
};
