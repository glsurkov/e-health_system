import styles from './styles.module.scss';
import {Typography} from "@/shared/ui";
import {formatDate} from "@/shared/lib";
import clsx from "clsx";
import {IShortUser} from '@/shared/types';

export interface IActivityAction {
    id: string;
    actionPerformer: IShortUser;
    date: Date;
    actionType: string;
    actionProps: string[];
};

interface UserCardActivityListItemProps {
    data: IActivityAction;
};

const parseActionTypeObject = {
    update: 'Обновление',
    review: 'Просмотр',
    delete: 'Удаление',
};

export const UserCardActivityListItem = (props: UserCardActivityListItemProps) => {
    const {data} = props;
    const {actionPerformer, actionType, date} = data;

    return (
        <div className={styles.container}>
            <Typography>
                {actionPerformer.fullname}
            </Typography>
            <Typography>
                {actionPerformer.position}
            </Typography>
            <Typography>
                {formatDate(date, 'short')}
            </Typography>
            <div className={clsx(styles.actionType, styles[actionType])}>
                <Typography color="white">
                    {parseActionTypeObject[actionType as keyof typeof parseActionTypeObject]}
                </Typography>
            </div>
        </div>
    );
};
