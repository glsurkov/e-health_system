import styles from './styles.module.scss';
import {IconLogo, IconLogout, IconMedicalCard, IconPermissions} from "@/shared/assets";
import {ModalWrapper} from "@/shared/ui/modals/modal-wrapper";
import {Button} from "@/shared/ui";
import {useToggle} from "@/shared/lib/common/useToggle.ts";
import clsx from "clsx";
import {useMemo} from "react";
import {TabButton} from "@/layouts/auth/tab-button";
import {useLocation, useNavigate} from "react-router-dom";

type RoutePaths = Array<{
    Icon: React.FC;
    path: string;
    disabled?: boolean;
    name: string;
    notification?: {
        count?: number;
    };
}>;

export const AuthHeader = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const {
        value: isLogoutModalVisible,
        setTrue: showLogoutModal,
        setFalse: hideLogoutModal,
    } = useToggle(false);

    const paths: RoutePaths = useMemo(
        () =>
            [
                {

                    Icon: IconMedicalCard,
                    path: '/card/me',
                    name: 'Медицинская карта пациента',
                },
                {
                    Icon: IconPermissions,
                    path: '/permissions/me',
                    name: 'Список разрешений',
                },
            ].filter((route) => route !== null),
        [],
    );

    const routeIcons = useMemo(() => {
        return paths;
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.topAreaContainer}>
                <IconLogo/>
            </div>

            <div className={styles.buttons}>
                {routeIcons.map(
                    ({ Icon, path, name, disabled, notification }) => (
                        <TabButton
                            key={path}
                            Icon={Icon}
                            active={pathname.startsWith(path)}
                            onClick={() => {
                                navigate(path);
                            }}
                            disabled={disabled}
                            name={name}
                            notification={notification}
                        />
                    ),
                )}
            </div>

            <div className={styles.buttonsBottom}>
                <Button
                    variant="clear"
                    className={styles.logout}
                    onClick={showLogoutModal}
                >
                    <IconLogout/>
                </Button>
            </div>

            <LogoutModal
                isVisible={isLogoutModalVisible}
                hide={hideLogoutModal}
                logout={() => {}}
            />
        </div>
    );
};

interface ILogoutModalProps {
    isVisible: boolean;
    hide: () => void;
    logout: () => void;
}

const LogoutModal = (props: ILogoutModalProps) => {
    const { isVisible, hide, logout } = props;

    return (
        <ModalWrapper onClose={hide} isOpen={isVisible}>
            <h2 className={styles.title}>Вы уверены, что хотите выйти?</h2>
            <div className={styles.buttons}>
                <Button
                    className={clsx(styles.btn, styles.cancelButton)}
                    onClick={hide}
                >
                    Отменить
                </Button>
                <Button
                    className={clsx(styles.btn, styles.exitButton)}
                    onClick={() => {
                        //clearInLocalStorage(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
                        logout();
                    }}
                >
                    Выйти
                </Button>
            </div>
        </ModalWrapper>
    );
};
