export function formatDateTime(
  value: Date | string | number,
  locales?: Intl.LocalesArgument,
  options: Intl.DateTimeFormatOptions = { dateStyle: 'long', timeStyle: 'short' }
) {
  const date = value instanceof Date ? value : new Date(value)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return new Intl.DateTimeFormat(locales, options).format(date)
}
