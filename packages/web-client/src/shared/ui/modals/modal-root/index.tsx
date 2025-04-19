import styles from './styles.module.scss';

export const modalRootId = 'modal-root';
export const ModalRoot = () => (
    <div id={modalRootId} className={styles.modalRoot} />
);
