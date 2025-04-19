import clsx from 'clsx';
import React, { forwardRef } from 'react';

import styles from './styles.module.scss';

interface Props extends React.HTMLAttributes<HTMLElement> {
    className?: string;
    variant?: 'small' | 'medium' | 'big' | 'text' | 'h1' | 'h2' | 'h3';
    children: React.ReactNode;
    color?:
        | 'black'
        | 'grey'
        | 'light-grey'
        | 'accent'
        | 'grey-400'
        | 'grey-600'
        | 'error'
        | 'white'
        | 'green';
    align?: 'left' | 'center' | 'right';
    component?: 'p' | 'span' | 'div';
    weight?: 'normal' | 'bold';
}

const pVariants: Props['variant'][] = ['small', 'medium', 'big', 'text'];
const defaultBoldVariants: Props['variant'][] = ['h1', 'h2', 'h3'];

export const Typography = forwardRef<HTMLElement, Props>(
    (
        {
            className,
            children,
            variant = 'text',
            color = 'black',
            align = 'left',
            component,
            weight,
            ...props
        },
        ref,
    ) => {
        const weightToUse =
            weight ??
            (defaultBoldVariants.includes(variant) ? 'bold' : 'normal');
        const cn = [
            styles.typography,
            styles[`variant-${variant}`],
            styles[`color-${color}`],
            styles[`align-${align}`],
            styles[`weight-${weightToUse}`],
            className,
        ];
        const componentToUse =
            component ?? (pVariants.includes(variant) ? 'p' : (variant ?? 'p'));

        return React.createElement(
            componentToUse,
            { className: clsx(cn), ref, ...props },
            children,
        );
    },
);

Typography.displayName = 'Typography';
