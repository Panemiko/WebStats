export function useNumberFormat() {
  return {
    formatNumberToTwoDigits(number) {
      return number.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })
    },
  }
}