import { StateSchema } from '@/shared/redux';

export const isAuthorized = (state: StateSchema) => Boolean(state.auth?.viewer);
export const getViewer = (state: StateSchema) => state.auth?.viewer || null;
