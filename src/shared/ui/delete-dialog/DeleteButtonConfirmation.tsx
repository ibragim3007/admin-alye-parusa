import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip } from '@mui/material';
import React from 'react';

interface DeleteButtonConfirmationProps {
  callback: () => void;
  title: string;
  loading?: boolean;
  content?: string;
  renderButon?: React.ReactNode;
  open: boolean;
  handleClose: () => void;
}

export default function DeleteButtonConfirmation({
  callback,
  renderButon,
  title,
  content,
  loading,
  handleClose,
  open,
}: DeleteButtonConfirmationProps) {
  return (
    <>
      <Tooltip title="Delete">
        {renderButon ? (
          <div onClick={handleClose}>{renderButon}</div>
        ) : (
          <IconButton onClick={handleClose}>
            <DeleteIcon />
          </IconButton>
        )}
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button autoFocus variant="contained" onClick={handleClose}>
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
