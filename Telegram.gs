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
      bot.pushMessage(EmojiSOS+"Eccezione sul messaggio: " + id.toString(), getDebugChat());
      bot.pushMessage(err.toString(), getDebugChat());
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

  var salmoToSend = getLastVerseFull().toString().replace(/###/g,"\r\n");

  var prayers = spread.listSubscribersByTime("l");
  let dayObj = getLiturgicDay();
  let dayName = "";
  let stringHoly = "";
  if (dayObj.name) {dayName=dayObj.name;}
  if (dayObj.holy) {stringHoly=stringsHoly[dayObj.holy];}
  let post1 = dayTempo[dayObj.tempo] +stringsTempo[dayObj.tempo]+stringHoly+dayName+"  "+dayColor[dayObj.color]+"\r\n\r\n";
 
  post1 += "Preghiamo!\r\n ...siamo in "+prayers.length +" uniti in preghiera stamattina.";

  //Sends Saturday the global number
  var sendTotalUser = 0;
  if ( (new Date()).getDay() == 6 ) {sendTotalUser = getAllUsers();}
  if (sendTotalUser != 0 ) {post1 += "\r\n"+ getWeekMsg().toString().replace(/<TOT>/, sendTotalUser) + "\r\n";}
  
  for (var id of prayers) {
    //pushes the message
    try {
      bot.pushMessage(post1, parseInt(id));
      bot.pushMessage(salmoToSend, parseInt(id));
    } catch (err) {
      bot.pushMessage(EmojiSOS+"Eccezione sul messaggio: " + id.toString(), getDebugChat());
      bot.pushMessage(err.toString(), getDebugChat());
    }
  }
  setLastSentUsers(prayers.length);
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
        bot.pushMessage('\uD83D\uDD34'+"Eccezione sul messaggio: " + id.toString(), getDebugChat());
        bot.pushMessage(err.toString(), getDebugChat());
      }
    }
    SpreadsheetApp.openById(SubscriberSpreadsheet).getSheetByName(SubscriberParams).getRange("B1").setValue("");
    SpreadsheetApp.openById(SubscriberSpreadsheet).getSheetByName(SubscriberParams).getRange("C1").setValue(count);
    bot.pushMessage(count + " messages sent.", getDebugChat());
  } else {
    bot.pushMessage('\uD83D\uDD34'+"No messages sent.", getDebugChat());
  }
}


function doRunSendMessagetoInTest() {
  //creates the bot and the samiObj
  var spread = new SpreadData();
  var bot = new Bot(token, {});
  var text = SpreadsheetApp.openById(SubscriberSpreadsheet).getSheetByName(SubscriberParams).getRange("B1").getValue();
  bot.pushMessage('\uD83D\uDD34'+text, getDebugChat());
}
