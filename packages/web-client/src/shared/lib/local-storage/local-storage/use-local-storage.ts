import { useState } from 'react';

import type { LocalStorageProps, LocalStorageReturned } from './types.ts';

export function useLocalStorage<Type>({
    key,
    defaultValue,
    toLocalStorage,
    fromLocalStorage,
}: LocalStorageProps<Type>): LocalStorageReturned<Type> {
    const _toLocalStorage = toLocalStorage ?? ((value: Type) => value as unknown as string);
    const _fromLocalStorage = fromLocalStorage ?? ((value: string | number) => value as unknown as Type);

    const [value, setValue] = useState<Type>(() => {
        try {
            const data = localStorage.getItem(key);
            return data !== null ? _fromLocalStorage(data) : defaultValue;
        } catch {
            return defaultValue;
        }
    });

    function set(newValue: Type) {
        const data = _toLocalStorage(newValue);
        localStorage.setItem(key, data);
        setValue(_fromLocalStorage(data));
    }

    function remove() {
        localStorage.removeItem(key);
        setValue(defaultValue);
    }

    return { value, set, remove };
}
