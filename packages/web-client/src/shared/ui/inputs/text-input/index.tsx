import clsx from 'clsx';
import { InputHTMLAttributes, forwardRef } from 'react';

import styles from './styles.module.scss';

interface ITextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    errorMessage?: string;
    beforeInputElement?: React.ReactNode;
    afterInputElement?: React.ReactNode;
    variant?: 'small' | 'medium';
    floatingTitle?: string;
}

export const TextInput = forwardRef<HTMLInputElement, ITextInputProps>(
    (
        {
            errorMessage,
            className,
            afterInputElement,
            beforeInputElement,
            variant = 'small',
            floatingTitle,
            type = 'text',
            value,
            ...restProps
        }: ITextInputProps,
        ref,
    ) => {
        const isError = Boolean(errorMessage);

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
                        styles[`${variant}-variant`],
                        className,
                    )}
                >
                    {beforeInputElement}
                    <input
                        {...restProps}
                        ref={ref}
                        className={styles.input}
                        type={type}
                        value={value}
                    />
                    {afterInputElement}
                </div>
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            </div>
        );
    },
);

TextInput.displayName = 'TextInput';

export type ICustomizedInputProps = Omit<
    ITextInputProps,
    'afterInputElement' | 'beforeInputElement'
>;
