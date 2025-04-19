import clsx from 'clsx';
import { ButtonHTMLAttributes, forwardRef } from 'react';

import styles from './styles.module.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'filled' | 'clear' | 'light';
    size?: 'mini' | 'light' | 'medium' | 'large';
    colors?: 'primary' | 'secondary' | 'none' | 'light';
};

export const Button = forwardRef<HTMLButtonElement, Props>(
    (
        {
            variant = 'filled',
            size,
            type = 'button',
            colors,
            className,
            disabled,
            onClick,
            ...props
        }: Props,
        ref,
    ) => {
        const colorToApply =
            colors ?? (variant === 'clear' ? 'none' : 'primary');
        const sizeToApply = size ?? (variant === 'clear' ? 'mini' : 'medium');
        const clickHandler = disabled ? undefined : onClick;
        return (
            <button
                ref={ref}
                className={clsx(
                    styles.button,
                    styles[`variant-${variant}`],
                    styles[`size-${sizeToApply}`],
                    styles[`color-${colorToApply}`],
                    { [styles.disabled]: disabled },
                    className,
                )}
                type={type}
                disabled={disabled}
                onClick={clickHandler}
                {...props}
            />
        );
    },
);

Button.displayName = 'Button';
