import styles from './styles.module.scss';
import {Typography} from "@/shared/ui";

export const GenericPlaceholder = () => {
    return (
        <div className={styles.container}>
            <Typography color="grey">
                Пусто
            </Typography>
        </div>
    );
};
