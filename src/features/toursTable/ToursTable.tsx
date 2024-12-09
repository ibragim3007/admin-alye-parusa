import { ITourClientGet } from '@/entities/tour/types';
import { TourStateType } from '@/shared/api/entities/dictionary/types';
import { TourGetDto } from '@/shared/api/entities/tour/types/res.type';
import { getFromToDateString } from '@/shared/helpers/getFromToDateString';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Grid2, IconButton } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import BonusSell from './ui/Cells/BonusSell';
import PriceSell from './ui/Cells/PriceSell';
import StatusCell from './ui/ActionCells/StatusCell';

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
  },
  {
    field: 'finalPrice',
    width: 100,
    headerName: 'Стоймость',
    renderCell: ({ row }: GridRenderCellParams<TourGetDto>) => (
      <PriceSell price={row.price} finalPrice={row.finalPrice} />
    ),
  },
  {
    field: 'bonusSpending',
    width: 100,
    headerName: 'Бонусы',
    renderCell: ({ row }: GridRenderCellParams<TourGetDto>) => (
      <BonusSell bonusDeposit={row.bonusDeposit} bonusSpending={row.bonusSpending} />
    ),
  },
  {
    field: 'state',
    headerName: 'Статус',
    width: 200,
    renderCell: ({ row }: GridRenderCellParams<TourGetDto>) => <StatusCell id={row.id} state={row.state} />,
  },
  {
    field: 'edit',
    headerName: 'Изменить',
    width: 90,
    renderCell: ({ row }: GridRenderCellParams<TourGetDto>) => (
      <Grid2 container justifyContent="center" alignItems="center" height="100%">
        <IconButton onClick={() => handleEdit(row.id)}>
          <EditIcon />
        </IconButton>
      </Grid2>
    ),
  },
  {
    field: 'delete',
    headerName: 'Удалить',
    width: 80,
    renderCell: ({ row }: GridRenderCellParams<TourGetDto>) => (
      <Grid2 container justifyContent="center" alignItems="center" height="100%">
        <IconButton color="error" onClick={() => handleDelete(row.id)}>
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
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        // checkboxSelection
        autoHeight
        disableColumnResize={false}
        disableRowSelectionOnClick
        scrollbarSize={10}
      />
    </Grid2>
  );
}
