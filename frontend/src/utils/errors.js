// The backend always responds with { error: "<message>" } on failure.
// Mock mode throws plain Error objects with a .message instead.
export function getErrorMessage(err, fallback = "Something went wrong. Please try again.") {
  return (
    err?.response?.data?.error ||
    err?.response?.data?.message ||
    err?.message ||
    fallback
  );
}
