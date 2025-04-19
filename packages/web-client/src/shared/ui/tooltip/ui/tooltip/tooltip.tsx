import * as React from 'react';
import type { Placement } from '@floating-ui/react';

import { TooltipContext } from '../../lib/use-tooltip-context.ts';
import { useTooltip } from '../../lib/use-tooltip.ts';
import { TooltipContentList } from '../tooltip-content-list';
import { TooltipContent } from '../tooltip-content/tooltip-content.tsx';
import { TooltipTrigger } from '../tooltip-trigger/tooltip-trigger.tsx';

export interface ITooltipOptions {
    initialOpen?: boolean;
    placement?: Placement;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    followMouse?: boolean;
    offset?: number;
    safeTooltipCursor?: boolean;
}

export function Tooltip({
    children,
    ...options
}: { children: React.ReactNode } & ITooltipOptions) {
    const tooltip = useTooltip(options);
    return (
        <TooltipContext.Provider value={tooltip}>
            {children}
        </TooltipContext.Provider>
    );
}

Tooltip.Content = TooltipContent;
Tooltip.Trigger = TooltipTrigger;
Tooltip.ContentList = TooltipContentList;
