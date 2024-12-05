import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputBase, InputBaseProps, Paper } from '@mui/material';

// interface SearchFieldProps extends TextFieldProps {}

export default function SearchField({ ...props }: InputBaseProps) {
  // return <TextField {...props} label="Поиск" style={{ alignSelf: 'center', minWidth: 350, borderRadius: 50 }} />;

  return (
    <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignSelf: 'center', width: 400 }}>
      <InputBase
        {...props}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Поиск"
        style={{ alignSelf: 'center', minWidth: 350, borderRadius: 50 }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
