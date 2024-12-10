import { Grid2 } from '@mui/material';
import LoaderGeneral from '../LoaderGeneral';

export default function LoaderFullScreen() {
  return (
    <Grid2 container justifyContent="center" alignItems="center" height="100vh">
      <LoaderGeneral />
    </Grid2>
  );
}
