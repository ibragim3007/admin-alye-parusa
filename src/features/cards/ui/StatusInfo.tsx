import { UpdateCardStatusParams } from '@/entities/card/card.respository';
import { ICard } from '@/entities/card/types';
import { CardStatusesType } from '@/shared/api/entities/dictionary/types';
import LoaderGeneral from '@/shared/ui/LoaderGeneral';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

type ChipColor = 'default' | 'success' | 'primary' | 'secondary' | 'error' | 'info' | 'warning';
interface StatusInfoProps {
  card: ICard;
  isLoading: boolean;
  onChangeStatus: (type: UpdateCardStatusParams) => Promise<void>;
}

const статусы: CardStatusesType[] = ['attached', 'frozen', 'pending'];

export default function StatusInfo({ card, isLoading, onChangeStatus }: StatusInfoProps) {
  // const iconToDisplay =
  //   card.status === 'attached' ? <CheckIcon /> : card.status === 'frozen' ? <RestoreIcon /> : <AutorenewIcon />;

  // const color: ChipColor = card.status === 'attached' ? 'success' : card.status === 'pending' ? 'warning' : 'info';

  const onChangeStatusHandler = async (event: SelectChangeEvent) => {
    await onChangeStatus({
      cardId: card.id,
      cardChangeStatus: { cardStatus: event.target.value as unknown as CardStatusesType },
    });
  };

  if (isLoading) {
    return <LoaderGeneral />;
  }

  return (
    <Select value={card.status} onChange={(event) => void onChangeStatusHandler(event)}>
      {статусы.map((статус) => (
        <MenuItem key={статус} value={статус}>
          {статус}
        </MenuItem>
      ))}
    </Select>
    // <Chip
    //   variant="outlined"
    //   style={{ fontSize: 18, paddingTop: 0 }}
    //   label={card.status}
    //   color={color}
    //   icon={iconToDisplay}
    // />
  );
}
