import styles from './styles.module.scss';
import { IconAddUser, IconLogo, IconLogout, IconMedicalCard, IconPermissions } from '@/shared/assets';
import {ModalWrapper} from "@/shared/ui/modals/modal-wrapper";
import {Button} from "@/shared/ui";
import {useToggle} from "@/shared/lib/common/useToggle.ts";
import clsx from "clsx";
import {useMemo} from "react";
import {TabButton} from "@/layouts/auth/tab-button";
import {useLocation, useNavigate} from "react-router-dom";
import { useAppSelector } from '@/shared/lib';
import { UserRoles } from '@/shared/consts/roles.ts';

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
    const role = useAppSelector(state => state.auth.role);
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
                role === UserRoles.Admin
                    ? {
                        Icon: IconAddUser,
                        path: '/register',
                        name: 'Регистрация новых пользователей',
                    }
                    : null,
                {

                    Icon: IconMedicalCard,
                    path: '/card/me',
                    name: 'Медицинская карта пациента',
                },
                {
                    Icon: IconPermissions,
                    path: '/permissions.ts/me',
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
