import type { Meta, StoryObj } from '@storybook/react';

import { Typography } from './index.tsx';

const meta = {
    title: 'atoms/typography',
    component: Typography,
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
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: 'Typography',
        color: 'black',
        variant: 'text',
    },
};
