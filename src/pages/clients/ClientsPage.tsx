import { useGetClients } from '@/entities/client/client.repository';
import LoaderGeneral from '@/shared/ui/LoaderGeneral';
import { Grid2, Typography } from '@mui/material';

export default function ClientsPage() {
  const { data, isLoading } = useGetClients();

  return (
    <Grid2>
      <Typography variant="h5">Клиенты</Typography>
      {isLoading && <LoaderGeneral />}
      <Grid2>
        {data?.map((client) => (
          <Grid2 key={client.id}>
            <Typography>{client.name}</Typography>
          </Grid2>
        ))}
      </Grid2>
    </Grid2>
  );
}
