import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';

interface DeleteButtonConfirmationProps {
  callback: () => void;
  title: string;
  loading?: boolean;
  content?: string;
}

export default function DeleteButtonConfirmation({ callback, title, content, loading }: DeleteButtonConfirmationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Tooltip title="Delete">
        <IconButton onClick={toggleModal}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={isOpen} onClose={toggleModal}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button autoFocus variant="contained" onClick={toggleModal}>
            Отменить
          </Button>
          <LoadingButton
            loading={loading}
            disabled={loading}
            color="error"
            variant="outlined"
            onClick={() => void callback()}
            autoFocus
          >
            ⚠️ Удалить
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
