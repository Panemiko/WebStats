export function useNumberFormat() {
  return {
    toTwoDigits(number: number) {
      return number.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })
    },
    toTwoDecimals(number: number) {
      return number.toFixed(2)
    },
  }
}
