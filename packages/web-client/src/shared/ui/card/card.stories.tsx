import type { Meta, StoryObj } from '@storybook/react';

import { Card } from './index.tsx';

const meta = {
    title: 'atoms/card',
    component: Card,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    decorators: [
        (Story, { args }) => {
            return (
                <Story
                    args={{
                        ...args,
                    }}
                >
                    Test
                </Story>
            );
        },
    ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: 'Card',
        padding: 'medium',
    },
};
