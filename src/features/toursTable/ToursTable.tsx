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

const useStyles = makeStyles({
  transparentRow: {
    opacity: 0.2,
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
      width: 80,
      renderCell: ({ row }: GridRenderCellParams<TourGetDto>) => <DeleteCell tour={row} />,
    },
  ];

  return (
    <Grid2>
      <DataGrid
        rows={data.tours}
        columns={columns}
        // hideFooter
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 100,
            },
          },
        }}
        // checkboxSelection
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
