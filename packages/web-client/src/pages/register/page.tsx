import styles from "./styles.module.scss";
import {IconLogo} from "@/shared/assets";
import {RegisterForm} from "./ui/register-form";
import { AuthLayout } from '@/layouts';

export default function RegisterPage() {

    return (
        <AuthLayout>
            <div className={styles.container}>
                <IconLogo className={styles.logo}/>
                <RegisterForm />
            </div>
        </AuthLayout>);
};
