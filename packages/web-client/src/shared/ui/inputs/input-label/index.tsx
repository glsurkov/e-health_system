import { clsx } from 'clsx';

import styles from './styles.module.scss';

export interface InputLabelProps {
    label?: string;
    htmlFor?: string;
    color?: 'white' | 'gray';
}

export const InputLabel = ({ label, htmlFor, color = 'white' }: InputLabelProps) => {
    if (!label) {
        return null;
    }

    return (
        <div>
            <label htmlFor={htmlFor ?? ''} className={clsx(styles.label, styles[`color-${color}`])}>
                {label}
            </label>
        </div>
    );
};
