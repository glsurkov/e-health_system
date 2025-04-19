import { useCallback, useState } from 'react';

export const useToggle = (initialValue: boolean = false) => {
    const [value, setValue] = useState(initialValue);

    const setTrue = useCallback(() => {
        setValue(true);
    }, []);

    const setFalse = useCallback(() => {
        setValue(false);
    }, []);

    const setToggle = useCallback(() => {
        setValue((state) => !state);
    }, []);

    return {
        value,
        setTrue,
        setFalse,
        setToggle,
    };
};
