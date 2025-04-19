import clsx from 'clsx';
import { ReactNode } from 'react';

import { AuthHeader } from '../header';
import styles from './styles.module.scss';

type Props = {
    children: ReactNode;
    className?: string;
    authHeaderHidden?: boolean;
};

export const AuthLayout = ({
    children,
    className,
    authHeaderHidden,
}: Props) => {
    return (
        <div className={styles.container}>
            {!authHeaderHidden && <AuthHeader />}
            <div className={clsx([styles.content, className])}>{children}</div>
        </div>
    );
};
