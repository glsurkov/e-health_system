import { IconQuestionMarkCircle } from '@/shared/assets';
import { Tooltip } from '@/shared/ui/overlays/tooltip';

interface Props {
    text: string;
}

export const InfoTooltip = ({ text }: Props) => {
    return (
        <Tooltip>
            <Tooltip.Trigger>
                <IconQuestionMarkCircle />
            </Tooltip.Trigger>
            <Tooltip.Content>{text}</Tooltip.Content>
        </Tooltip>
    );
};
