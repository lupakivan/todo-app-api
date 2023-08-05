export const getOrThrow = <T>(val: T, error: Error): T => {
  if (!val) {
    throw error;
  }

  return val;
};
