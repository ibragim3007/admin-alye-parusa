import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog, DialogContent, DialogTitle, Grid2, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import CreateCardForm from './ui/CreateCardForm';
import CloseIcon from '@mui/icons-material/Close';

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
        <DialogTitle>
          <Grid2 container justifyContent="space-between" alignItems="center" gap={5}>
            <Typography variant="h6">Добавление новой карты</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid2>
        </DialogTitle>
        <DialogContent style={{ paddingTop: 10 }}>
          <CreateCardForm handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </Grid2>
  );
}
