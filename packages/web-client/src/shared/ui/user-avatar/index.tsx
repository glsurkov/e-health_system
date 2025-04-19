import clsx from 'clsx';
import { forwardRef, useCallback, useEffect, useState } from 'react';

import { IconUserAvatarPlaceholder } from '@/shared/assets';

import styles from './styles.module.scss';

export interface IUserAvatarProps {
    avatar?: string;
    className?: string;
    size?: 'xsmall' | 'small' | 'medium' | 'large' | 'w-96' | 'w-120';
    onClick?: () => void;
}

export const UserAvatar = forwardRef<HTMLDivElement, IUserAvatarProps>(
    ({ avatar, className, size = 'small', onClick }, ref) => {
        const [error, setError] = useState(false);

        useEffect(() => {
            setError(false);
        }, [avatar]);

        const handleAvatarError = useCallback(() => setError(true), []);
        return (
            <div
                onClick={onClick}
                ref={ref}
                className={clsx(
                    styles.container,
                    className,
                    styles[`size-${size}`],
                )}
            >
                {avatar && !error ? (
                    <img
                        src={avatar}
                        onError={handleAvatarError}
                        className={styles.avatar}
                    />
                ) : (
                    <IconUserAvatarPlaceholder className={styles.avatar} />
                )}
            </div>
        );
    },
);

UserAvatar.displayName = 'UserAvatar';
