const numberFormatter = Intl.NumberFormat('en-GB', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

export const formatNumber = numberFormatter.format
