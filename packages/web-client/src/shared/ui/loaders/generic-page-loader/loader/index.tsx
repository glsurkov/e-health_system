import clsx from 'clsx';

import styles from './styles.module.scss';

interface Props {
    color?: 'blue';
    className?: string;
}

export function Loader(props: Props) {
    const { color = 'blue', className } = props;

    const cn = [styles.loader, styles[`color-${color}`], className];

    return <div className={clsx(cn)}></div>;
}
