import {AuthLayout} from "@/layouts";
import styles from './styles.module.scss';
import {Typography } from "@/shared/ui";
import {UserCard} from "@/entities";
import {UserCardActivityList} from "@/entities";
import {UserCardDocumentsList} from "@/entities";

export default function CardPage() {
    const activityData = [
        {
            id: "1",
            actionPerformer: {
                id: "1",
                fullname: "Dr Mundo",
                position: "Doctor",
            },
            date: new Date(),
            actionType: "update",
            actionProps: [],
        },
        {
            id: "2",
            actionPerformer: {
                id: "2",
                fullname: "Dr Mundo",
                position: "Doctor",
            },
            date: new Date(),
            actionType: "review",
            actionProps: [],
        },
        {
            id: "3",
            actionPerformer: {
                id: "3",
                fullname: "Dr Mundo",
                position: "Doctor",
            },
            date: new Date(),
            actionType: "update",
            actionProps: [],
        }
    ];

    const documentsData = [
        {
            id: "1",
            filename: "Document 1",
            extension: "jpg",
            path: "/123.jpg",
            date: new Date(),
        },
        {
            id: "2",
            filename: "Document 2",
            extension: "pdf",
            path: "/123.jpg",
            date: new Date(),
        },
        {
            id: "3",
            filename: "Document 3",
            extension: "png",
            path: "/123.jpg",
            date: new Date(),
        },
    ];

    return (
        <AuthLayout className={styles.container}>
            <div className={styles.cardContainer}>
                <Typography
                    variant="h1"
                >
                    Медицинская карта
                </Typography>
                <UserCard/>
            </div>
            <div className={styles.attachmentsContainer}>
                <UserCardDocumentsList data={documentsData}/>
                <UserCardActivityList data={activityData}/>
            </div>
        </AuthLayout>
    );
};
