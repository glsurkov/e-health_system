import clsx from 'clsx';
import { useMemo, useRef } from 'react';

import {
    IconClose,
    IconDownload,
    IconFlagged,
    IconPaperclip,
} from '@/shared/assets';
import { useToggle } from '@/shared/lib';
import { Typography } from '..';

import { Menu, MenuElem } from '../menu';
import styles from './styles.module.scss';

export type ItemAction = 'download' | 'remove' | 'menu';

interface ITaskAttachmentItemDataProps
    extends React.HTMLAttributes<HTMLDivElement> {
    fileName: string;
    itemAction?: ItemAction;
    additionalIconClassName?: string;
    className?: string;
    menuItems?: MenuElem[];
    scrollPosition?: number;
    flagged: boolean;
}

const additionalIconMap = {
    download: IconDownload,
    remove: IconClose,
    menu: null,
};

export const TaskAttachmentItemData = ({
    fileName,
    itemAction,
    className,
    additionalIconClassName,
    menuItems,
    scrollPosition,
    flagged,
    ...props
}: ITaskAttachmentItemDataProps) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const {
        value: isItemMenuOpen,
        setFalse: handleCloseItemMenu,
        setToggle: handleToggleItemMenu,
    } = useToggle(false);

    const menuOffset = useMemo(() => {
        return (wrapperRef.current?.offsetTop ?? 0) - (scrollPosition ?? 0);
    }, [wrapperRef, scrollPosition]);

    const AdditionalIcon = itemAction ? additionalIconMap[itemAction] : null;
    return (
        <div className={className} {...props} ref={wrapperRef}>
            <div className={styles.attachmentIcon}>
                <IconPaperclip />
            </div>
            <Typography className={styles.fileName} color="black">
                {fileName}
            </Typography>
            {flagged && <IconFlagged />}
            {AdditionalIcon && (
                <AdditionalIcon
                    className={clsx(
                        styles.additionalIcon,
                        additionalIconClassName,
                    )}
                />
            )}
            {menuItems?.length && (
                <Menu
                    menuList={menuItems}
                    closeMenu={handleCloseItemMenu}
                    isOpen={isItemMenuOpen}
                    toggleMenu={handleToggleItemMenu}
                    wrapperClassName={styles.buttonWrapper}
                    offset={menuOffset}
                />
            )}
        </div>
    );
};
