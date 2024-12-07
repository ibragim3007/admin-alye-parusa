import { Grid2, Grid2Props, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

interface LabelContainer extends PropsWithChildren {
  label: string;
  containerProps?: Grid2Props;
}

export default function LabelContainer({ label, containerProps, children }: LabelContainer) {
  return (
    <Grid2>
      <Typography variant="body2" color="secondary">
        {label}
      </Typography>
      <Grid2 {...containerProps}>{children}</Grid2>
    </Grid2>
  );
}
