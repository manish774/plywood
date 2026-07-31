export function LoadingBlock({ label = "Loading..." }) {
  return (
    <div className="state-block">
      <div className="spinner" role="status" aria-label={label} />
      <p>{label}</p>
    </div>
  );
}

export function ErrorBlock({ title = "Something went wrong", message, onRetry }) {
  return (
    <div className="state-block">
      <h3>{title}</h3>
      <p>{message}</p>
      {onRetry && (
        <button className="btn btn-outline btn-sm" style={{ marginTop: 20 }} onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

export function EmptyBlock({ title = "Nothing here yet", message }) {
  return (
    <div className="state-block">
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}
