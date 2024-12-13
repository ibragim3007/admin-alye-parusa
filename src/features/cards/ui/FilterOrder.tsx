import { SortOrderType } from '@/shared/api/entities/dictionary/types';
import { sortOrderTypeCoverted } from '@/shared/enums/cardStatusesConverted';
import { SortOrderTypesArray } from '@/shared/enums/constants';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface FilterOrderProps {
  value: SortOrderType;
  onChange: (updatedSortType: SortOrderType) => void;
}

export default function FilterOrder({ value, onChange }: FilterOrderProps) {
  const onChangeOrderTypeHandler = (event: SelectChangeEvent) => {
    onChange(event.target.value as unknown as SortOrderType);
  };

  return (
    <FormControl>
      <InputLabel size="small" variant="outlined" htmlFor="uncontrolled-native">
        Сортировка
      </InputLabel>
      <Select
        variant="outlined"
        label={'Сортировка'}
        style={{ minWidth: 140 }}
        size="small"
        value={value}
        onChange={(e) => onChangeOrderTypeHandler(e)}
      >
        {SortOrderTypesArray.map((orderType) => (
          <MenuItem key={orderType} value={orderType}>
            {sortOrderTypeCoverted[orderType] || orderType}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
