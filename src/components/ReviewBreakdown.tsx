import { REVIEW_TYPES, type ReviewBreakdown as Counts, reviewPercentages } from "@/lib/domain";

export function ReviewBreakdown({ counts }: { counts: Counts }) {
  const total = REVIEW_TYPES.reduce((sum, type) => sum + counts[type], 0);
  const percentages = reviewPercentages(counts);

  return (
    <section className="review-breakdown" aria-label="Review breakdown">
      <h2>
        Reviews <span className="muted">({total})</span>
      </h2>
      <dl>
        {REVIEW_TYPES.map((type) => (
          <div key={type} className={`review-breakdown__row review-breakdown__row--${type}`}>
            <dt>
              {type} <span className="muted">({percentages[type]}%)</span>
            </dt>
            <dd>
              <meter min={0} max={100} value={percentages[type]} aria-label={`${type} reviews`}>
                {percentages[type]}%
              </meter>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
