import type { Meta, StoryObj } from '@storybook/react';

import { Loader } from './index.tsx';

const meta = {
    title: 'atoms/loader',
    component: Loader,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
