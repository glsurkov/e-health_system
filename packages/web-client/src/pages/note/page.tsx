import {AuthLayout} from "@/layouts";
import styles from "./styles.module.scss";
import {TextAreaInput, Typography} from "@/shared/ui";
import {UserCardDocumentsList} from "@/entities";
import {useParams} from "react-router-dom";

export default function NotePage() {
    const { noteId } = useParams();

    return (
        <AuthLayout className={styles.container}>
            <Typography
                variant="h1"
            >
                Запись {noteId}
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
                                    Dr Mundo
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
                                    Doctor
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
                                    WSH National Hospital
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
                                    drmundo@gmail.com
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className={styles.description}>
                        <Typography variant="h2">
                            Описание
                        </Typography>
                        <TextAreaInput className={styles.descriptionArea}/>
                    </div>
                </div>
                <UserCardDocumentsList/>
            </div>
        </AuthLayout>
    );
};
