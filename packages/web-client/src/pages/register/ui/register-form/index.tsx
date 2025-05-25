import { useCallback, useEffect, useMemo, useState } from 'react';

import { UserRoles } from '@/shared/consts/roles.ts';
import {
    Button,
    TextInput,
    Typography,
} from '@/shared/ui';
import { Select } from '@/shared/ui/select';

import styles from './styles.module.scss';
import { useAuthControllerRegisterMutation } from '@/shared/api/rest/auth.ts';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/pages/register/ui/register-form/validation-schema.ts';
import toast from 'react-hot-toast';
import { useAppSelector } from '@/shared/lib';

type RegisterForm = {
    userId: string;
    role: string;
}

const defaultValues: RegisterForm = {
    userId: '',
    role: UserRoles.Admin,
}

export const RegisterForm = () => {
    const certificate = useAppSelector(state => state.auth.certificate)
    const [selectedRole, setSelectedRole] = useState(UserRoles.Admin);

    const rolesData = useMemo(() => {
        return [
            {
                label: UserRoles.Admin,
                value: UserRoles.Admin,
            },
            {
                label: UserRoles.Doctor,
                value: UserRoles.Doctor,
            },
            {
                label: UserRoles.Patient,
                value: UserRoles.Patient,
            },
        ];
    }, []);

    const {
        register,
        handleSubmit,
    } = useForm<RegisterForm>({
        resolver: yupResolver(schema),
        defaultValues,
    })

    const [handleRegister, { isLoading, isSuccess, error}] = useAuthControllerRegisterMutation();

    const handleRolesOption = useCallback(
        (option: string) => {
            setSelectedRole(option);
        },
        [rolesData],
    );

    const onSubmit = useCallback((data: RegisterForm) => {
        handleRegister({
            userId: data.userId,
            role: selectedRole as string,
            affiliation: 'org1.department1',
            adminCertificate: selectedRole !== UserRoles.Admin && certificate
                ? certificate
                : undefined,
        });
    }, [selectedRole, certificate]);

    useEffect(() => {
        if (isSuccess) {
            toast.success('Successfully registered new User');
        }
    }, [isSuccess]);

    useEffect(() => {
        if (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            toast.error(error.status);
        }
    }, [error]);

    return (
        <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
            <Typography>ID Пользователя</Typography>
            <TextInput
                {...register('userId')}
            />
            <Typography>Роль пользователя</Typography>
            <Select
                {...register('role')}
                labelColor="gray"
                selectedValue={selectedRole}
                data={rolesData}
                classNameRoot={styles.root}
                onSelect={handleRolesOption}
            />
            <Button
                disabled={isLoading}
                type="submit"
                className={styles.button}>
                Добавить
            </Button>
        </form>
    );
};
