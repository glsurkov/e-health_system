import * as React from 'react';
import { useMergeRefs } from '@floating-ui/react';

import { useTooltipContext } from '../lib/use-tooltip-context.ts';

export const TooltipTrigger = React.forwardRef<HTMLElement, React.HTMLProps<HTMLElement> & { asChild?: boolean }>(
    function TooltipTrigger({ children, asChild = true, ...props }, propRef) {
        const context = useTooltipContext();
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        const childrenRef = (children as any).ref;
        const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

        if (asChild && React.isValidElement(children)) {
            return React.cloneElement(
                children,
                context.getReferenceProps({
                    ref,
                    ...props,
                }),
            );
        }

        return (
            <button ref={ref} data-state={context.open ? 'open' : 'closed'} {...context.getReferenceProps(props)}>
                {children}
            </button>
        );
    },
);
