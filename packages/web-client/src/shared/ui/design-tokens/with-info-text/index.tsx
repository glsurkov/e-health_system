import { clsx } from 'clsx';
import { ReactNode } from 'react';

import { InfoTooltip } from '@/shared/ui/data-display';

import cls from './styles.module.scss';

interface Props {
    text: string;
    children: ReactNode;
    disabled?: boolean;
}

export const WithInfoText = ({ text, children, disabled = false }: Props) => {
    return (
        <div className={clsx(cls.root, { [cls.disabled]: disabled })}>
            <div className={cls.content}>{children}</div>

            <InfoTooltip text={text} />
        </div>
    );
};
