import { Button, ModalWrapper, TextAreaInput, Typography } from '@/shared/ui';
import styles from './styles.module.scss';
import { useRecordsControllerCreateRecordMutation } from '@/shared/api/rest/records.ts';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './validation-schema.ts';
import { useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';

type CreateForm = {
    patientId: string;
    doctorId: string;
    dataHash: string;
}

const defaultValues: CreateForm = {
    patientId: 'patient1',
    doctorId: 'doctor1',
    dataHash: '',
}

interface UserCardCreateRecordModalProps {
    onClose: () => void;
    isOpen: boolean;
}

export const UserCardCreateRecordModal = (props: UserCardCreateRecordModalProps) => {
    const { onClose, isOpen } = props;
    const [handleCreate, { isLoading, isSuccess, error}] = useRecordsControllerCreateRecordMutation();

    const {
        register,
        handleSubmit,
    } = useForm<CreateForm>({
        resolver: yupResolver(schema),
        defaultValues,
    });

    const onSubmit = useCallback((data: CreateForm) => {
        if (data) {
            handleCreate({
                patientId: data.patientId,
                doctorId: data.doctorId,
                dataHash: data.dataHash,
            })
        }
    }, []);

    useEffect(() => {
        if (isSuccess) {
            onClose();
        }
    }, [isSuccess]);

    useEffect(() => {
        if (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            toast.error(error.status);
        }
    }, [error])

    return (
        <ModalWrapper onClose={onClose} isOpen={isOpen}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.root}>
                <h1>Добавить запись</h1>
                <div className={styles.description}>
                    <Typography variant="h2">
                        Описание
                    </Typography>
                    <TextAreaInput {...register('dataHash')} className={styles.descriptionArea}/>
                </div>
                <Button
                    type="submit"
                    className={styles.button}
                    disabled={isLoading}
                >
                    Подтвердить
                </Button>
            </form>
        </ModalWrapper>
    );
};
