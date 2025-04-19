import { UserRole } from '@/shared/consts';
import { StateSchema } from '@/shared/store';

export const getCurrentUser = (state: StateSchema) => state.user?.currentUser;
export const getCurrentUserHeaderInfo = (state: StateSchema) => {
    const displayName = state.user?.currentUser?.displayName.split(' ');
    const userRole = state.user?.currentUser?.role.name as UserRole;

    return {
        name: displayName?.[0] ?? '',
        surname: displayName?.[1] ?? '',
        cupName: [UserRole.RPP, UserRole.RP].includes(userRole)
            ? 'КУП метро 10'
            : null,
        jobTitle: state.user?.currentUser?.position?.humanReadableName ?? '',
        avatar: state.user?.currentUser?.avatar ?? '',
    };
};

export const isAuthorized = (state: StateSchema) =>
    Boolean(state.user?.currentUser);
export const isAdmin = (state: StateSchema) =>
    state.user?.currentUser?.isAdministrator;

export const getCurrentUserId = (state: StateSchema) =>
    state.user?.currentUser?.id || '';

export const getCurrentUserRoleLevel = (state: StateSchema) =>
    state.user?.currentUser?.role?.level ?? 0;
