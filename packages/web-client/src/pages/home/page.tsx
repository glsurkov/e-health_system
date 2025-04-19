import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { getCurrentUserRoleLevel } from '@/entities/current-user';

import { GenericPageLoader } from '@/shared/ui';

export default function HomePage() {
    const currentUserRoleLevel = useSelector(getCurrentUserRoleLevel);

    return (
        <Suspense fallback={<GenericPageLoader />}>
            {currentUserRoleLevel > 0
                ? isSuccess && <Navigate to="/dashboards/me" replace />
                : isSuccess && <Navigate to="/kanban" replace />}
            {isError && <Navigate to="/login" replace />}
        </Suspense>
    );
}
