import {ReactNode, Suspense, useEffect} from 'react';
import {Navigate} from 'react-router-dom';

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
import {GenericPageLoader} from '@/shared/ui';

export const AuthProvider = (
    {
        component,
        isAdminRoute,
    }: {
        component: ReactNode;
        isAdminRoute?: boolean;
    }
) => {
    // const { isSuccess, isError, data, isUninitialized, isFetching, isLoading } =
    //     api.auth.useAuthControllerGetMeQuery();

    // useEffect(() => {
    //     if (isError) {
    //         window.location.href = '/login';
    //     }
    // }, [isError]);
    //
    // if (isFetching || isUninitialized || isLoading) {
    //     return <LoaderPage width="100dwv" height="100dvh" />;
    // }

    return (
        <Suspense fallback={<GenericPageLoader width="100dvw" height="100dvh"/>}>
            {/*//     {isAdminRoute &&*/}
            {/*//         !data?.user.isAdministrator &&*/}
            {/*//         data?.user.role.name !== UserRole.SYSTEM_ADMIN && (*/}
            {/*//             <Navigate to="/" />*/}
            {/*//         )}*/}
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
