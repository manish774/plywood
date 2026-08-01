import { useLanguage } from "../../i18n/useLanguage";

export function LoadingBlock({ label }) {
  const { t } = useLanguage();
  const displayLabel = label || t("common.loading");

  return (
    <div className="state-block">
      <div className="spinner" role="status" aria-label={displayLabel} />
      <p>{displayLabel}</p>
    </div>
  );
}

export function ErrorBlock({ title, message, onRetry }) {
  const { t } = useLanguage();

  return (
    <div className="state-block">
      <h3>{title || t("common.somethingWentWrong")}</h3>
      <p>{message}</p>
      {onRetry && (
        <button className="btn btn-outline btn-sm" style={{ marginTop: 20 }} onClick={onRetry}>
          {t("common.tryAgain")}
        </button>
      )}
    </div>
  );
}

export function EmptyBlock({ title, message }) {
  const { t } = useLanguage();

  return (
    <div className="state-block">
      <h3>{title || t("common.nothingHere")}</h3>
      <p>{message}</p>
    </div>
  );
}
