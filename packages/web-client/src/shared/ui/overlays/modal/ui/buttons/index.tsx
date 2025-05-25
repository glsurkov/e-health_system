import clsx from 'clsx';
import { ReactNode } from 'react';

import { Loader } from '@/shared/ui/feedback';

import cls from './styles.module.scss';

export const ButtonList = ({ children }: { children: ReactNode }) => {
    return <div className={cls.buttons}>{children}</div>;
};

export const Button = ({
    variant,
    children,
    onClick,
    isLoading,
    isDisabled,
    type = 'button',
}: {
    children: ReactNode;
    variant: 'cancel' | 'primary' | 'warn';
    isLoading?: boolean;
    onClick?: () => void;
    isDisabled?: boolean;
    type?: 'button' | 'submit';
}) => {
    return (
        <>
            <button
                type={type}
                className={clsx(cls.button, cls[`button-${variant}`], { [cls.disabled]: isDisabled })}
                onClick={onClick}
                disabled={isDisabled || isLoading}
            >
                {isLoading ? <Loader color="white" heightLoader={20} /> : children}
            </button>
        </>
    );
};
