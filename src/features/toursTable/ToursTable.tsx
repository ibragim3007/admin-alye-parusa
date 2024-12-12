import { ITourClientGet } from '@/entities/tour/types';
import { TourGetDto } from '@/shared/api/entities/tour/types/res.type';
import { Grid2 } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { useGetTourByClientId } from '@/entities/tour/tour.repository';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowClassNameParams } from '@mui/x-data-grid';
import { ruRU } from '@mui/x-data-grid/locales';
import { AllowedToSpendProps } from '../allowedToSpend/AllowedToSpend';
import { BonusExpectationProps } from '../bonusExpectation/BonusExpectation';
import { TourFieldsProps } from '../tourForm/TourFields/TourFields';
import DeleteCell from './ui/ActionCells/DeleteCell';
import StatusCell from './ui/ActionCells/StatusCell';
import UpdateCell from './ui/ActionCells/UpdateCell';
import BonusSell from './ui/Cells/BonusSell';
import DestinationCell from './ui/Cells/DestinationCell';
import PriceSell from './ui/Cells/PriceSell';

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
  const { isLoading, isFetching } = useGetTourByClientId(data.client.id);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Имя тура', flex: 1, minWidth: 150 },
    {
      field: 'fromDate',
      headerName: 'Отправление / Прибытие',
      flex: 1,
      minWidth: 230,
      renderCell: ({ row }: GridRenderCellParams<TourGetDto>) => <DestinationCell tour={row} />,
    },
    {
      field: 'finalPrice',
      flex: 1,
      minWidth: 150,
      headerName: 'Стоймость',
      renderCell: ({ row }: GridRenderCellParams<TourGetDto>) => <PriceSell tour={row} />,
    },
    {
      field: 'bonusSpending',
      flex: 1,
      minWidth: 140,
      headerName: 'Бонусы',
      renderCell: ({ row }: GridRenderCellParams<TourGetDto>) => <BonusSell tour={row} />,
    },
    {
      field: 'state',
      headerName: 'Статус',
      flex: 1,
      minWidth: 155,
      renderCell: ({ row }: GridRenderCellParams<TourGetDto>) => <StatusCell tour={row} />,
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
        loading={isLoading || isFetching}
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
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        getRowClassName={(params: GridRowClassNameParams<TourGetDto>) =>
          params.row.state === 'deleted' ? classes.transparentRow : ''
        }
      />
    </Grid2>
  );
}
