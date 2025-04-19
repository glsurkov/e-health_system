import styles from './styles.module.scss';
import {Typography} from "@/shared/ui";
import {formatDate} from "@/shared/lib";
import {useCallback} from "react";

export interface IDocument {
    id: string;
    filename: string;
    extension: string;
    path: string;
    date: Date;
}

interface UserCardDocumentsListItemProps {
    data: IDocument;
}

export const UserCardDocumentsListItem = (props: UserCardDocumentsListItemProps) => {
    const {data} = props;
    const {filename, extension, path, date} = data;

    const handleFileOpen = useCallback(() => {
        return path;
    }, []);

    return (
        <div
            className={styles.container}
            onClick={handleFileOpen}
        >
            <Typography>
                {filename}
            </Typography>
            <Typography>
                {extension}
            </Typography>
            <Typography>
                {formatDate(date, 'short')}
            </Typography>
        </div>
    );
};
