export function relativeTimeDifference(
  previous: number,
  current: number = Date.now()
): string {
  const elapsed: number = current - previous;

  const minute: number = 60 * 1000;
  const hour: number = minute * 60;
  const day: number = hour * 24;
  const month: number = day * 30;
  const year: number = day * 365;

  const formatDate = (type: string, amount: number) =>
    `${amount} ${type}${amount > 1 ? "s" : ""} ago`;

  if (elapsed < minute) return formatDate("second", Math.round(elapsed / 1000));
  if (elapsed < hour) return formatDate("minute", Math.round(elapsed / minute));
  if (elapsed < day) return formatDate("hour", Math.round(elapsed / hour));
  if (elapsed < month) return formatDate("day", Math.round(elapsed / day));
  if (elapsed < year) return formatDate("month", Math.round(elapsed / month));
  return formatDate("year", Math.round(elapsed / year));
}
