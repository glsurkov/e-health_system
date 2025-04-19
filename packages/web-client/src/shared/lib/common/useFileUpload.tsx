import { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react';

interface IUseFileUpload {
    fileLimit?: number;
    maxFileSize?: number;
    minFileSize?: number;
    allowedFileTypes?: string[];
    multi?: boolean;
}

/**
 * useFileUpload hook for managing file uploads.
 *
 * Allows the user to upload files via input field or drag and drop.
 * Automatically filters out unacceptable files (based on type and size).
 * Manages the currently uploaded files and provides functions for adding
 * and removing files.
 *
 * @param {IUseFileUpload} options
 * @returns {{
 *   fileInput: JSX.Element,
 *   fileInputRef: React.MutableRefObject<HTMLInputElement | null>,
 *   files: File[],
 *   isError: boolean,
 *   handleDrop: (event: React.DragEvent<HTMLDivElement>) => void,
 *   removeFile: (fileIndex: number) => void,
 *   clearError: () => void,
 *   clearFiles: () => void,
 * }}
 */
export const useFileUpload = ({
                                  fileLimit,
                                  maxFileSize,
                                  minFileSize,
                                  allowedFileTypes,
                                  multi = true,
}: IUseFileUpload) => {
    const [files, setFiles] = useState<File[]>([]);
    const [isError, setIsError] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const clearError = useCallback(() => setIsError(false), []);
    const clearFiles = useCallback(() => setFiles([]), []);

    const processFiles = useCallback(
        (incomingFiles: File[]) => {
            const allFilesAcceptable = incomingFiles.every((f) =>
                verifyFileAcceptable(f, {
                    allowedFileTypes,
                    maxFileSize,
                    minFileSize,
                }),
            );
            const onlyNewFiles = incomingFiles.filter(
                (file) =>
                    !files.find(
                        (f) => f.name === file.name && f.size === file.size,
                    ),
            );
            const reachedLimit =
                fileLimit && onlyNewFiles.length + files.length > fileLimit;
            if (reachedLimit || !allFilesAcceptable) {
                setIsError(true);
                return;
            }

            setIsError(false);
            setFiles([...files, ...onlyNewFiles]);
        },
        [files],
    );

    const removeFile = useCallback(
        (fileIndex: number) => {
            setIsError(false);
            setFiles(files.filter((_, i) => i !== fileIndex));
        },
        [files],
    );

    const handleFilesChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const incomingFilesArray = Array.from(event.target.files ?? []);
            processFiles(incomingFilesArray);
        },
        [processFiles],
    );

    const handleDrop = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            const incomingFilesArray = Array.from(event.dataTransfer.files);
            processFiles(incomingFilesArray);
        },
        [processFiles],
    );

    const fileInput = useMemo(() => {
        return (
            <input
                ref={fileInputRef}
        style={{ display: 'none' }}
        type="file"
        multiple={multi}
        onChange={handleFilesChange}
        accept={allowedFileTypes?.join(',')}
        />
    );
    }, [handleFilesChange]);

    return {
        fileInput,
        fileInputRef,
        files,
        isError,
        handleDrop,
        removeFile,
        clearError,
        clearFiles,
    };
};

const verifyFileAcceptable = (
    file: File,
    restrictions: Omit<IUseFileUpload, 'fileLimit'>,
) => {
    const { allowedFileTypes, maxFileSize, minFileSize } = restrictions;
    if (allowedFileTypes && !allowedFileTypes?.includes(file.type)) {
        return false;
    }
    if (maxFileSize && file.size > maxFileSize) {
        return false;
    }
    if (minFileSize && file.size < minFileSize) {
        return false;
    }
    return true;
};
