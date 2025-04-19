import styles from "./styles.module.scss";
import {UserAvatar} from "@/shared/ui";
import {UserCardRow} from "@/entities";
import UserCardList from "@/entities/user/ui/user-card-list";

interface UserCardProps {
    data?: string;
}

export const UserCard = (props: UserCardProps) => {
    const {data} = props;

    const dataArray = [
        {
            id: '1',
            title: 'Record',
            recordAuthor: {
                id: '1',
                fullname: 'Dr Mundo',
                position: 'Doctor',
                email: 'drmundo@gmail.com',
                additionalInfo: '',
                organization: 'WSH National Hospital',
            },
            date: new Date(),
        },
        {
            id: '2',
            title: 'Record-2',
            recordAuthor: {
                id: '2',
                fullname: 'Dr Mundo',
                position: 'Doctor',
                email: 'drmundo@gmail.com',
                additionalInfo: '',
                organization: 'WSH National Hospital',
            },
            date: new Date(),
        },
        {
            id: '3',
            title: 'Record-3',
            recordAuthor: {
                id: '3',
                fullname: 'Dr Mundo',
                position: 'Doctor',
                email: 'drmundo@gmail.com',
                additionalInfo: '',
                organization: 'WSH National Hospital',
            },
            date: new Date(),
        },
    ];

    if (data)
        return (
            <div>

            </div>
        );

    return (
        <div className={styles.card}>
            <div className={styles.topSideInformation}>
                <UserAvatar size="w-120"/>
                <div>
                    <UserCardRow
                        title="Имя"
                        value={123}
                        disabled={true}
                    />
                    <UserCardRow
                        title="Фамилия"
                        value={123}
                        disabled={true}
                    />
                </div>
            </div>
            <UserCardList data={dataArray}/>
        </div>
    );
};
