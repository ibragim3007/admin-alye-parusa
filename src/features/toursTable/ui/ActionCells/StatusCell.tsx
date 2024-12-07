import { useChangeStateTour } from '@/entities/tour/tour.repository';
import { TourStateType } from '@/shared/api/entities/dictionary/types';
import LoaderGeneral from '@/shared/ui/LoaderGeneral';
import { MenuItem, Select } from '@mui/material';

interface StatusCellProps {
  state: TourStateType;
  id: number;
  // handleStateChange: (id: number, value: TourStateType) => void;
}

export default function StatusCell({ id, state }: StatusCellProps) {
  const { changeTourStateFn, isPending } = useChangeStateTour();

  const handleChangeState = async (id: number, value: TourStateType) => {
    await changeTourStateFn({
      id,
      tourState: {
        tourState: value,
      },
    });
  };

  if (isPending) {
    return <LoaderGeneral />;
  }

  return (
    <Select
      size="small"
      value={state}
      onChange={(event) => void handleChangeState(id, event.target.value as TourStateType)}
      fullWidth
    >
      <MenuItem value="created">Created</MenuItem>
      <MenuItem value="approved">Approved</MenuItem>
      <MenuItem value="canceled">Canceled</MenuItem>
      <MenuItem value="deleted">Deleted</MenuItem>
    </Select>
  );
}
