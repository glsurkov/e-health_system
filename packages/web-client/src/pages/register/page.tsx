import styles from "./styles.module.scss";
import {IconLogo} from "@/shared/assets";
import {RegisterForm} from "./ui/register-form";

export default function RegisterPage() {

    return (
        <div className={styles.container}>
            <IconLogo className={styles.logo}/>
            <RegisterForm />
        </div>
    );
};
