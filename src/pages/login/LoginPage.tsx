import { config } from '@/app/router/routerConfig';
import { authService } from '@/shared/api/api';
import { Alert, Button, Card, Grid2 as Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { LoginInterface } from './type';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInterface>({
    defaultValues: {
      token: '',
    },
  });

  const onSubmit = (data: LoginInterface) => {
    if (data.token) authService.setToken(data.token);
    window.location.href = config.cards;
  };

  return (
    <Grid container alignContent="center" justifyContent="center" height="100vh">
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container gap={3} padding={3} maxWidth={500} width="100%">
            <Typography variant="h5">Алые паруса</Typography>
            {/* <TextField
              error={errors.login && true}
              {...register('login', { required: 'true' })}
              label="Логин"
              fullWidth
            /> */}
            <TextField
              error={errors.token && true}
              {...register('token', { required: 'Это поле необходимо' })}
              label="Токен"
              fullWidth
            />
            {errors.token && <Alert color="error">{errors.token.message}</Alert>}
            <Grid container width="100%" justifyContent="flex-end">
              <Button type="submit" variant="contained">
                Войти
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Grid>
  );
}
