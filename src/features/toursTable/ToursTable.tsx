import { ITourClientGet } from '@/entities/tour/types';
import { TourGetDto } from '@/shared/api/entities/tour/types/res.type';
import { getFromToDateString } from '@/shared/helpers/getFromToDateString';
import { Grid2 } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { DataGrid, GridColDef, GridRenderCellParams, GridRowClassNameParams } from '@mui/x-data-grid';
import DeleteCell from './ui/ActionCells/DeleteCell';
import StatusCell from './ui/ActionCells/StatusCell';
import UpdateCell from './ui/ActionCells/UpdateCell';
import BonusSell from './ui/Cells/BonusSell';
import PriceSell from './ui/Cells/PriceSell';
import { TourFieldsProps } from '../tourForm/TourFields/TourFields';
import { AllowedToSpendProps } from '../allowedToSpend/AllowedToSpend';
import { BonusExpectationProps } from '../bonusExpectation/BonusExpectation';
import { useGetTourByClientId } from '@/entities/tour/tour.repository';

const useStyles = makeStyles({
  transparentRow: {
    opacity: 0.2,
  },
  scrollable: {
    overflowX: 'auto',
  },
});

interface ToursTableProps {
  data: ITourClientGet;
  TourFields: React.ElementType<TourFieldsProps>;
  BonusExpectationComponent: React.ElementType<BonusExpectationProps>;
  AllowedToSpend: React.ElementType<AllowedToSpendProps>;
}

export default function ToursTable({ data, TourFields, BonusExpectationComponent, AllowedToSpend }: ToursTableProps) {
  const classes = useStyles();
  const { isLoading } = useGetTourByClientId(data.client.id);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Имя тура', flex: 1, minWidth: 150 },
    {
      field: 'fromDate',
      headerName: 'Отправление / Прибытие',
      flex: 1,
      minWidth: 230,
      valueGetter: (val: string, row: TourGetDto) => {
        return getFromToDateString(row.fromDate, row.toDate);
      },
    },
    {
      field: 'finalPrice',
      flex: 1,
      minWidth: 150,
      headerName: 'Стоймость',
      renderCell: ({ row }: GridRenderCellParams<TourGetDto>) => (
        <PriceSell price={row.price} finalPrice={row.finalPrice} />
      ),
    },
    {
      field: 'bonusSpending',
      flex: 1,
      minWidth: 140,
      headerName: 'Бонусы',
      renderCell: ({ row }: GridRenderCellParams<TourGetDto>) => (
        <BonusSell bonusDeposit={row.bonusDeposit} bonusSpending={row.bonusSpending} />
      ),
    },
    {
      field: 'state',
      headerName: 'Статус',
      flex: 0.7,
      minWidth: 145,
      renderCell: ({ row }: GridRenderCellParams<TourGetDto>) => <StatusCell id={row.id} state={row.state} />,
    },
    {
      field: 'edit',
      headerName: 'Изменить',
      flex: 0.4,
      minWidth: 100,
      sortable: false,
      filterable: false,
      renderCell: ({ row }: GridRenderCellParams<TourGetDto>) => (
        <UpdateCell
          tour={row}
          TourFields={TourFields}
          BonusExpectationComponent={BonusExpectationComponent}
          AllowedToSpend={AllowedToSpend}
        />
      ),
    },
    {
      field: 'delete',
      headerName: 'Удалить',
      flex: 0.4,
      minWidth: 100,
      filterable: false,
      sortable: false,
      renderCell: ({ row }: GridRenderCellParams<TourGetDto>) => <DeleteCell tour={row} />,
    },
  ];

  return (
    <Grid2 width="100%" className={classes.scrollable}>
      <DataGrid
        rows={data.tours}
        columns={columns}
        loading={isLoading}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 100,
            },
          },
        }}
        autoHeight
        disableColumnResize={false}
        disableRowSelectionOnClick
        scrollbarSize={10}
        getRowClassName={(params: GridRowClassNameParams<TourGetDto>) =>
          params.row.state === 'deleted' ? classes.transparentRow : ''
        }
      />
    </Grid2>
  );
}
