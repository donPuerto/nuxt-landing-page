const readableDateTimeFormatter = Intl.DateTimeFormat('en-GB', {
  dateStyle: 'long',
  timeStyle: 'short',
})

export const formatReadableDateTime = readableDateTimeFormatter.format
