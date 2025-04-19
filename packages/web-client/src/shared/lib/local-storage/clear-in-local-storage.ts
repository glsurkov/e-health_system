import type { LOCAL_STORAGE_KEYS } from '@/shared/config/local-storage/local-storage-keys';

/**
 * Clear value in local storage
 * @param {LOCAL_STORAGE_KEYS} key
 */
export function clearInLocalStorage(key: LOCAL_STORAGE_KEYS) {
    localStorage.removeItem(key);
}
