import { ReactNode, Suspense, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

// import { CupPositionsProvider } from '@/entities/cup-positions';
// import { CupsProvider } from '@/entities/cups';
// import { DatesProvider } from '@/entities/dates';
// import { HintsProvider } from '@/entities/hints';
// import { PbiProjectsProvider } from '@/entities/pbi-projects';
// import { PositionsProvider } from '@/entities/positions';
// import { RolesProvider } from '@/entities/roles';
//
// import { api } from '@/shared/api';
// import { UserRole } from '@/shared/consts';
import { GenericPageLoader } from '@/shared/ui';
import { useAuthControllerGetMeQuery } from '@/shared/api/rest/auth.ts';
import { localStorageCertificate, setCertificate } from '@/shared/viewer';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { UserRoles } from '@/shared/consts/roles.ts';

export const AuthProvider = ({
    component,
    isAdminRoute,
}: {
    component: ReactNode;
    isAdminRoute?: boolean;
}) => {
    const { isSuccess, isError, data, isUninitialized, isFetching, isLoading } = useAuthControllerGetMeQuery({});
    const role = useAppSelector(state => state.auth.role);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isSuccess) {
            if (localStorageCertificate.value?.certificate)
                dispatch(setCertificate(localStorageCertificate.value.certificate))
        }
    }, [isSuccess]);

    // useEffect(() => {
    //     if (isError) {
    //         window.location.href = '/enroll';
    //         localStorageCertificate.remove();
    //
    //     }
    // }, [isError]);

    if (isFetching || isUninitialized || isLoading) {
        return <GenericPageLoader width="100dwv" height="100dvh" />;
    }

    return (
        <Suspense
            fallback={<GenericPageLoader width="100dvw" height="100dvh" />}
        >
            {isAdminRoute &&
                data &&
                role !== UserRoles.Admin &&
                (
                    <Navigate to="/card" />
                )}
            <>
                {component}
                {/*<RolesProvider />*/}
                {/*<PositionsProvider />*/}
                {/*<CupsProvider />*/}
                {/*<PbiProjectsProvider />*/}
                {/*<CupPositionsProvider />*/}
                {/*<HintsProvider />*/}
                {/*<DatesProvider />*/}
            </>
        </Suspense>
    );
};
