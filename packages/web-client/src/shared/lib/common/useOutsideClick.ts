import { useEffect } from 'react';

interface IOutsideClickHandlerProps {
    ref: React.RefObject<HTMLElement>;
    handler: (ev: MouseEvent) => void;
}

export const useOutsideClick = ({
    ref,
    handler,
}: IOutsideClickHandlerProps) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                handler(event);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, handler]);
};
