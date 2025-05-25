import { StateSchema } from '@/shared/redux';

export const isAuthorized = (state: StateSchema) => Boolean(state.auth?.certificate);
export const getViewer = (state: StateSchema) => state.auth?.certificate || null;
