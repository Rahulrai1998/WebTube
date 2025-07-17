//time formatter object
const LEADING_ZERO_FORMATTER = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});

export function formatDuration(duration: number) {
  const hour = Math.floor(duration / (60 * 60));
  const minutes = Math.floor((duration - hour * 60 * 60) / 60);
  const seconds = duration % 60;

  if (hour > 0)
    return `${hour}:${LEADING_ZERO_FORMATTER.format(
      minutes
    )}:${LEADING_ZERO_FORMATTER.format(seconds)}`;
  else return `${minutes}:${seconds}`;
}
