import clsx from 'clsx';

import { Button, Tooltip, Typography } from '@/shared/ui';

import styles from './styles.module.scss';

type Props = {
    Icon: React.FC;
    active: boolean;
    disabled?: boolean;
    onClick: () => void;
    name: string;
    notification?: {
        count?: number;
    };
};

export const TabButton = ({
    Icon,
    active,
    onClick,
    disabled,
    name,
    notification,
}: Props) => {
    return (
        <Tooltip placement="right">
            <Tooltip.Trigger>
                <Button
                    variant="clear"
                    className={clsx(styles.button, {
                        [styles.active]: active,
                        [styles.disabled]: disabled,
                    })}
                    onClick={!disabled ? onClick : undefined}
                >
                    {Boolean(notification?.count) && (
                        <div className={styles.notification}>
                            <Typography
                                variant="small"
                                color="white"
                                align="center"
                            >
                                {notification?.count}
                            </Typography>
                        </div>
                    )}
                    <Icon />
                </Button>
                <Tooltip.Content>{name}</Tooltip.Content>
            </Tooltip.Trigger>
        </Tooltip>
    );
};
