import { useDeleteTour } from '@/entities/tour/tour.repository';
import { TourGetDto } from '@/shared/api/entities/tour/types/res.type';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogTitle, Grid2, IconButton } from '@mui/material';
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
      <IconButton color="error" onClick={toggleDialog}>
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={toggleDialog}>
        <DialogTitle>Вы уверены что хотите удалить тур {tour.name}?</DialogTitle>
        <DialogActions>
          <Button onClick={toggleDialog}>Отмена</Button>
          <LoadingButton
            loading={isPending}
            variant="outlined"
            color="error"
            onClick={() => void handleDelete(tour.id)}
          >
            Удалить
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Grid2>
  );
}
