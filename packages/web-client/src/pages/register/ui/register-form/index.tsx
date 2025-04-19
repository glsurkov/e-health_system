import {Button, DndArea, Typography} from "@/shared/ui";
import {useCallback} from "react";
import {useFileUpload} from "@/shared/lib";
import styles from './styles.module.scss';
import {
    ALLOWED_FILE_TYPES,
    FILE_LIMIT,
    MAX_FILE_SIZE,
    MIN_FILE_SIZE
} from "@/shared/consts/defaultUploadRestrictions.ts";
import {TaskAttachmentItemData} from '@/shared/ui';

export const RegisterForm = () => {
    const { fileInput, handleDrop, fileInputRef, files, isError, clearFiles } =
        useFileUpload({
            multi: false,
            fileLimit: FILE_LIMIT,
            maxFileSize: MAX_FILE_SIZE,
            minFileSize: MIN_FILE_SIZE,
            allowedFileTypes: ALLOWED_FILE_TYPES,
        });

    const handleOpenFileSelect = useCallback(() => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
            fileInputRef.current.click();
        }
    }, [fileInputRef.current]);

    return (
        <div className={styles.container}>
            <Typography
                variant="h2"
                weight="bold"
            >
                Прикрепите файл для активации ключа
            </Typography>
            {fileInput}
            {files.length > 0 && (
                <TaskAttachmentItemData
                    fileName={files[0].name}
                    className={styles.attachement}
                    itemAction="remove"
                    additionalIconClassName={styles.removeIcon}
                    onClick={clearFiles}
                    flagged={false}
                />
            )}
            {files.length === 0 && (
                <DndArea
                    onDrop={handleDrop}
                    isError={isError}
                    openFileSelect={handleOpenFileSelect}
                    className={styles.dnd}
                />
            )}
            <Button
                className={styles.button}
            >
                Отправить
            </Button>
        </div>
    );
};
