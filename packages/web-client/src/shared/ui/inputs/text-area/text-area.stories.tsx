import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { TextAreaInput } from './index.tsx';

const meta = {
    title: 'atoms/text-area',
    component: TextAreaInput,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    decorators: [
        (Story, { args }) => {
            const [value, setValue] = useState('');
            const onChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) =>
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
} satisfies Meta<typeof TextAreaInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        placeholder: 'Введите текст',
    },
};
