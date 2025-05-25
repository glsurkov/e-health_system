import { useEffect, useRef, useState } from 'react';

interface Props {
    animationDelay: number;
    isVisible: boolean;
}

export function useModalAnimation(props: Props) {
    const { animationDelay, isVisible } = props;
    const [isClosing, setIsClosing] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (!isVisible) {
            setIsClosing(true);
            timer.current = setTimeout(() => {
                setIsModalVisible(false);
                setIsClosing(false);
            }, animationDelay);
        } else {
            setIsModalVisible(isVisible);
        }
    }, [isVisible]);

    return {
        isModalClosing: isClosing,
        isModalVisible,
    };
}
