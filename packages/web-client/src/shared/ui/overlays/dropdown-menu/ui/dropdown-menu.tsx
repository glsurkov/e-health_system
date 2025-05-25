import * as React from 'react';
import {
    FloatingFocusManager,
    FloatingList,
    FloatingNode,
    FloatingPortal,
    FloatingTree,
    autoUpdate,
    flip,
    offset,
    safePolygon,
    shift,
    useClick,
    useDismiss,
    useFloating,
    useFloatingNodeId,
    useFloatingParentNodeId,
    useFloatingTree,
    useHover,
    useInteractions,
    useListItem,
    useListNavigation,
    useMergeRefs,
    useRole,
    useTypeahead,
} from '@floating-ui/react';
import { clsx } from 'clsx';
import { ReactNode, useMemo } from 'react';

import cls from './styles.module.scss';

const MenuContext = React.createContext<{
    getItemProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>;
    activeIndex: number | null;
    setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
    setHasFocusInside: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean;
}>({
    getItemProps: () => ({}),
    activeIndex: null,
    setActiveIndex: () => {},
    setHasFocusInside: () => {},
    isOpen: false,
});

interface MenuProps {
    component: ReactNode;
    nested?: boolean;
    children?: React.ReactNode;
    isOpen?: boolean;
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MenuComponent = React.forwardRef<HTMLButtonElement, MenuProps & React.HTMLProps<HTMLButtonElement>>(
    ({ children, component, isOpen: isOpenProp, setIsOpen: setIsOpenProp, ...props }, forwardedRef) => {
        const [isOpenState, setIsOpenState] = React.useState(false);
        const [hasFocusInside, setHasFocusInside] = React.useState(false);
        const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

        const isOpen = isOpenProp === undefined ? isOpenState : isOpenProp;
        const setIsOpen = useMemo(
            () => (setIsOpenProp === undefined ? setIsOpenState : setIsOpenProp),
            [setIsOpenProp],
        );

        const elementsRef = React.useRef<Array<HTMLButtonElement | null>>([]);
        const labelsRef = React.useRef<Array<string | null>>([]);
        const parent = React.useContext(MenuContext);

        const tree = useFloatingTree();
        const nodeId = useFloatingNodeId();
        const parentId = useFloatingParentNodeId();
        const item = useListItem();

        const isNested = parentId != null;

        const { floatingStyles, refs, context } = useFloating<HTMLButtonElement>({
            nodeId,
            open: isOpen,
            onOpenChange: setIsOpen,
            placement: isNested ? 'right-start' : 'bottom-start',
            middleware: [offset({ mainAxis: isNested ? 0 : 4, alignmentAxis: isNested ? -4 : 0 }), flip(), shift()],
            whileElementsMounted: autoUpdate,
        });

        const hover = useHover(context, {
            enabled: isNested,
            delay: { open: 75 },
            handleClose: safePolygon({ blockPointerEvents: true }),
        });
        const click = useClick(context, {
            event: 'mousedown',
            toggle: !isNested,
            ignoreMouse: isNested,
        });
        const role = useRole(context, { role: 'menu' });
        const dismiss = useDismiss(context, { bubbles: true });
        const listNavigation = useListNavigation(context, {
            listRef: elementsRef,
            activeIndex,
            nested: isNested,
            onNavigate: setActiveIndex,
        });
        const typeahead = useTypeahead(context, {
            listRef: labelsRef,
            onMatch: isOpen ? setActiveIndex : undefined,
            activeIndex,
        });

        const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
            hover,
            click,
            role,
            dismiss,
            listNavigation,
            typeahead,
        ]);

        React.useEffect(() => {
            if (!tree) return;

            function handleTreeClick() {
                setIsOpen(false);
            }

            function onSubMenuOpen(event: { nodeId: string; parentId: string }) {
                if (event.nodeId !== nodeId && event.parentId === parentId) {
                    setIsOpen(false);
                }
            }

            tree.events.on('click', handleTreeClick);
            tree.events.on('menuopen', onSubMenuOpen);

            return () => {
                tree.events.off('click', handleTreeClick);
                tree.events.off('menuopen', onSubMenuOpen);
            };
        }, [tree, nodeId, parentId]);

        React.useEffect(() => {
            if (isOpen && tree) {
                tree.events.emit('menuopen', { parentId, nodeId });
            }
        }, [tree, isOpen, nodeId, parentId]);

        return (
            <FloatingNode id={nodeId}>
                <button
                    ref={useMergeRefs([refs.setReference, item.ref, forwardedRef])}
                    tabIndex={!isNested ? undefined : parent.activeIndex === item.index ? 0 : -1}
                    role={isNested ? 'menuitem' : undefined}
                    data-open={isOpen ? '' : undefined}
                    data-nested={isNested ? '' : undefined}
                    data-focus-inside={hasFocusInside ? '' : undefined}
                    className={isNested ? cls.menuItem : cls.rootMenu}
                    {...getReferenceProps(
                        parent.getItemProps({
                            ...props,
                            onFocus(event: React.FocusEvent<HTMLButtonElement>) {
                                event.stopPropagation();
                                props.onFocus?.(event);
                                setHasFocusInside(false);
                                parent.setHasFocusInside(true);
                            },
                        }),
                    )}
                >
                    {component}
                    {isNested && (
                        <span aria-hidden style={{ marginLeft: 10, fontSize: 10 }}>
                            ▶
                        </span>
                    )}
                </button>
                <MenuContext.Provider
                    value={{
                        activeIndex,
                        setActiveIndex,
                        getItemProps,
                        setHasFocusInside,
                        isOpen,
                    }}
                >
                    <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                        {isOpen && (
                            <FloatingPortal>
                                <FloatingFocusManager
                                    context={context}
                                    modal={false}
                                    initialFocus={isNested ? -1 : 0}
                                    returnFocus={!isNested}
                                >
                                    <div
                                        ref={refs.setFloating}
                                        className={cls.menu}
                                        style={floatingStyles}
                                        {...getFloatingProps()}
                                    >
                                        {children}
                                    </div>
                                </FloatingFocusManager>
                            </FloatingPortal>
                        )}
                    </FloatingList>
                </MenuContext.Provider>
            </FloatingNode>
        );
    },
);

interface MenuItemProps {
    label: string;
    disabled?: boolean;
    icon?: ReactNode;
    color?: 'black' | 'red';
}

export const MenuItem = React.forwardRef<
    HTMLButtonElement,
    MenuItemProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ label, disabled, icon, color = 'black', ...props }, forwardedRef) => {
    const menu = React.useContext(MenuContext);
    const item = useListItem({ label: disabled ? null : label });
    const tree = useFloatingTree();
    const isActive = item.index === menu.activeIndex;

    return (
        <button
            {...props}
            ref={useMergeRefs([item.ref, forwardedRef])}
            type="button"
            role="menuitem"
            className={cls.menuItem}
            tabIndex={isActive ? 0 : -1}
            disabled={disabled}
            {...menu.getItemProps({
                onClick(event: React.MouseEvent<HTMLButtonElement>) {
                    props.onClick?.(event);
                    tree?.events.emit('click');
                },
                onFocus(event: React.FocusEvent<HTMLButtonElement>) {
                    props.onFocus?.(event);
                    menu.setHasFocusInside(true);
                },
            })}
        >
            <div className={cls.menuItemContent}>
                {icon && <div className={cls.menuItemIcon}>{icon}</div>}
                <p className={clsx(cls.menuItemLabel, cls[`menu-item-label-${color}`])}>{label}</p>
            </div>
        </button>
    );
});

export const Menu = React.forwardRef<HTMLButtonElement, MenuProps & React.HTMLProps<HTMLButtonElement>>(
    (props, ref) => {
        const parentId = useFloatingParentNodeId();

        if (parentId === null) {
            return (
                <FloatingTree>
                    <MenuComponent {...props} ref={ref} />
                </FloatingTree>
            );
        }

        return <MenuComponent {...props} ref={ref} />;
    },
);
