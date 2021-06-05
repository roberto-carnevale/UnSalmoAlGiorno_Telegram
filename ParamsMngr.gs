function readParams() {
  return SpreadsheetApp.openById(SubscriberSpreadsheet).getSheetByName(SubscriberParams);
}

function sendMessage() {
  return (parseInt(readParams().getRange("B1").getValue()));
}
//lastVerse
function getLastVerse() {
  return (parseInt(readParams().getRange("B2").getValue()));
}
function setLastVerse(num) {
  return (parseInt(readParams().getRange("B2").setValue(num)));
}
//lastSentUsers
function getLastSentUsers() {
  return (parseInt(readParams().getRange("B3").getValue()));
}
function setLastSentUsers(num) {
  readParams().getRange("B3").setValue(num);
}
//debugChat
function getDebugChat() {
  return (parseInt(readParams().getRange("B4").getValue()));
}
//twitterFollowers
function getTwitterFollowers() {
  return (parseInt(readParams().getRange("B5").getValue()));
}
//facebookLikes
function getFacebookLikes() {
  return (parseInt(readParams().getRange("B6").getValue()));
}
function setFacebookLikes(num) {
  readParams().getRange("B6").setValue(num);
}
//liturgicDay
function getLiturgicDay() {
  return JSON.parse(readParams().getRange("B7").getValue());
}

//lastVerseFull
function getLastVerseFull() {
  return readParams().getRange("B8").getValue();
}
//dayFull
function getdayFull() {
  return readParams().getRange("B9").getValue();
}

//weekMsg
function getWeekMsg () {
  return readParams().getRange("B10").getValue();
}

//compietaMsg
function setCompietaFull(msg) {
  readParams().getRange("B11").setValue(msg);
}
function getCompietaFull() {
  return readParams().getRange("B11").getValue();
}

function getCompietaImage() {
  return readParams().getRange("B12").getValue();
}

function getTelegramSubcribers() {
  return SpreadsheetApp.openById(SubscriberSpreadsheet).getSheetByName("Subscribers").getDataRange().getNumRows();
}
function getAllUsers() {
  return readParams().getRange("B16").getValue();
}






