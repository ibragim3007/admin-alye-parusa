import { useDeleteTour } from '@/entities/tour/tour.repository';
import { TourGetDto } from '@/shared/api/entities/tour/types/res.type';
import DeleteButtonConfirmation from '@/shared/ui/delete-dialog/DeleteButtonConfirmation';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogTitle, Grid2, Icon, IconButton } from '@mui/material';
import { useState } from 'react';

interface DeleteCellProps {
  tour: TourGetDto;
}

export default function DeleteCell({ tour }: DeleteCellProps) {
  const [open, setOpen] = useState(false);
  const toggleDialog = () => {
    setOpen(!open);
  };
  const { deleteTourFn, isPending } = useDeleteTour();

  async function handleDelete(id: number) {
    const res = await deleteTourFn(id);
    if (res) {
      toggleDialog();
    }
  }

  return (
    <Grid2 container justifyContent="center" alignItems="center" height="100%">
      <DeleteButtonConfirmation
        renderButon={
          <IconButton>
            <DeleteIcon color="error" />
          </IconButton>
        }
        title={`Вы уверены что хотите удалить тур ${tour.name}?`}
        callback={() => void handleDelete(tour.id)}
        loading={isPending}
      />
    </Grid2>
  );
}
