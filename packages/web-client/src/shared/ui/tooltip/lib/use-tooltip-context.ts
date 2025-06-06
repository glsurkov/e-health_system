import { createContext, useContext } from 'react';

import { useTooltip } from './use-tooltip.ts';

export type ITooltipContext = ReturnType<typeof useTooltip> | null;

export const TooltipContext = createContext<ITooltipContext>(null);

export const useTooltipContext = () => {
    const context = useContext(TooltipContext);

    if (context == null) {
        throw new Error('Tooltip components must be wrapped in <Tooltip />');
    }

    return context;
};
