import { Inform } from '../service/log/log.service';

export async function handleMutation<T>(
  mutationFn: () => Promise<T>,
  successMessage: string,
  error?: { errorMessage?: string; disableError?: boolean }
): Promise<T | undefined> {
  try {
    const res = await mutationFn();
    if (res) Inform.success(successMessage);
    return res;
  } catch (e) {
    if (error?.disableError) {
      return;
    }

    Inform.error(e || error?.errorMessage);
  }
}
