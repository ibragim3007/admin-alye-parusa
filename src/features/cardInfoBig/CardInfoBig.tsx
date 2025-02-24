import { formatCardNumber } from '@/entities/card/helpers/formatCardNumber';
import { ITourClientGet } from '@/entities/tour/types';
import LabelContainer from '@/shared/ui/LabelContainer';
import { Card, Chip, Grid2, Tooltip, Typography } from '@mui/material';

interface CardInfoBigProps {
  tour: ITourClientGet;
  BalanceComponent?: React.ReactNode;
  CreateTourComponent?: React.ReactNode;
}

export default function CardInfoBig({ tour, BalanceComponent, CreateTourComponent }: CardInfoBigProps) {
  return (
    <Grid2>
      <Card>
        <Grid2 container flexDirection="column" gap={3} sx={{ p: 2 }}>
          <Grid2 container gap={3}>
            <Grid2 container flexDirection="column" gap={3}>
              <LabelContainer label="ФИО">
                <Typography>{tour.card.shortName}</Typography>
              </LabelContainer>
              <LabelContainer label="Бонусов">{BalanceComponent}</LabelContainer>
            </Grid2>

            <Grid2 gap={2} container flexDirection="column" flex={1}>
              <Grid2 gap={3} container justifyContent="space-between">
                <LabelContainer
                  containerProps={{ container: true, gap: 1 }}
                  label={`Паспорт (${tour.client.passportType})`}
                >
                  <Typography>{tour.client.passportSeries}</Typography>
                  <Typography>{tour.client.passportNumber}</Typography>
                </LabelContainer>
                <LabelContainer
                  label="Номер карты"
                  containerProps={{ container: true, flexDirection: 'row', gap: 1, alignItems: 'center' }}
                >
                  <Typography>{formatCardNumber(tour.card.cardNumber)}</Typography>
                  <Tooltip title="Бонусные проценты">
                    <Chip
                      color="default"
                      style={{ fontSize: 16 }}
                      label={`${tour.card.bonusPercentage}%`}
                      variant="outlined"
                    />
                  </Tooltip>
                </LabelContainer>
              </Grid2>
              <LabelContainer label="Комментарий оператора о клиенте">
                <Typography>{tour.client.comment}</Typography>
              </LabelContainer>
            </Grid2>
          </Grid2>
          <Grid2 container justifyContent="flex-end">
            {CreateTourComponent}
          </Grid2>
        </Grid2>
      </Card>
    </Grid2>
  );
}
