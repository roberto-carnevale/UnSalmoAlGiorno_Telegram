function doRunUnSalmoAcompietaSubscribers() {

  //creates the bot and the samiObj
  var spread = new SpreadData();
  var bot = new Bot(token, {});
  var compietaObj = new CompietaOnGoogle();
  // find the day of the week
  let now = new Date();
  now.setUTCHours(12,0,0,0);
  let verseRow = compietaObj.selectVerse(now.getDay());
  var prayers = spread.listSubscribersByTime("c");
  let salmoToSend = compietaObj.createNiceVerse(verseRow, now.getDay());
  var post1 = "Compieta "+compietaObj.getDayString(now.getDay())+", preghiamo!\r\n ...siamo in "+prayers.length +" uniti in preghiera";
  for (var id of prayers) {
    //pushes the message
    try {
      bot.pushMessage(post1, parseInt(id));
      bot.pushMessage(salmoToSend, parseInt(id));
    } catch (err) {
      bot.pushMessage(EmojiSOS+"Eccezione sul messaggio: " + id.toString(), readDebugChat());
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
  var salmoToSend = salmiObj.getSelectedTypeVerse();

  var prayers = spread.listSubscribersByTime("l");
  let dayObj = getLiturgicDay();
  let dayName = "";
  let stringHoly = "";
  if (dayObj.name) {dayName=dayObj.name;}
  if (dayObj.holy) {stringHoly=stringsHoly[dayObj.holy];}
  let post1 = dayTempo[dayObj.tempo] + "  Preghiamo "+stringsTempo[dayObj.tempo]+stringHoly+dayName+"  "+dayColor[dayObj.color]+"\r\n\r\n";
 
  post1 += "Preghiamo!\r\n ...siamo in "+prayers.length +" uniti in preghiera stamattina.";

  //Sends Saturday the global number
  var sendTotalUser = 0;
  if ( (new Date()).getDay() == 6 ) {sendTotalUser = getAllUsers();}
  if (sendTotalUser != 0 ) {post1 += "\r\nQuesta settimana abbiamo pregato in "+ sendTotalUser + " in comunione con chi ci segue dai social";}

  for (var id of prayers) {
    //pushes the message
    try {
      bot.pushMessage(post1, parseInt(id));
      bot.pushMessage(salmoToSend, parseInt(id));
    } catch (err) {
      bot.pushMessage(EmojiSOS+"Eccezione sul messaggio: " + id.toString(), readDebugChat());
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
  if (text != "") {
    for (var id of spread.listAllSubscribers()) {
      try {
        bot.pushMessage(text, parseInt(id));
        count++;
      } catch (err) {
        bot.pushMessage('\uD83D\uDD34'+"Eccezione sul messaggio: " + id.toString(), readDebugChat());
        bot.pushMessage(err.toString(), readDebugChat());
      }
    }
    SpreadsheetApp.openById(SubscriberSpreadsheet).getSheetByName(SubscriberParams).getRange("B1").setValue("");
    SpreadsheetApp.openById(SubscriberSpreadsheet).getSheetByName(SubscriberParams).getRange("C1").setValue(count);
    bot.pushMessage(count + " messages sent.", readDebugChat());
  } else {
    bot.pushMessage('\uD83D\uDD34'+"No messages sent.", readDebugChat());
  }
}


function doRunSendMessagetoInTest() {
  //creates the bot and the samiObj
  var spread = new SpreadData();
  var bot = new Bot(token, {});
  var text = SpreadsheetApp.openById(SubscriberSpreadsheet).getSheetByName(SubscriberParams).getRange("B1").getValue();
  bot.pushMessage('\uD83D\uDD34'+text, readDebugChat());
}
