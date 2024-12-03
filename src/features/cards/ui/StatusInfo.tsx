import { ICard } from '@/entities/card/types';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckIcon from '@mui/icons-material/Check';
import RestoreIcon from '@mui/icons-material/Restore';
import { Chip } from '@mui/material';

type ChipColor = 'default' | 'success' | 'primary' | 'secondary' | 'error' | 'info' | 'warning';
interface StatusInfoProps {
  card: ICard;
}

export default function StatusInfo({ card }: StatusInfoProps) {
  const iconToDisplay =
    card.status === 'attached' ? <CheckIcon /> : card.status === 'frozen' ? <RestoreIcon /> : <AutorenewIcon />;

  const color: ChipColor = card.status === 'attached' ? 'success' : card.status === 'pending' ? 'warning' : 'info';
  return (
    <Chip
      variant="outlined"
      style={{ fontSize: 18, paddingTop: 0 }}
      label={card.status}
      color={color}
      icon={iconToDisplay}
    />
  );
}
