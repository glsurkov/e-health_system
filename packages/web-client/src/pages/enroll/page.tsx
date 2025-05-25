import styles from "./styles.module.scss";
import { IconLogo } from "@/shared/assets";
import { EnrollForm } from './ui/enroll-form';
import { useEffect } from 'react';
import { useAppSelector } from '@/shared/lib';
import { useNavigate } from 'react-router-dom';

export default function EnrollPage() {
    const certificate = useAppSelector((state) => state.auth.certificate);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('cert', certificate);
        if (certificate) {
            navigate('/card/me');
        }
    }, [certificate]);

    return (
        <div className={styles.container}>
            <IconLogo className={styles.logo}/>
            <EnrollForm />
        </div>
    );
};
