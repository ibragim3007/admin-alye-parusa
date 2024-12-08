import { Grid2, Grid2Props, Typography, TypographyProps } from '@mui/material';
import { PropsWithChildren } from 'react';

interface LabelContainer extends PropsWithChildren {
  label: string;
  containerProps?: Grid2Props;
  gridProps?: Grid2Props;
  labelProps?: TypographyProps;
}

export default function LabelContainer({ label, containerProps, children, gridProps, labelProps }: LabelContainer) {
  return (
    <Grid2 {...gridProps}>
      <Typography variant="body2" color="secondary" {...labelProps}>
        {label}
      </Typography>
      <Grid2 {...containerProps}>{children}</Grid2>
    </Grid2>
  );
}
