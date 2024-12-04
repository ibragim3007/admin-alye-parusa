import { Inform } from '../service/log/log.service';

export async function handleMutation<T>(
  mutationFn: () => Promise<T>,
  successMessage: string,
  errorMessage?: string
): Promise<void> {
  try {
    const res = await mutationFn();
    if (res) Inform.success(successMessage);
  } catch (e) {
    Inform.error(e || errorMessage);
  }
}
