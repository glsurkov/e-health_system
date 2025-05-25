import { useCallback, useEffect } from 'react';

interface Props {
    onEscape: () => void;
}

export const useEscapeListener = (props: Props) => {
    const { onEscape } = props;

    const handleEscape = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onEscape();
            }
        },
        [onEscape],
    );

    useEffect(() => {
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [handleEscape]);
};
