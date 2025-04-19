import React, {useCallback} from 'react';
import {useToggle} from "@/shared/lib";
import styles from './styles.module.scss';
import clsx from "clsx";
import {IconMore} from "@/shared/assets";

interface ExpandableSectionProps {
    additionalInfo: React.ReactNode;
    children: React.ReactNode;
    onClick: () => void;
    defaultOpen?: boolean;
    className?: string;
}

export const ExpandableCard= (props: ExpandableSectionProps) => {
    const {children, additionalInfo, onClick, defaultOpen = false, className} = props;
    const {
        value: isOpen,
        setToggle: onToggle,
    } = useToggle(defaultOpen);

    const onExpand = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        onToggle();
    }, []);

    return (
        <div className={styles.container}>
            <div
                onClick={onClick}
                className={clsx(styles.infoContainer, className)}
            >
                {children}
                <div
                    onClick={onExpand}
                    className={styles[isOpen ? 'hide' : 'open']}
                >
                    <IconMore/>
                </div>
            </div>
            {isOpen && (
                <div className={styles.additionalInfoContainer}>
                    {additionalInfo}
                </div>
            )}
        </div>
    );
};
