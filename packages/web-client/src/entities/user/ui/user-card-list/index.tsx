import styles from './styles.module.scss';
import {Typography} from "@/shared/ui";
import {UserCardListItem} from "@/entities/user/ui/user-card-list-item";
import {IUser} from "@/shared/types";

interface UserCardListProps {
    data: {
        id: string;
        title: string;
        recordAuthor: IUser;
        date: Date;
    }[];
}

const UserCardList = (props: UserCardListProps) => {
    const {data} = props;

    return (
        <div className={styles.container}>
            <Typography variant="h2">
                Медицинская карта
            </Typography>
            <div className={styles.listContainer}>
                {
                    data.map((item)=> {
                        return (
                            <UserCardListItem
                                key={item.id}
                                data={item}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
};

export default UserCardList;
