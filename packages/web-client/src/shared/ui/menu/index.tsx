import clsx from 'clsx';
import { ReactNode, useEffect, useMemo, useRef } from 'react';

import { IconTripleDot } from '@/shared/assets';
import { useOutsideClick } from '@/shared/lib';
import { Button, Typography } from '..';

import styles from './styles.module.scss';

interface IMenuProps {
    className?: string;
    wrapperClassName?: string;
    menuList: MenuElem[];
    isOpen: boolean;
    toggleMenu: () => void;
    closeMenu: () => void;
    offset?: number;
}

export interface MenuElem {
    tooltip?: string;
    isActive: boolean;
    label: string;
    icon?: ReactNode;
    onClick: () => void;
    isVisible: boolean;
}

export const Menu = ({
    className,
    menuList,
    closeMenu,
    isOpen,
    toggleMenu,
    offset,
    wrapperClassName,
}: IMenuProps) => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useOutsideClick({
        ref: wrapperRef,
        handler: closeMenu,
    });

    const offsetStyle = useMemo(() => {
        if (offset !== undefined) return { top: offset };
    }, [offset]);

    useEffect(() => {
        // close menu on parent scroll with offset
        // TODO close menu on parent scroll without offset
        if (offset !== undefined) closeMenu();
    }, [offset]);

    if (menuList.length === 0) {
        return null;
    }

    return (
        <div
            className={clsx(styles.buttonWrapper, wrapperClassName)}
            ref={wrapperRef}
        >
            <Button
                variant="clear"
                className={clsx(styles.menuButton, className)}
                onClick={toggleMenu}
            >
                <IconTripleDot />
            </Button>
            {isOpen && (
                <div
                    className={clsx(styles.menu, {
                        [styles.menuWithoutOffset]: offset === undefined,
                    })}
                    style={offsetStyle}
                >
                    {menuList.map(
                        ({
                            tooltip,
                            label,
                            icon,
                            isActive,
                            onClick,
                            isVisible,
                        }) =>
                            isVisible ? (
                                <div
                                    key={label}
                                    className={clsx({
                                        [styles.withTooltip]: !isActive,
                                        [styles.tooltip]: Boolean(tooltip),
                                    })}
                                    data-tooltip-text={tooltip}
                                >
                                    <Button
                                        variant="clear"
                                        className={styles.itemMenuButton}
                                        onClick={onClick}
                                        disabled={!isActive}
                                    >
                                        {icon}
                                        <Typography
                                            color={
                                                isActive ? 'black' : 'grey-400'
                                            }
                                        >
                                            {label}
                                        </Typography>
                                    </Button>
                                </div>
                            ) : null,
                    )}
                </div>
            )}
        </div>
    );
};
