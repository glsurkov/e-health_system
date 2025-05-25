import styles from './styles.module.scss';
import {Button, Typography} from "@/shared/ui";
import {format} from 'date-fns';
import clsx from "clsx";
import {PermissionStatus} from "../../types/status.ts";
import { useCallback } from 'react';
import { useRecordsControllerAccessGrantMutation } from '@/shared/api/rest/records.ts';

export interface IPermission {
    id: string;
    fullname: string;
    position: string;
    date: Date;
    status?: PermissionStatus;
}

interface PermissionsListItemProps {
    data: IPermission;
}

export const PermissionsListItem = (props: PermissionsListItemProps) => {
    const [handleGrant, {isLoading}] = useRecordsControllerAccessGrantMutation();
    const {data} = props;
    const {fullname, position, date, status = 'pending', id} = data;

    const handleRequest = useCallback((isAccepted: boolean) => {
        handleGrant({
            isAccepted,
            requestId: id,
            callerId: 'patient1',
        })
    }, []);

    return (
        <div className={clsx(styles.container, styles[status])}>
            <div className={styles.infoContainer}>
                <Typography className={styles.name}>
                    {fullname}
                </Typography>
                <Typography className={styles.position}>
                    {position}
                </Typography>
                <Typography>
                    {format(date, 'dd.MM.yyyy')}
                </Typography>
            </div>
            {
                status === 'pending'
                    ? (
                        <div className={styles.buttonsContainer}>
                            <Button
                                onClick={() => handleRequest(true)}
                                disabled={isLoading}
                                colors="primary"
                            >
                                Подтвердить
                            </Button>
                            <Button
                                onClick={() => handleRequest(false)}
                                disabled={isLoading}
                                colors="secondary"
                            >
                                Отклонить
                            </Button>
                        </div>
                    )
                    : (
                        <div className={styles.statusContainer}>
                            {status === 'rejected' && (
                                <div className={styles.rejectedIdentifier}>
                                    <Typography color="white">
                                        Отклонено
                                    </Typography>
                                </div>
                            )}
                            {status === 'accepted' && (
                                <div className={styles.acceptedIdentifier}>
                                    <Typography color="white">
                                        Подтверждено
                                    </Typography>
                                </div>
                            )}
                        </div>
                    )
            }
        </div>
    );
};
