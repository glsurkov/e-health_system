import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';

import { IconAvatarPlaceholder } from '@/shared/assets';

import cls from './styles.module.scss';

interface Props {
    src?: string;
    className?: string;
    size?: 'w-28' | 'w-44';
}

export const Avatar = ({ src, className, size = 'w-28' }: Props) => {
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(false);
    }, [src]);

    const handleAvatarError = useCallback(() => setError(true), []);
    return (
        <div className={clsx(cls.container, className, cls[`size-${size}`])}>
            {src && !error ? (
                <img src={src} onError={handleAvatarError} className={cls.avatar} alt="User avatar" />
            ) : (
                <IconAvatarPlaceholder className={cls.avatar} />
            )}
        </div>
    );
};
