import { AuthLayout } from '@/layouts';
import styles from './styles.module.scss';
import { Button, GenericPageLoader, Select, TextInput, Typography } from '@/shared/ui';
import { PermissionsList } from '@/entities';
import { useAppSelector } from '@/shared/lib';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './validation-schema.ts';
import { useCallback, useMemo, useState } from 'react';
import { PermissionsTypes } from '@/shared/consts/permissions.ts';
import { UserRoles } from '@/shared/consts/roles.ts';
import {
    useRecordsControllerAccessRequestMutation,
    useRecordsControllerGetAllAccessRequestsQuery,
} from '@/shared/api/rest/records.ts';
import { IPermission } from '@/entities/permission/ui/permissions-list-item';

type AccessForm = {
    requestToId: string;
    permission: PermissionsTypes
}

const defaultValues: AccessForm = {
    requestToId: '',
    permission: PermissionsTypes.read,
}

export default function PermissionsPage() {
    const [handleAccessRequest, {isError, isLoading, isSuccess}] = useRecordsControllerAccessRequestMutation();
    const role = useAppSelector(state => state.auth.role);
    const [selectedPermission, setSelectedPermission] = useState<PermissionsTypes>();
    const {data: accessList, isSuccess: isAccessListSuccess, isLoading: isAccessListLoading, isError: isAccessListError} = useRecordsControllerGetAllAccessRequestsQuery({
        userId: 'patient1',
    });

    const {
        register,
        handleSubmit,
    } = useForm<AccessForm>({
        resolver: yupResolver(schema),
        defaultValues,
    });

    const permissionsOptions = useMemo(() => {
        return [
            {
                label: 'Чтение',
                value: PermissionsTypes.read,
            },
            {
                label: 'Запись',
                value: PermissionsTypes.write,
            },
        ];
    }, []);

    const handlePermissionOption = useCallback(
        (option: string) => {
            setSelectedPermission(option);
        },
        [],
    );

    const onSubmit = useCallback((data: AccessForm) => {
        if (data) {
            handleAccessRequest({
                requestById: 'doctor-new',
                requestToId: data.requestToId,
                permission: selectedPermission ?? 'read',
            });
        }
    }, [selectedPermission]);

    const lists = useMemo(() => {
        return accessList?.reduce((acc, item) => {
            if (item) {
                if (item.status === 'pending') {
                    acc.active.push(item);
                } else {
                    acc.history.push(item);
                }
            }
            return acc;
        }, {
            active: [] as IPermission[],
            history: [] as IPermission[],
        })
    }, [accessList])

    // const data = [{
    //     id: '1',
    //     fullname: "Dr Mundo",
    //     position: "Doctor",
    //     date: new Date(	1743832973000),
    // }, {
    //     id: '2',
    //     fullname: "WSH National Hospital",
    //     position: "Organization",
    //     date: new Date(	1743832973000),
    // }, {
    //     id: '3',
    //     fullname: "John Doe",
    //     position: "Doctor",
    //     date: new Date(	1743832973000),
    // }];

    // const dataHistory = [{
    //     id: '1',
    //     fullname: "Dr Mundo",
    //     position: "Doctor",
    //     date: new Date(	1743832973000),
    //     status: 'accepted',
    // }, {
    //     id: '2',
    //     fullname: "WSH National Hospital",
    //     position: "Organization",
    //     date: new Date(1743844850000),
    //     status: 'accepted',
    // }, {
    //     id: '3',
    //     fullname: "John Doe",
    //     position: "Doctor",
    //     date: new Date(1743844850000),
    //     status: 'declined',
    // }];

    if (isAccessListLoading) {
        return <GenericPageLoader/>
    }

    return (
        <AuthLayout className={styles.container}>
            {
                role === UserRoles.Doctor && (
                    <form onSubmit={handleSubmit(onSubmit)}
                          className={styles.accessForm}>
                        <Typography variant="h1">
                            Запросить доступ
                        </Typography>
                        <div className={styles.form}>
                            <h3>Id пользователя</h3>
                            <TextInput
                                {...register('requestToId')}
                                placeholder="Id пользователя"
                                className={styles.formInput}/>
                            <h3>Тип доступа</h3>
                            <Select
                                selectedValue={selectedPermission}
                                data={permissionsOptions}
                                onSelect={handlePermissionOption}/>
                            <Button
                                disabled={isLoading}
                                type="submit"
                            >
                                Отправить запрос
                            </Button>
                        </div>
                    </form>
                )
            }
            <Typography
                variant="h1"
            >
                Список запросов
            </Typography>
            <div className={styles.sectionsContainer}>
                <div className={styles.section}>
                    <Typography
                        weight="bold"
                        variant="h3"
                    >
                        Актуальные запросы
                    </Typography>
                    <PermissionsList data={lists?.active}/>
                </div>
                <div className={styles.section}>
                    <Typography
                        weight="bold"
                        variant="h3"
                    >
                        История запросов
                    </Typography>
                    <PermissionsList data={lists?.history}/>
                </div>
            </div>
        </AuthLayout>
    );
};
