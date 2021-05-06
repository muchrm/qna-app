export async function to<T>(promise: Promise<T>): Promise<[Error | null, T?]> {
  try {
    const data = await promise;
    return [null, data];
  } catch (err) {
    return [err];
  }
}
