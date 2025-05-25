import type { LocalStorageProps, LocalStorageReturned } from './types.ts';

/**
 * Creates a typed localStorage helper. If types are `string`, the transforms
 * default to identity. Otherwise, they are required.
 */
export function createLocalStorage<Type>({
    key,
    toLocalStorage,
    fromLocalStorage,
    defaultValue,
}: LocalStorageProps<Type>): LocalStorageReturned<Type> {
    // Fallback to identity if optional transform is not provided (for string types).
    const _toLocalStorage = toLocalStorage ?? ((value: Type) => value as unknown as string);

    const _fromLocalStorage = fromLocalStorage ?? ((value: string) => value as unknown as Type);

    let storedValue: Type;
    try {
        const data = localStorage.getItem(key);
        storedValue = data !== null ? _fromLocalStorage(data) : defaultValue;
    } catch {
        storedValue = defaultValue;
    }

    function set(value: Type) {
        localStorage.setItem(key, _toLocalStorage(value));
    }

    function remove() {
        localStorage.removeItem(key);
    }

    return { value: storedValue, set, remove };
}
