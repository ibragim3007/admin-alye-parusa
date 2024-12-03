import { CircularProgress, CircularProgressProps } from '@mui/material';

interface LoaderGeneralProps extends CircularProgressProps {}

export default function LoaderGeneral({ ...props }: LoaderGeneralProps) {
  return <CircularProgress size={props.size} />;
}
