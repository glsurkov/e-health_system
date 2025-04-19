import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { TextInput } from './index.tsx';

const meta = {
    title: 'atoms/text-input',
    component: TextInput,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    decorators: [
        (Story, { args }) => {
            const [value, setValue] = useState('');
            const onChange = (ev: React.ChangeEvent<HTMLInputElement>) =>
                setValue(ev.target.value);
            return (
                <Story
                    args={{
                        ...args,
                        value,
                        onChange,
                    }}
                />
            );
        },
    ],
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        placeholder: 'Введите текст',
    },
};
