
// Returns ordinal value of a given number, e.g. turns 2 into "2nd" and 7 into "7th"

const getOrdinal = (n) => {
  let ordinal = 'th';
  if (n % 10 == 1 && n % 100 != 11) {
    ordinal = 'st';
  } else if (n % 10 == 2 && n % 100 != 12) {
    ordinal = 'nd';
  } else if (n % 10 == 3 && n % 100 != 13) {
    ordinal = 'rd';
  }
  return n + ordinal;
}
