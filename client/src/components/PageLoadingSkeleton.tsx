type PageLoadingSkeletonProps = {
  fullScreen?: boolean;
};

export default function PageLoadingSkeleton({ fullScreen = false }: PageLoadingSkeletonProps) {
  return (
    <div
      className={`page-loader${fullScreen ? ' page-loader--fullscreen' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="جارٍ تحميل الموقع"
    >
      <div className="page-loader__inner">
        <div className="page-loader__topline">
          <span className="page-loader__brand" aria-hidden="true" />
          <span className="page-loader__nav" aria-hidden="true" />
          <span className="page-loader__button" aria-hidden="true" />
        </div>
        <div className="page-loader__hero">
          <div className="page-loader__copy">
            <span className="page-loader__eyebrow" aria-hidden="true" />
            <span className="page-loader__title" aria-hidden="true" />
            <span className="page-loader__title page-loader__title--short" aria-hidden="true" />
            <span className="page-loader__paragraph" aria-hidden="true" />
            <div className="page-loader__actions" aria-hidden="true">
              <span />
              <span />
            </div>
          </div>
          <div className="page-loader__visual" aria-hidden="true">
            <span className="page-loader__visual-glow" />
            <span className="page-loader__visual-card" />
          </div>
        </div>
        <p className="page-loader__label">نجهّز التجربة الرقمية...</p>
      </div>
    </div>
  );
}
