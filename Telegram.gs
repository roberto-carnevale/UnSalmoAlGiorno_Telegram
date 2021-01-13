function doRunUnSalmoAcompietaSubscribers() {

  //creates the bot and the samiObj
  var spread = new SpreadData();
  var bot = new Bot(token, {});
  var salmiObj = new SalmiOnGoogle();
  var salmoToSend = salmiObj.selectVerse();
  var prayers = spread.listSubscribersByTime("c");
  var prayersCount = prayers.length;
  for (var id of prayers) {
    //pushes the message
    try {
      bot.pushMessage("Preghiamo!\r\n ...siamo in "+prayersCount +" uniti in preghiera", parseInt(id));
      bot.pushMessage(salmoToSend, parseInt(id));
    } catch (err) {
      bot.pushMessage("Eccezione sul messaggio: " + id.toString(), readDebugChat());
      bot.pushMessage(err.toString(), readDebugChat());
    }
  }
  //Counts the messages sent
  let err_tab = SpreadsheetApp.openById(SubscriberSpreadsheet).getSheetByName('LAST_ERROR');
  let executions = err_tab.getRange('A4').getValue();
  executions = parseInt(executions) + 1;
  err_tab.getRange('A4').setValue(executions);
}

function doRunUnSalmoALodiSubscribers() {

  //creates the bot and the samiObj
  var spread = new SpreadData();
  var bot = new Bot(token, {});
  var salmiObj = new SalmiOnGoogle();
  var salmoToSend = salmiObj.selectVerse();
  var prayers = spread.listSubscribersByTime("l");
  var prayersCount = prayers.length;
  var sendTotalUser = 0;
  if ( (new Date()).getDate() == 6 ) {sendTotalUser = getAllUsers()}
  for (var id of prayers) {
    //pushes the message
    try {
      bot.pushMessage("Preghiamo!\r\n ...siamo in "+prayersCount +" uniti in preghiera", parseInt(id));
      if (sendTotalUser != 0 ) {bot.pushMessage("Quasta settimana abbiamo pregato in "+ sendTotalUser + ", uniti con chi ci segue dai __social__")}
      bot.pushMessage(salmoToSend, parseInt(id));
    } catch (err) {
      bot.pushMessage("Eccezione sul messaggio: " + id.toString(), readDebugChat());
      bot.pushMessage(err.toString(), readDebugChat());
    }
  }
  setlastSentUsers(prayersCount);
  //Counts the messages sent
  let err_tab = SpreadsheetApp.openById(SubscriberSpreadsheet).getSheetByName('LAST_ERROR');
  let executions = err_tab.getRange('A4').getValue();
  executions = parseInt(executions) + 1;
  err_tab.getRange('A4').setValue(executions);
}

function doRunSendMessagetoAll() {
  //creates the bot and the samiObj
  var spread = new SpreadData();
  var bot = new Bot(token, {});
  let count = 0;
  var text = SpreadsheetApp.openById(SubscriberSpreadsheet).getSheetByName(SubscriberParams).getRange("B1").getValue();
  for (var id of spread.listAllSubscribers()) {
    try {
      bot.pushMessage(text, parseInt(id));
    } catch (err) {
      bot.pushMessage("Eccezione sul messaggio: " + id.toString(), readDebugChat());
      bot.pushMessage(err.toString(), readDebugChat());
    }
  }
  SpreadsheetApp.openById(SubscriberSpreadsheet).getSheetByName(SubscriberParams).getRange("C1").setValue(count);
}
