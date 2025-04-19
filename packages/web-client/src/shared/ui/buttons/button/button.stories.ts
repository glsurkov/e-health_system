import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './index.tsx';

const meta = {
    title: 'atoms/button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        disabled: {
            type: 'boolean',
        },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: 'Кнопка',
    },
};
