import {Button, Typography} from '..';
import styles from './styles.module.scss';
import clsx from "clsx";
import {IconPaperclip} from "@/shared/assets";

interface IDndAreaProps {
    isError?: boolean;
    openFileSelect: () => void;
    onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
    className?: string;
    errorMessage?: string;
}

export const DndArea = ({
    openFileSelect,
    isError,
    onDrop,
    className,
    errorMessage = `Только 10 файлов pdf, doc, docx, xls, xlsx, не более 60 Мб могут
    быть загружены`,
}: IDndAreaProps) => {
    return (
        <div
            className={clsx(
                styles.dndArea,
                {[styles.isError]: isError},
                className,
            )}
            onDrop={onDrop}
            onDragOver={(event) => event.preventDefault()}
        >
            <IconPaperclip/>
            <Typography variant="medium" align="center">
                Перетащите вложения в эту область
            </Typography>
            <div>
                <Typography
                    variant="medium"
                    color="grey-400"
                    className={styles.orText}
                >
                    или
                </Typography>{' '}
                <Button
                    className={styles.fileButton}
                    variant="clear"
                    onClick={openFileSelect}
                >
                    <Typography variant="medium" color="accent">
                        Выберите файл
                    </Typography>
                </Button>
            </div>
            <Typography
                variant="small"
                align="center"
                color={isError ? 'error' : 'grey-400'}
            >
                {errorMessage}
            </Typography>
        </div>
    );
};
