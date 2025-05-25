import { Button, TextInput, Typography } from '@/shared/ui';
import { useCallback, useEffect } from 'react';
import styles from './styles.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './validation-schema.ts';
import { useAuthControllerEnrollMutation } from '@/shared/api/rest/auth.ts';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/shared/lib';
import { enrollSuccessful } from '@/shared/viewer';

type EnrollForm = {
    userId: string;
    secret: string;
}

const defaultValues: EnrollForm = {
    userId: '',
    secret: '',
}

export const EnrollForm = () => {
    const {
        register,
        handleSubmit,
    } = useForm<EnrollForm>({
        resolver: yupResolver(schema),
        defaultValues,
    });
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [handleEnroll, { isLoading, isSuccess, error, data: enrollData}] = useAuthControllerEnrollMutation();

    const onSubmit = useCallback((data: EnrollForm) => {
        handleEnroll({
            userId: data.userId,
            secret: data.secret,
        });
    }, []);

    useEffect(() => {
        if (isSuccess) {
            navigate('/card/me');
            dispatch(enrollSuccessful(enrollData.enrollment.credentials))
        }
    }, [isSuccess, enrollData]);

    useEffect(() => {
        if (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            toast.error(error.status);
        }
    }, [error])

    return (
        <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
            <Typography>ID Пользователя</Typography>
            <TextInput
                {...register('userId')}
            />
            <Typography>Secret</Typography>
            <TextInput
                {...register('secret')}
            />
            <Button
                disabled={isLoading}
                type="submit"
                className={styles.button}>
                Активировать
            </Button>
        </form>
    );
};
