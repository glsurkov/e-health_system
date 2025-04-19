import {AuthLayout} from "@/layouts";
import styles from "./styles.module.scss";
import {Typography} from "@/shared/ui";
import {PermissionsList} from '@/entities';

export default function PermissionsPage() {
    const data = [{
        id: '1',
        fullname: "Dr mundo",
        position: "Doctor",
        date: new Date(),
    }, {
        id: '2',
        fullname: "WSH National Hospital",
        position: "Organization",
        date: new Date(),
    }, {
        id: '3',
        fullname: "Dj Misha",
        position: "DJ",
        date: new Date(),
    }];

    const dataHistory = [{
        id: '1',
        fullname: "Dr mundo",
        position: "Doctor",
        date: new Date(),
        status: 'accepted',
    }, {
        id: '2',
        fullname: "WSH National Hospital",
        position: "Organization",
        date: new Date(),
        status: 'accepted',
    }, {
        id: '3',
        fullname: "Dj Misha",
        position: "DJ",
        date: new Date(),
        status: 'declined',
    }];

    return (
        <AuthLayout className={styles.container}>
            <Typography
                variant="h1"
            >
                Список запросов
            </Typography>
            <div className={styles.sectionsContainer}>
                <div className={styles.section}>
                    <Typography
                        weight="bold"
                        variant="h3"
                    >
                        Актуальные запросы
                    </Typography>
                    <PermissionsList data={data}/>
                </div>
                <div className={styles.section}>
                    <Typography
                        weight="bold"
                        variant="h3"
                    >
                        История запросов
                    </Typography>
                    <PermissionsList data={dataHistory}/>
                </div>
            </div>
        </AuthLayout>
    );
};
