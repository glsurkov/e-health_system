import type { Meta, StoryObj } from '@storybook/react';

import { UserAvatar } from './index.tsx';

const meta = {
    title: 'atoms/user-avatar',
    component: UserAvatar,
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
                ></Story>
            );
        },
    ],
} satisfies Meta<typeof UserAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        avatar: 'https://i.pravatar.cc/300',
    },
};

export const Secondary: Story = {
    args: {
        avatar: undefined,
    },
};
