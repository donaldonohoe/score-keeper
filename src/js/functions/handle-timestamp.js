
// Format to Date-Month-Year
const formatTimestampHMS = (timestamp) => {
  return timestamp.split('T')[1].split('.')[0];
}

// Format to Hours:Minutes:Seconds
const formatTimestampDMY = (timestamp) => {
  return timestamp.split('T')[0].split('-').reverse().join('-');
}

// Format to Date only
const formatTimestampDate = (timestamp) => {
  let DMY = formatTimestampDMY(timestamp);
  return DMY.split('-')[0];
}