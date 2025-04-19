import styles from "./styles.module.scss";
import {GenericPlaceholder, Typography} from "@/shared/ui";
import {IDocument, UserCardDocumentsListItem} from "../user-card-documents-list-item";

interface UserCardDocumentsListProps {
    data?: IDocument[];
}

export const UserCardDocumentsList = (props: UserCardDocumentsListProps) => {
    const {data} = props;

    return (
        <div className={styles.container}>
            <Typography
                weight="bold"
                variant="h3"
            >
                Документы
            </Typography>
            {
                data
                    ? (
                        <div className={styles.listContainer}>
                            {
                                data.map((item) => {
                                    return (
                                      <UserCardDocumentsListItem
                                          key={item.id}
                                          data={item}
                                      />
                                    );
                                })
                            }
                        </div>
                    )
                    : <GenericPlaceholder/>
            }
        </div>
    );
};
