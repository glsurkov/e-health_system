import * as React from 'react';
import { FloatingPortal, useMergeRefs } from '@floating-ui/react';
import clsx from 'clsx';

import { useTooltipContext } from '../../lib/use-tooltip-context.ts';
import styles from './styles.module.scss';

type Props = React.HTMLProps<HTMLDivElement>;

export const TooltipContent = React.forwardRef<HTMLDivElement, Props>(
    function TooltipContent({ style, className, ...props }, propRef) {
        const context = useTooltipContext();
        const ref = useMergeRefs([context.refs.setFloating, propRef]);

        if (!context.open) return null;

        const isZeroComponent = context.followMouse
            ? context.floatingStyles.transform === 'translate(0px, 0px)' ||
              !context.floatingStyles.transform
            : false;

        return (
            <FloatingPortal>
                <div
                    className={clsx(styles.tooltip, className)}
                    ref={ref}
                    style={{
                        ...context.floatingStyles,
                        ...style,
                        display: isZeroComponent ? 'none' : 'flex',
                    }}
                    {...context.getFloatingProps({
                        ...props,
                        onMouseEnter: () => context.setOpen(true),
                        onMouseLeave: (e) => {
                            const referenceElement =
                                context.refs.reference.current;
                            const relatedTarget =
                                e.relatedTarget as HTMLElement;
                            if (
                                referenceElement instanceof HTMLElement &&
                                (relatedTarget === null ||
                                    !referenceElement.contains(relatedTarget))
                            ) {
                                context.setOpen(false);
                            }
                        },
                    })}
                />
            </FloatingPortal>
        );
    },
);
