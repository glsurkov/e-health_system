import { useCallback } from 'react';
import { createPortal } from 'react-dom';

import { IconClose } from '@/shared/assets';

import { Button } from '../../index.ts';
import { Card } from '../..';
import { modalRootId } from '../modal-root';
import { GenericPageLoader } from '../..';
import styles from './styles.module.scss';

interface IModalWrapperArgs {
    children: React.ReactNode;
    onClose: () => void;
    isOpen: boolean;
    processing?: boolean;
}

export const ModalWrapper = ({
    children,
    isOpen,
    onClose,
    processing,
}: IModalWrapperArgs) => {
    const handleCatchCardClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
        },
        [],
    );

    if (!isOpen) return null;

    const root = document.getElementById(modalRootId);

    console.log(root);
    if (!root) return null;

    const Modal = (
        <div className={styles.overlay} onClick={onClose}>
            <Card className={styles.modalCard} onClick={handleCatchCardClick}>
                <Button
                    variant="clear"
                    className={styles.closeButton}
                    onClick={onClose}
                >
                    <IconClose />
                </Button>
                {children}
                {processing && (
                    <GenericPageLoader width="100%" height="100%" withBackdrop />
                )}
            </Card>
        </div>
    );

    return createPortal(Modal, root);
};
