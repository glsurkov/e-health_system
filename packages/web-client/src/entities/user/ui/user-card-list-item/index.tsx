import styles from './styles.module.scss';
import {IUser} from "@/shared/types";
import {Typography} from "@/shared/ui";
import {ExpandableCard} from "@/shared/ui";
import {useCallback, useMemo} from "react";
import {formatDate} from "@/shared/lib";
import {useNavigate, useParams} from "react-router-dom";

interface UserCardListItemProps {
    data: {
        id: string;
        title: string;
        recordAuthor: IUser;
        date: Date;
    };
}

export const UserCardListItem = (props: UserCardListItemProps) => {
    const {data} = props;
    const {id, title, recordAuthor, date} = data;

    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        navigate(`/note/${id}`);
    }, [id]);

    const additionalInfo = useMemo(() => {
        return (
            <div
                className={styles.additionalInfoContainer}
            >
                <div className={styles.additionalInfoRow}>
                    <Typography weight="bold">
                        Автор записи:
                    </Typography>
                    <Typography>
                        {recordAuthor.fullname}
                    </Typography>
                </div>
                <div className={styles.additionalInfoRow}>
                    <Typography weight="bold">
                        Должность:
                    </Typography>
                    <Typography>
                        {recordAuthor.position}
                    </Typography>
                </div>
                <div className={styles.additionalInfoRow}>
                    <Typography weight="bold">
                        Организация:
                    </Typography>
                    <Typography>
                        {recordAuthor.organization}
                    </Typography>
                </div>
            </div>
        );
    }, []);

    return (
        <ExpandableCard
            onClick={handleClick}
            className={styles.container}
            additionalInfo={additionalInfo}
        >
            <div className={styles.info}>
                <Typography>
                    {title}
                </Typography>
                <Typography>
                    {formatDate(date, 'short')}
                </Typography>
            </div>
        </ExpandableCard>
    );
};
