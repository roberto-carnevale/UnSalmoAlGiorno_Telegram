

// const token = 'XXXXXXXXXXXXXXXXXX';
// const SubscriberSpreadsheet = 'XXXXXXXXXXXXXXXXXX';
// const currentWebApp= "https://script.google.com/macros/s/XXXXXXXXXXXXXXXXXX/exec"
// const devWebApp="https://script.google.com/macros/s/XXXXXXXXXXXXXXXXXX/dev";
// const SalmiDBSpreadsheet = "XXXXXXXXXXXXXXXXXX"
// const SalmiDBTab = "salmi-it"
// const SubscriberParams = "Params"

function readParams() {
  return SpreadsheetApp.openById(SubscriberSpreadsheet).getSheetByName(SubscriberParams);
}

function readDebugChat() {
  return (parseInt(readParams().getRange("B4").getValue()));
}

function sendMessage() {
  return (parseInt(readParams().getRange("B1").getValue()));
}
function lastVerse() {
  return (parseInt(readParams().getRange("B2").getValue()));
}
function lastSentUsers() {
  return (parseInt(readParams().getRange("B3").getValue()));
}

function setlastVerse(num) {
  return (parseInt(readParams().getRange("B2").setValue(num)));
}
function setlastSentUsers(num) {
  return (parseInt(readParams().getRange("B3").setValue(num)));
}

//http://fortunes.pbworks.com/w/page/14107117/FrontPage
//Send direct to all
//https://script.google.com/macros/s/AKfycbwfgBg3UYO2GtQ5NmoLkwqnklwfYg9kKBGB68Q6HlXrVbtKeuile4c1/exec?text=
