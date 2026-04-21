/** First instant the April admissions post is public (midnight Pacific, April 25, 2026). */
export const APRIL_ADMISSIONS_PUBLISH_AT = new Date('2026-04-25T07:00:00.000Z');

/**
 * Whether the admissions essay should be readable (same moment it appears in Archives).
 * Set `NEXT_PUBLIC_UNLOCK_APRIL_ADMISSIONS=1` locally to preview before the date.
 */
export function isAprilAdmissionsPostPublished(now: Date = new Date()): boolean {
  if (process.env.NEXT_PUBLIC_UNLOCK_APRIL_ADMISSIONS === '1') return true;
  return now.getTime() >= APRIL_ADMISSIONS_PUBLISH_AT.getTime();
}
