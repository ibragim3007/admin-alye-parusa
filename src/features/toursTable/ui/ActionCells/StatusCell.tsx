import { useGetTourStates } from '@/entities/dictionary/dictionary.repository';
import { useChangeStateTour } from '@/entities/tour/tour.repository';
import { TourStateType } from '@/shared/api/entities/dictionary/types';
import { TourGetDto } from '@/shared/api/entities/tour/types/res.type';
import { tourStateStatusesConverted } from '@/shared/enums/cardStatusesConverted';
import LoaderGeneral from '@/shared/ui/LoaderGeneral';
import { MenuItem, Select } from '@mui/material';

interface StatusCellProps {
  tour: TourGetDto;
}

export default function StatusCell({ tour }: StatusCellProps) {
  const { changeTourStateFn, isPending } = useChangeStateTour(tour.userId, tour.cardId);
  const { data, isLoading } = useGetTourStates();

  const handleChangeState = async (tourId: number, value: TourStateType) => {
    await changeTourStateFn({
      id: tourId,
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
      value={tourStateStatusesConverted[tour.state] || tour.state}
      onChange={(event) => void handleChangeState(tour.id, event.target.value as TourStateType)}
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
          {tourStateStatusesConverted[state] || state}
        </MenuItem>
      ))}
    </Select>
  );
}
