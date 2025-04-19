import clsx from 'clsx';
import { CSSProperties } from 'react';

import { Loader } from './loader';
import styles from './styles.module.scss';

interface Props {
    height?: CSSProperties['height'];
    width?: CSSProperties['width'];
    className?: string;
    loaderColor?: 'blue';
    withBackdrop?: boolean;
}

export function GenericPageLoader({
    height,
    width,
    className,
    loaderColor,
    withBackdrop,
}: Props) {
    return (
        <div
            style={{ height, width }}
            className={clsx(
                styles.root,
                { [styles.withBackdrop]: withBackdrop },
                className,
            )}
        >
            <Loader color={loaderColor} />
        </div>
    );
}
