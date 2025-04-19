import styles from './styles.module.scss';
import {Button, Typography} from "@/shared/ui";
import {format} from 'date-fns';
import clsx from "clsx";
import {PermissionStatus} from "../../types/status.ts";

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
    const {data} = props;
    const {fullname, position, date, status = 'active'} = data;
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
                status === 'active'
                    ? (
                        <div className={styles.buttonsContainer}>
                            <Button
                                colors="primary"
                            >
                                Подтвердить
                            </Button>
                            <Button
                                colors="secondary"
                            >
                                Отклонить
                            </Button>
                        </div>
                    )
                    : (
                        <div className={styles.statusContainer}>
                            {status === 'declined' && (
                                <div className={styles.declinedIdentifier}>
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
