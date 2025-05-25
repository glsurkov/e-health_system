import { useEffect, useRef } from 'react';

interface Props {
    isVisible: boolean;
}

/**
 * Hook to trap focus for modals, popovers and other elements
 * when focus should be restricted to a particular container.
 * @returns {Object} result
 */
export function useFocusTrap(props: Props) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const savedFocusedElement = useRef<Element | null>(null);

    useEffect(() => {
        const modal = containerRef.current;
        if (!modal) return;

        savedFocusedElement.current = document.activeElement;

        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select-prev, textarea, [tabindex]:not([tabindex="-1"])',
        ) as unknown as HTMLElement[];

        if (focusableElements.length < 2) {
            return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const handleTabKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Tab') {
                if (event.shiftKey && document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                } else if (!event.shiftKey && document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        };

        const handleTabKeyPressOutsideModal = (event: KeyboardEvent) => {
            if (event.key === 'Tab') {
                event.preventDefault();
                firstElement.focus();
                document.removeEventListener('keydown', handleTabKeyPressOutsideModal);
            }
        };

        if (props.isVisible) {
            document.addEventListener('keydown', handleTabKeyPressOutsideModal);
        }
        modal.addEventListener('keydown', handleTabKeyPress);

        return () => {
            modal.removeEventListener('keydown', handleTabKeyPress);
            document.removeEventListener('keydown', handleTabKeyPressOutsideModal);

            if (savedFocusedElement.current instanceof HTMLElement && document.contains(savedFocusedElement.current)) {
                savedFocusedElement.current.focus();
            }
        };
    }, [props.isVisible]);

    return {
        ref: containerRef,
    };
}
