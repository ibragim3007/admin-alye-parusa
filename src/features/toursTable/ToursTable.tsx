import { ITourClientGet } from '@/entities/tour/types';
import { TourGetDto } from '@/shared/api/entities/tour/types/res.type';
import { getFromToDateString } from '@/shared/helpers/getFromToDateString';
import { priceFormat } from '@/shared/helpers/priceFormat';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Grid2, IconButton, MenuItem, Select, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
type TourStateType = 'created' | 'approved' | 'canceled' | 'deleted';

// type TourRow = {
//   id: number;
//   name: string;
//   fromDate: Date;
//   toDate: Date;
//   bonusDeposit: number;
//   bonusSpending: number;
//   state: TourStateType;
// };

// const tours: TourRow[] = [
//   {
//     id: 1,
//     name: 'Tour to Paris',
//     fromDate: new Date('2024-01-01'),
//     toDate: new Date('2024-01-10'),
//     bonusDeposit: 50,
//     bonusSpending: 20,
//     state: 'created',
//   },
//   {
//     id: 2,
//     name: 'Tour to London',
//     fromDate: new Date('2024-02-15'),
//     toDate: new Date('2024-02-20'),
//     bonusDeposit: 40,
//     bonusSpending: 15,
//     state: 'approved',
//   },
// ];

const handleStateChange = (id: number, newState: TourStateType) => {
  console.log(`State for tour ${id} changed to ${newState}`);
  // Update logic here
};

const handleEdit = (id: number) => {
  console.log(`Editing tour ${id}`);
  // Edit logic here
};

const handleDelete = (id: number) => {
  console.log(`Deleting tour ${id}`);
  // Delete logic here
};

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Имя тура', width: 200 },
  {
    field: 'fromDate',
    headerName: 'Отправление / Прибытие',
    width: 200,
    valueGetter: (val: string, row: TourGetDto) => {
      return getFromToDateString(row.fromDate, row.toDate);
    },
    // valueGetter: (params: GridValueGetterParams<TourRow, Date>) => params.value.toLocaleDateString(),
  },
  {
    field: 'finalPrice',
    width: 100,
    headerName: 'Стоймость',
    valueGetter: (value: number) => {
      return priceFormat(value);
    },
    renderCell: (params: GridRenderCellParams<TourGetDto>) => {
      console.log(params.row);
      return <Typography>{params.row.price}</Typography>;
    },
  },
  {
    field: 'bonusSpending',
    width: 100,
    headerName: 'Бонусы',
  },
  {
    field: 'state',
    headerName: 'Статус',
    width: 200,
    renderCell: (params) => (
      <Select
        size="small"
        value={params.row.state}
        onChange={(event) => handleStateChange(params.row.id, event.target.value as TourStateType)}
        fullWidth
      >
        <MenuItem value="created">Created</MenuItem>
        <MenuItem value="approved">Approved</MenuItem>
        <MenuItem value="canceled">Canceled</MenuItem>
        <MenuItem value="deleted">Deleted</MenuItem>
      </Select>
    ),
  },
  {
    field: 'edit',
    headerName: 'Изменить',
    width: 90,
    renderCell: (params) => (
      <Grid2 container justifyContent="center" alignItems="center" height="100%">
        <IconButton onClick={() => handleDelete(params.row.id)}>
          <EditIcon />
        </IconButton>
      </Grid2>
    ),
  },
  {
    field: 'delete',
    headerName: 'Удалить',
    width: 80,
    renderCell: (params: GridRenderCellParams<TourGetDto>) => (
      <Grid2 container justifyContent="center" alignItems="center" height="100%">
        <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      </Grid2>
    ),
  },
];

interface ToursTableProps {
  data: ITourClientGet;
}

export default function ToursTable({ data }: ToursTableProps) {
  return (
    <Grid2>
      <DataGrid
        rows={data.tours}
        columns={columns}
        hideFooter
        // initialState={{
        //   pagination: {
        //     paginationModel: {
        //       pageSize: 10,
        //     },
        //   },
        // }}
        // checkboxSelection
        autoHeight
        disableColumnResize={false}
        disableRowSelectionOnClick
        scrollbarSize={10}
      />
    </Grid2>
  );
}
