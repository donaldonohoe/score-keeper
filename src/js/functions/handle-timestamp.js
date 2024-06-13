
// Timestamp as string such as: 'Thu Jun 13 2024 23:34:49 GMT+0100 (Irish Standard Time)'

// Format to Hours:Minutes:Seconds
const formatTimestampHMS = (timestamp) => {
  return timestamp.split(' ')[4];
}

// Format to Date Full
const formatTimestampDateFull = (timestamp) => {
  return `${timestamp.split(' ')[0]}, ${timestamp.split(' ')[2]} ${timestamp.split(' ')[1]} ${timestamp.split(' ')[3]}`;
}

// Format to Date-Month-Year
const formatTimestampDMY = (timestamp) => {
  //return timestamp.split('T')[0].split('-').reverse().join('-');
  //return timestamp.split(' ')[0];
}

// Format to Date only
const formatTimestampDate = (timestamp) => {
  return timestamp.split(' ')[2];
}