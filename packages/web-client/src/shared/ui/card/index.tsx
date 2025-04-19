import clsx from 'clsx';
import { forwardRef } from 'react';

import styles from './styles.module.scss';

export type CardPaddingType = 'small' | 'medium' | 'large' | 'none';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    padding?: CardPaddingType;
    position?: {
        top: number;
        left: number;
    };
    children: React.ReactNode;
}

export const Card = forwardRef<HTMLDivElement, Props>(
    ({ padding = 'medium', className, children, position, ...props }, ref) => {
        const cn = [styles.card, styles[`padding-${padding}`], className];

        return (
            <div
                ref={ref}
                style={
                    position && {
                        top: position.top,
                        left: position.left,
                    }
                }
                className={clsx(cn)}
                {...props}
            >
                {children}
            </div>
        );
    },
);

Card.displayName = 'Card';
