/** Balanced card grids: 3 across on desktop, 2 across on tablets, and no orphan in the last row.
    The grid is 6 columns wide on desktop; a normal card takes 2. A last row of one card stretches across
    the whole width (the card lays itself out horizontally), a last row of two shares the row in halves. */
export const GRID = 'grid gap-5 sm:grid-cols-2 lg:grid-cols-6'

export function span(i: number, n: number, mode: 'stretch' | 'center' = 'stretch'): { cls: string; wide: boolean } {
  const rest = n % 3
  const lastRow = i >= n - (rest === 0 ? 3 : rest)
  let lg = 'lg:col-span-2'
  let wide = false
  if (rest === 1 && i === n - 1) {
    if (mode === 'stretch') { lg = 'lg:col-span-6'; wide = true } else lg = 'lg:col-span-2 lg:col-start-3'
  } else if (rest === 2 && lastRow) {
    if (mode === 'stretch') lg = 'lg:col-span-3'
    else lg = i === n - 2 ? 'lg:col-span-2 lg:col-start-2' : 'lg:col-span-2 lg:col-start-4'
  }
  const sm = n % 2 === 1 && i === n - 1 ? 'sm:col-span-2' : ''
  return { cls: `${sm} ${lg}`.trim(), wide }
}
