import { config } from '@/app/router/routerConfig';
import { authService } from '@/shared/api/api';
import { getMe } from '@/shared/api/entities/me/me.api';
import { generateToken } from '@/shared/service/auth.service';
import { Inform } from '@/shared/service/log/log.service';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Grid2 as Grid, Grid2, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginInterface } from './type';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInterface>({
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginInterface) => {
    setLoading(true);

    const dataUpdated = {
      login: data.login.trim(),
      password: data.password.trim().replace(/[^a-zA-Z0-9]/g, ''),
    };

    const token = generateToken(`${dataUpdated.login}:${dataUpdated.password}`);

    if (token) {
      authService.removeToken();
      authService.setToken(token);
      try {
        const res = await getMe();
        if (res) window.location.href = config.cards;
      } catch (e) {
        authService.removeToken();
        Inform.error('Данные введены неверно');
      }
    } else {
      Inform.error('Ошибка авторизации связана с генерацией токена');
    }
    setLoading(false);
  };

  return (
    <Grid
      container
      alignContent="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{ bgcolor: 'background.default' }}
    >
      <Grid2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void handleSubmit(onSubmit)();
          }}
        >
          <Grid container gap={3} padding={3} maxWidth={500} width="100%" justifyContent="center">
            <Typography variant="h5">Алые паруса</Typography>
            <TextField
              error={errors.login && true}
              {...register('login', { required: 'true' })}
              label="Логин"
              fullWidth
              size="small"
            />
            <TextField
              error={errors.password && true}
              {...register('password', { required: 'Это поле необходимо' })}
              label="Пароль"
              type="password"
              fullWidth
              size="small"
            />
            {errors.password && <Alert color="error">{errors.password.message}</Alert>}
            <Grid container width="100%" justifyContent="flex-end">
              <LoadingButton loading={loading} type="submit" variant="contained">
                Войти
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Grid2>
    </Grid>
  );
}
