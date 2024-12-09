import { useGetTourStates } from '@/entities/dictionary/dictionary.repository';
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
  const { data, isLoading } = useGetTourStates();

  const handleChangeState = async (id: number, value: TourStateType) => {
    await changeTourStateFn({
      id,
      tourState: {
        tourState: value,
      },
    });
  };

  // if (isPending)
  //   return (
  //     <Grid2 container alignItems="center" justifyContent="center" height="100%">
  //       <LoaderGeneral />
  //     </Grid2>
  //   );

  return (
    <Select
      disabled={isPending || isLoading}
      size="small"
      value={state}
      onChange={(event) => void handleChangeState(id, event.target.value as TourStateType)}
      fullWidth
      displayEmpty
      renderValue={(selected) => {
        if (isLoading || isPending) {
          return <LoaderGeneral size={24} />;
        }
        return selected || 'Select state';
      }}
    >
      {data?.map((state) => (
        <MenuItem key={state} value={state}>
          {state}
        </MenuItem>
      ))}
    </Select>
  );
}
