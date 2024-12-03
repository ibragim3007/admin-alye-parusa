import { Popover, Typography } from '@mui/material';
import React, { PropsWithChildren } from 'react';

interface PopoverCustomProps extends PropsWithChildren {
  label: string;
}

export function PopoverCustom({ label, children }: PopoverCustomProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <div
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        style={{ display: 'inline-block', cursor: 'pointer' }}
      >
        {children}
      </div>

      <Popover
        id="mouse-over-popover"
        sx={{ pointerEvents: 'none' }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        disableScrollLock={true}
      >
        <Typography sx={{ p: 1 }}>{label}</Typography>
      </Popover>
    </>
  );
}
