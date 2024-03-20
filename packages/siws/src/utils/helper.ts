export function dateUTC(date?: string | number | Date) {
  let now = new Date();
  if (date) now = new Date(date);

  return new Date(
    Date.UTC(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds()
    )
  );
}
