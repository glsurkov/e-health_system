import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Root } from './ui/root';

const meta = {
    title: 'shared/overlays/modal',
    component: Root,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    decorators: [
        (Story, { args }) => {
            const [isVisible, setIsVisible] = useState(false);

            return (
                <>
                    <Story
                        args={{
                            ...args,
                            isVisible,
                            onClose: () => setIsVisible(false),
                            element: <>Внутренность модального окна</>,
                        }}
                    />
                    <button onClick={() => setIsVisible(true)}>Открыть модальное окно</button>
                </>
            );
        },
    ],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    args: {},
};
