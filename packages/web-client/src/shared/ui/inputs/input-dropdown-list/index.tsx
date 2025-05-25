import { FloatingFocusManager, FloatingPortal, useFloating, useInteractions } from '@floating-ui/react';
import clsx from 'clsx';
import { ReactNode, RefObject } from 'react';

import cls from './styles.module.scss';

interface Option {
    color?: string;
    value: string | number;
    label: string;
}

export type SelectedValue =
    | string
    | number
    | null
    | {
          label: string;
          value: string | number;
      };

export interface InputDropdownListProps {
    floating: ReturnType<typeof useFloating>;
    options: Option[];
    interactions: ReturnType<typeof useInteractions>;
    selectedValue?: SelectedValue;
    selectedValues?: SelectedValue[];
    multiple?: boolean;
    handleSelect: (index: number) => void;
    activeIndex: number | null;
    listRef: RefObject<Array<HTMLElement | null>>;
    isTypingRef: RefObject<boolean>;
    classNameLi?: string;
    classNameLiSelected?: string;
    children?: (option: Option, index: number) => ReactNode;
}

export const InputDropdownList = ({
    floating,
    options,
    interactions,
    selectedValue,
    selectedValues,
    multiple = false,
    handleSelect,
    activeIndex,
    listRef,
    isTypingRef,
    classNameLi,
    classNameLiSelected,
    children,
}: InputDropdownListProps) => {
    function getItemValue(item: SelectedValue) {
        if (typeof item === 'object' && item !== null) {
            return item.value;
        }
        return item;
    }

    const isItemSelected = (value: string | number): boolean => {
        if (multiple && selectedValues) {
            return Boolean(selectedValues.find((el) => getItemValue(el) === value));
        }
        if (selectedValue) {
            return value === getItemValue(selectedValue);
        }
        return false;
    };

    return (
        <FloatingPortal>
            <FloatingFocusManager context={floating.context} modal={false}>
                <div
                    ref={floating.refs.setFloating}
                    className={cls.list}
                    style={floating.floatingStyles}
                    {...interactions.getFloatingProps()}
                >
                    {options.map((option, i) => {
                        const selected = isItemSelected(option.value);
                        return (
                            <div
                                key={option.value}
                                ref={(node) => {
                                    listRef.current[i] = node;
                                }}
                                className={clsx(
                                    cls.li,
                                    {
                                        [classNameLiSelected ? classNameLiSelected : cls.selected]: selected,
                                    },
                                    classNameLi,
                                )}
                                role="option"
                                tabIndex={i === activeIndex ? 0 : -1}
                                aria-selected={selected && i === activeIndex}
                                {...interactions.getItemProps({
                                    onClick() {
                                        handleSelect(i);
                                    },
                                    onKeyDown(event) {
                                        if (event.key === 'Enter') {
                                            event.preventDefault();
                                            handleSelect(i);
                                        }
                                        if (event.key === ' ' && !isTypingRef.current) {
                                            event.preventDefault();
                                            handleSelect(i);
                                        }
                                    },
                                })}
                            >
                                {children ? (
                                    children(option, i)
                                ) : (
                                    <div className={cls.liContent}>
                                        {option.color && (
                                            <div className={cls.colorRectangle} style={{ background: option.color }} />
                                        )}
                                        {option.label}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </FloatingFocusManager>
        </FloatingPortal>
    );
};
