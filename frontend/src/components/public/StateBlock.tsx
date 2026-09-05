import { useLanguage } from "../../i18n/useLanguage";

interface LoadingBlockProps {
  label?: string;
}

export function LoadingBlock({ label }: LoadingBlockProps) {
  const { t } = useLanguage();
  const displayLabel = label || t("common.loading");

  return (
    <div className="state-block">
      <div className="spinner" role="status" aria-label={displayLabel} />
      <p>{displayLabel}</p>
    </div>
  );
}

interface ErrorBlockProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorBlock({ title, message, onRetry }: ErrorBlockProps) {
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

interface EmptyBlockProps {
  title?: string;
  message?: string;
}

export function EmptyBlock({ title, message }: EmptyBlockProps) {
  const { t } = useLanguage();

  return (
    <div className="state-block">
      <h3>{title || t("common.nothingHere")}</h3>
      <p>{message}</p>
    </div>
  );
}
