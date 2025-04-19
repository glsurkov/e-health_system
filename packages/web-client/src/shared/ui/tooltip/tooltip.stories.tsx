import type { Meta } from '@storybook/react';

import { Tooltip } from './index.ts';

const meta = {
    title: 'atoms/tooltip',
    component: Tooltip,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;
export default meta;

const PrimaryComponent = () => (
    <Tooltip>
        <Tooltip.Content>Контент</Tooltip.Content>
        <Tooltip.Trigger>
            <button>Наведи на меня</button>
        </Tooltip.Trigger>
    </Tooltip>
);

export const Primary = PrimaryComponent.bind({});
