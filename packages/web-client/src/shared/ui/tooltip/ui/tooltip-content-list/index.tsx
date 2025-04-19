import styles from './styles.module.scss';

interface Props {
    list: [string, string][];
}

export const TooltipContentList = ({ list }: Props) => {
    return (
        <div className={styles.tooltip}>
            {list.map(([key, value]) => (
                <div className={styles.tooltipRow} key={key}>
                    <p className={styles.tooltipKey}>{key}</p>
                    <p>{value}</p>
                </div>
            ))}
        </div>
    );
};
