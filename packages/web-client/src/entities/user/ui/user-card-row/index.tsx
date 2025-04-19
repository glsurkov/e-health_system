import styles from "./styles.module.scss";
import {TextInput, Typography} from "@/shared/ui";
import clsx from "clsx";

interface UserCardRowProps {
    title: string;
    value: string | number;
    className?: string;
    disabled?: boolean;
}

export const UserCardRow = (props: UserCardRowProps) => {
    const {title, value, className, disabled} = props;

    return (
        <div className={clsx(styles.container, className)}>
            <Typography
                variant="medium"
            >
                {title}
            </Typography>
            <TextInput
                value={value}
                disabled={disabled}
            />
        </div>
    );
};
