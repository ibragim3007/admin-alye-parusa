import { Skeleton, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

interface WrapTextSkeleton extends PropsWithChildren {
  loading: boolean;
}
export function WrapTextSkeleton({ loading, children }: WrapTextSkeleton) {
  if (loading) return <Skeleton width={40} />;
  return <Typography>{children}</Typography>;
}
