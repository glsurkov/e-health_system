import type { Meta, StoryObj } from '@storybook/react';

import { GenericError } from './index.tsx';

const meta = {
    title: 'molecules/error',
    component: GenericError,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof GenericError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        width: 200,
        height: 200,
    },
};
