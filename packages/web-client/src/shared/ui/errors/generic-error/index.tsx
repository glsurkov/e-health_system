import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import clsx from 'clsx';
import { CSSProperties, useMemo } from 'react';

import { Typography } from '../..';

import styles from './styles.module.scss';

interface Props {
    height?: CSSProperties['height'];
    width?: CSSProperties['width'];
    className?: string;
    errorMessage?: string;
    rawError?: FetchBaseQueryError | SerializedError;
}

export function GenericError({
    height,
    width,
    className,
    errorMessage,
    rawError,
}: Props) {
    const error = useMemo(() => {
        if (errorMessage) return errorMessage;
        if (rawError) {
            if ('message' in rawError) {
                return rawError.message;
            }
            // if (
            //     'data' in rawError &&
            //     'error' in (rawError.data as users.ApiError)
            // ) {
            //     return (rawError.data as users.ApiError).error;
            // }
        }
    }, [rawError, errorMessage]);
    return (
        <div style={{ height, width }} className={clsx(styles.root, className)}>
            <Typography variant="h3" align="center">
                Что-то пошло не так.
            </Typography>
            {error && (
                <Typography variant="text" color="grey-600" align="center">
                    {error}
                </Typography>
            )}
        </div>
    );
}
