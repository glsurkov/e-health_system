import {IPermission, PermissionsListItem} from "../permissions-list-item";
import {GenericPlaceholder} from "@/shared/ui";
import styles from './styles.module.scss';

interface PermissionsListProps {
    data?: IPermission[]
}

export const PermissionsList = (props: PermissionsListProps) => {
    const {data} = props;


    if(!data) return <GenericPlaceholder/>

    return (
        <div className={styles.container}>
            {data.map((item) => {
                return (
                    <PermissionsListItem
                        key={item.id}
                        data={item}
                    />
                )
            })}
        </div>
    );
};
