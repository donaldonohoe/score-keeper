
// Update game history
const gameHistoryAdd = (item) => {

  // Function to create and append date marker
  const createDateMarker = (item) => {
    let el_dateMarker = document.createElement('span');
    el_dateMarker.classList.add('date-marker');
    el_dateMarker.innerHTML = formatTimestampDMY(item.timestamp);
    el_gameInfoHistory.append(el_dateMarker);
  }

  // Add date marker if change of date occurs
  let el_historyItems = el_gameInfoHistory.querySelectorAll('.history-item');
  if(el_historyItems.length) {
    let lastItemTimestamp = el_historyItems[el_historyItems.length - 1].getAttribute('data-timestamp');
    let lastItemDate = formatTimestampDate(lastItemTimestamp);
    let currentItemDate = formatTimestampDate(item.timestamp);
    if(currentItemDate !== lastItemDate) {
      createDateMarker(item);
    }
  }
  else {
    createDateMarker(item);
  }

  // Create and add history item
  let el_historyItem = document.createElement('span');
  el_historyItem.classList.add('history-item');
  el_historyItem.setAttribute('data-timestamp', item.timestamp);
  el_historyItem.innerHTML = `
    <span class="time">${formatTimestampHMS(item.timestamp)}</span>
    <span class="action">${item.action}</span>
  `;
  el_gameInfoHistory.append(el_historyItem);

}