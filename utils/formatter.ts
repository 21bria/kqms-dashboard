/**
 * Format angka menjadi string dengan koma sebagai pemisah ribuan
 * Contoh: 1234567.89 => "1,234,567.89"
 */
export function formatNumber(value: number, decimals = 2): string {
  if (!value || isNaN(value)) return '0'
  return value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * Format angka menjadi bentuk singkat
 * Contoh: 1500 => "1.5K", 1200000 => "1.2M"
 */
export function formatShortNumber(value?: number | null): string {
  if (typeof value !== 'number' || isNaN(value)) return '0'

  if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(1) + 'B'
  if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + 'M'
  if (value >= 1_000) return (value / 1_000).toFixed(1) + 'K'
  return value.toFixed(0)
}


/**
 * Format persen dan tambahkan simbol %
 * Contoh: 0.875 => "87.5%"
 */
export function formatPercent(value: number): string {
  if (!value || isNaN(value)) return '0%'
  return `${(value * 100).toFixed(1)}%`
}
