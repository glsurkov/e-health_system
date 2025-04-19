import clsx from 'clsx';
import { InputHTMLAttributes, forwardRef } from 'react';

import styles from './styles.module.scss';

interface ITextAreaInputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
    isError?: boolean;
    floatingTitle?: string;
}

export const TextAreaInput = forwardRef<
    HTMLTextAreaElement,
    ITextAreaInputProps
>(
    (
        {
            isError,
            className,
            floatingTitle,
            ...restProps
        }: ITextAreaInputProps,
        ref,
    ) => {
        return (
            <div className={styles.container}>
                {floatingTitle && (
                    <div className={styles.title}>{floatingTitle}</div>
                )}
                <div
                    className={clsx(
                        styles.inputWrapper,
                        {
                            [styles.isError]: isError,
                            [styles.disabled]: restProps.disabled,
                        },
                        className,
                    )}
                >
                    <textarea
                        {...restProps}
                        ref={ref}
                        className={styles.input}
                    />
                </div>
            </div>
        );
    },
);

TextAreaInput.displayName = 'TextAreaInput';
