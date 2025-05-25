import * as React from 'react';
import {
    autoUpdate,
    flip,
    offset,
    safePolygon,
    shift,
    useClientPoint,
    useDismiss,
    useFloating,
    useFocus,
    useHover,
    useInteractions,
    useRole,
} from '@floating-ui/react';

import { ITooltipOptions } from '../ui/tooltip.tsx';

export function useTooltip({
    initialOpen = false,
    placement = 'top',
    open: controlledOpen,
    onOpenChange: setControlledOpen,
    followMouse = false,
    offsetY: offsetNumberY = 5,
    offsetX: offsetNumberX = 0,
    safeTooltipCursor = false,
}: ITooltipOptions = {}) {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);

    const open = controlledOpen ?? uncontrolledOpen;
    const setOpen = setControlledOpen ?? setUncontrolledOpen;

    const data = useFloating({
        placement,
        open: followMouse ? controlledOpen : uncontrolledOpen,
        onOpenChange: followMouse ? undefined : setOpen,
        whileElementsMounted: autoUpdate,
        middleware: [
            offset({
                mainAxis: offsetNumberY,
                crossAxis: offsetNumberX,
            }),
            flip({
                crossAxis: placement.includes('-'),
                fallbackAxisSideDirection: 'start',
                padding: 5,
            }),
            shift({ padding: 5 }),
        ],
    });

    const context = data.context;

    const clientPoint = useClientPoint(context, {
        enabled: followMouse,
    });

    const hover = useHover(context, {
        enabled: controlledOpen == null || safeTooltipCursor,
        handleClose: safeTooltipCursor
            ? safePolygon({
                  buffer: 1,
                  blockPointerEvents: true,
              })
            : undefined,
    });
    const focus = useFocus(context, {
        enabled: controlledOpen == null,
    });
    const dismiss = useDismiss(context);
    const role = useRole(context, { role: 'tooltip' });

    const interactions = useInteractions([hover, focus, dismiss, role, clientPoint]);
    return React.useMemo(
        () => ({
            open,
            setOpen,
            followMouse,
            ...interactions,
            ...data,
        }),
        [open, setOpen, interactions, data, followMouse],
    );
}
