import styles from "./styles.module.scss";
import {GenericPlaceholder, Typography} from "@/shared/ui";
import {UserCardActivityListItem} from "@/entities";
import {IActivityAction} from "../../ui/user-card-activity-list-item";

interface UserCardActivityProps {
    data?: IActivityAction[];
}

export const UserCardActivityList = (props: UserCardActivityProps) => {
    const {data} = props;

    return (
        <div className={styles.container}>
            <Typography
                weight="bold"
                variant="h3"
            >
                Активность
            </Typography>
            {
                data
                    ? (
                        <div className={styles.listContainer}>
                            {
                                data.map((item) => {
                                    return (
                                        <UserCardActivityListItem
                                            key={item.id}
                                            data={item}
                                        />
                                    )
                                })
                            }
                        </div>
                    )
                    : <GenericPlaceholder/>
            }
        </div>
    );
};
