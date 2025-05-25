import {
    autoUpdate,
    flip,
    offset,
    size,
    useClick,
    useDismiss,
    useFloating,
    useInteractions,
    useListNavigation,
    useRole,
    useTypeahead,
} from '@floating-ui/react';
import clsx from 'clsx';
import { MutableRefObject, ReactNode, useRef, useState } from 'react';

import { IconArrowDown, IconTick } from '@/shared/assets';
import { clsInputWithTopLabel } from '@/shared/ui/design-tokens';
import { InputLabel, InputLabelProps } from '@/shared/ui/inputs/input-label';

import { InputDropdownList, InputDropdownListProps } from '@/shared/ui/inputs/input-dropdown-list';
import cls from './styles.module.scss';

export interface SelectProps {
    selectedValue:
        | string
        | number
        | null
        | {
              value: number | string;
              label: string;
          };
    data: InputDropdownListProps['options'];
    onSelect: (selectedValue: string | number | null) => void;
    width?: string;
    children?: (isOpened: boolean) => ReactNode;
    label?: string;
    placeholder?: string;
    variant?: 'primary' | 'small';
    labelColor?: InputLabelProps['color'];
    disabled?: boolean;
    classNameRoot?: string;
    errorMessage?: string;
}

export const Select = ({
    data,
    selectedValue,
    onSelect,
    width = '100%',
    children,
    label,
    placeholder,
    variant = 'primary',
    labelColor,
    disabled,
    classNameRoot,
    errorMessage,
}: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const selectedIndex = data.findIndex(({ value }) => value === selectedValue);

    function setSelectedIndex(index: number | null) {
        const value = index === null ? null : data[index];
        onSelect(value?.value ?? null);
    }

    const floating = useFloating<HTMLElement>({
        placement: 'bottom-start',
        open: isOpen,
        onOpenChange: (prev) => {
            if (!disabled) {
                setIsOpen(prev);
            }
        },
        whileElementsMounted: autoUpdate,
        middleware: [
            offset(5),
            flip({ padding: 10 }),
            size({
                apply({ rects, elements, availableHeight }) {
                    Object.assign(elements.floating.style, {
                        maxHeight: `${availableHeight}px`,
                        minWidth: `${rects.reference.width}px`,
                    });
                },
                padding: 10,
            }),
        ],
    });

    const listRef = useRef<Array<HTMLElement | null>>([]);
    const listContentRef = useRef(data);
    const isTypingRef = useRef(false);

    const click = useClick(floating.context, { event: 'mousedown' });
    const dismiss = useDismiss(floating.context);
    const role = useRole(floating.context, { role: 'listbox' });
    const listNav = useListNavigation(floating.context, {
        listRef,
        activeIndex,
        selectedIndex,
        onNavigate: setActiveIndex,
        loop: true,
    });
    const typeahead = useTypeahead(floating.context, {
        listRef: listContentRef as unknown as MutableRefObject<(string | null)[]>,
        activeIndex,
        selectedIndex,
        onMatch: isOpen ? setActiveIndex : setSelectedIndex,
        onTypingChange(isTyping) {
            isTypingRef.current = isTyping;
        },
    });

    const interactions = useInteractions([dismiss, role, listNav, typeahead, click]);

    const handleSelect = (index: number) => {
        setSelectedIndex(index);
        setIsOpen(false);
    };

    function getSelectedValueLabel() {
        if (!selectedValue) {
            return null;
        }
        if (typeof selectedValue === 'object') {
            return selectedValue.label;
        }
        return data[selectedIndex]?.label;
    }

    return (
        <>
            <div
                tabIndex={0}
                ref={floating.refs.setReference}
                className={clsx(cls.trigger, classNameRoot)}
                aria-labelledby="select-label"
                aria-autocomplete="none"
                style={{ width }}
                {...interactions.getReferenceProps()}
            >
                {children ? (
                    children(isOpen)
                ) : (
                    <div className={clsInputWithTopLabel.root}>
                        <div
                            className={clsx(clsInputWithTopLabel.input, {
                                [clsInputWithTopLabel.inputDisabled]: disabled,
                            })}
                        >
                            <InputLabel label={label} color={labelColor} />
                            {selectedIndex !== -1 && getSelectedValueLabel() ? (
                                <p className={clsInputWithTopLabel.inputText}>{getSelectedValueLabel()}</p>
                            ) : (
                                <p className={clsInputWithTopLabel.placeholder}>{placeholder}</p>
                            )}
                            <IconArrowDown className={clsx({ [cls.openedIcon]: isOpen })} />
                        </div>
                    </div>
                )}
            </div>
            {isOpen && (
                <InputDropdownList
                    multiple={false}
                    selectedValue={selectedValue}
                    selectedValues={[]}
                    options={data}
                    floating={floating}
                    interactions={interactions}
                    handleSelect={handleSelect}
                    activeIndex={activeIndex}
                    listRef={listRef}
                    isTypingRef={isTypingRef}
                    classNameLi={variant === 'small' ? cls.option : undefined}
                    classNameLiSelected={variant === 'small' ? cls.selectedOption : undefined}
                >
                    {variant === 'small'
                        ? ({ label }, i) => (
                              <>
                                  {i === selectedIndex && <IconTick className={cls.tick} />}
                                  {label}
                              </>
                          )
                        : undefined}
                </InputDropdownList>
            )}
            {errorMessage && <p className={clsInputWithTopLabel.error}>{errorMessage}</p>}
        </>
    );
};
