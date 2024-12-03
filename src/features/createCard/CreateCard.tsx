import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog, DialogContent, DialogTitle, Grid2 } from '@mui/material';
import { useState } from 'react';
import CreateCardForm from './ui/CreateCardForm';

export default function CreateCard() {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid2>
      <Button onClick={handleClickOpen} variant="contained" startIcon={<AddIcon />}>
        Добавить карту
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Добавление новой карты</DialogTitle>
        <DialogContent style={{ paddingTop: 10 }}>
          <CreateCardForm />
        </DialogContent>
      </Dialog>
    </Grid2>
  );
}
