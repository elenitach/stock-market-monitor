export const round = (value: number, places: number) => {
  return Math.round(value * 10 ** places) / 10 ** places
}
