import {AuthLayout} from "@/layouts";
import styles from "./styles.module.scss";
import { GenericPageLoader, TextAreaInput, Typography } from '@/shared/ui';
import {UserCardDocumentsList} from "@/entities";
import {useParams} from "react-router-dom";
import { useRecordsControllerGetRecordQuery } from '@/shared/api/rest/records.ts';

export default function NotePage() {
    const { noteId } = useParams();
    const { data: record, isLoading } = useRecordsControllerGetRecordQuery({
        id: noteId ?? '',
    });


    if (isLoading) {
        return <GenericPageLoader/>
    }

    return (
        <AuthLayout className={styles.container}>
            <Typography
                variant="h1"
            >
                Запись {record?.id}
            </Typography>
            <div className={styles.main}>
                <div className={styles.mainInformation}>
                    <div className={styles.metaInfo}>
                        <Typography variant="h2">
                            Информация
                        </Typography>
                        <div className={styles.infoContainer}>
                            <div className={styles.mainInformationRow}>
                                <Typography
                                    variant="big"
                                    weight="bold"
                                >
                                    Автор:
                                </Typography>
                                <Typography
                                    variant="medium"
                                >
                                    {record?.recordAuthor.fullname}
                                </Typography>
                            </div>
                            <div className={styles.mainInformationRow}>
                                <Typography
                                    variant="big"
                                    weight="bold"
                                >
                                    Должность:
                                </Typography>
                                <Typography variant="medium">
                                    {record?.recordAuthor.position}
                                </Typography>
                            </div>
                            <div className={styles.mainInformationRow}>
                                <Typography
                                    variant="big"
                                    weight="bold"
                                >
                                    Организация:
                                </Typography>
                                <Typography variant="medium">
                                    {record?.recordAuthor.organization}
                                </Typography>
                            </div>
                            <div className={styles.mainInformationRow}>
                                <Typography
                                    variant="big"
                                    weight="bold"
                                >
                                    Email:
                                </Typography>
                                <Typography variant="medium">
                                    {record?.recordAuthor.email}
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className={styles.description}>
                        <Typography variant="h2">
                            Описание
                        </Typography>
                        <TextAreaInput value={record?.data} className={styles.descriptionArea}/>
                    </div>
                </div>
                <UserCardDocumentsList/>
            </div>
        </AuthLayout>
    );
};
