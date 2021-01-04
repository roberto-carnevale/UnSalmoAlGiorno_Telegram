function doPost(e) {
  try {
 // Make sure to only reply to json requests
  if(e.postData.type == "application/json") {
 
    // Parse the update sent from Telegram
    var update = JSON.parse(e.postData.contents);// Instantiate the bot passing the update 
    
    //creates the bot
    var bot = new Bot(token, update);
    
    //Creates the command bus
    var bus = new CommandBus();
    
    var spread = new SpreadData();
  
    //Mnages "/start" command
    bus.on(/\/start/, function () {
      if (bot.update.message.from.id == bot.update.message.chat.id) {
        this.replyToSender("Caro " + bot.update.message.from.first_name + ",");
        this.replyToSender("  ti arriverà un versetto al giorno a lodi o compieta, potrai scegliere col comando /change");
        this.replyToSender("Puoi sospendere o riprendere coi comandi /suspend e /resume");
        this.replyToSender("Puoi disiscriverti col comando /stop");
        this.replyToSender("Se vuoi un versetto durante la giornata prega col comando /prego");
        this.replyToSender("Usa il comando /help per scrivermi una mail");
        this.replyToSender("Buona Preghiera! Roberto")
        spread.writeSubscriber(bot.update.message.from.id, bot.update.message.from.first_name, bot.update.message.from.last_name);
        bot.pushMessage("UnSalmoAlGiorno START: " + (bot.update.message.from.id).toString() + ">" + bot.update.message.from.first_name + " " +  bot.update.message.from.last_name, readDebugChat());
      } else {
        bot.pushMessage("Ciao a tutti e grazie di avermi aggiunto alla chat " + bot.update.message.chat.title, bot.update.message.chat.id);
        spread.writeSubscriber(bot.update.message.chat.id, bot.update.message.chat.title, "*GROUP*");
      }
    });
    
    //Manages "/stop" command
    bus.on(/\/stop/, function () {
      this.replyToSender("Non dimenticarti mai di pregare, arrivederci " + bot.update.message.from.first_name);
      spread.deleteSubscriber(bot.update.message.from.id, bot.update.message.from.first_name, bot.update.message.from.last_name);
      bot.pushMessage("UnSalmoAlGiorno STOP: " + (bot.update.message.from.id).toString() + ">" + bot.update.message.from.first_name + " " +  bot.update.message.from.last_name, readDebugChat());
    });
    
    //Manages "/prego" command
    bus.on(/\/prego/, function () {
      if (spread.getSubscriber(bot.update.message.chat.id) == -1) {this.replyToSender("Ciao "+ bot.update.message.from.first_name + " devi prima dare il comando /start ");}
      else {
        var salmoOBJ = new SalmiOnGoogle();
        this.replyToSender(salmoOBJ.selectVerse()[0]);
      }
    });
    
    
    //Manages "/suspend" draw cookies command
    bus.on(/\/suspend/, function () {
      var line_id = spread.getSubscriber(bot.update.message.chat.id);
      bot.pushMessage(bot.update.message.chat.id + " ha sospeso UnSalmoAlGiorno", readDebugChat());
      if (line_id > -1) { 
        spread.setStatus(line_id, "N");
        bot.pushMessage("Sospeso l'invio di un Salmo al giorno", parseInt(bot.update.message.chat.id));
      }
      
    });
    
    //Manages "/resume" draw cookies command
    bus.on(/\/resume/, function () {
      var line_id = spread.getSubscriber(bot.update.message.chat.id);
      bot.pushMessage(bot.update.message.chat.id + " ha ripreso UnSalmoAlGiorno", readDebugChat());
      if (line_id > -1) { 
        spread.setStatus(line_id, "Y"); 
        bot.pushMessage("Buona preghiera con un Salmo al giorno", parseInt(bot.update.message.chat.id));
      }
    });   
    
    //Manages "/help" draw cookies command
    bus.on(/\/help/, function () {
      bot.pushMessage("Ti serve aiuto? https://sites.google.com/view/unsalmoalgiornobot/home \r\n Oppure scrivi a kn35roby@gmail.com ", bot.update.message.chat.id);
    });
     
  //########TASTIERA###### 
    //Manages "/change" command
    bus.on(/\/change/, function () {
      let listOfButtons = [["#Lodi"], ["#Compieta"], ["#Tutti"]];
      bot.createKeyboard(listOfButtons);
    });
    
    //Manages "/abort_change" command
    bus.on(/\/abort_change/, function () {
      bot.destroyKeyboard();
    });

    //Manages tray direct change
    bus.trays_request(/#Lodi/, function () {
      let subscribers = new SpreadData();
      subscribers.setTime(bot.update.message.chat.id,"l");
      bot.replyToSender("Un Salmo alle Lodi.");
      bot.destroyKeyboard();

    });
    
    //Manages tray direct change
    bus.trays_request(/#Compieta/, function () {
      let subscribers = new SpreadData();
      subscribers.setTime(bot.update.message.chat.id,"c");
      bot.replyToSender("Un Salmo a Compieta.");
      bot.destroyKeyboard();

    });

    //Manages tray direct change
    bus.trays_request(/#Tutti/, function () {
      let subscribers = new SpreadData();
      subscribers.setTime(bot.update.message.chat.id,"t");
      bot.replyToSender("Un Salmo di buon mattino e uno la sera prima di coricardi.");
      bot.destroyKeyboard();

    });
    //######TASTIERA####

    // registers the bus 
    bot.register(bus);
   
    // If the update is valid, process it
    if (update) {
      bot.process();
    }
    //Counts the executions and tracks the dumps
        let err_tab = SpreadsheetApp.openById(SubscriberSpreadsheet).getSheetByName('LAST_ERROR');
        err_tab.getRange('A1').setValue("SUCCESS");
        let executions = err_tab.getRange('A2').getValue();
        executions = parseInt(executions) + 1;
        err_tab.getRange('A2').setValue(executions);
  } 
  } catch (err) {
    //Counts the errors and tracks the dumps
    let err_tab = SpreadsheetApp.openById(SubscriberSpreadsheet).getSheetByName('LAST_ERROR');
    err_tab.getRange('A1').setValue(err.toString());
    err_tab.getRange('D1').setValue(err.stack.toString());
    let executions = err_tab.getRange('A3').getValue();
    executions = parseInt(executions) + 1;
    err_tab.getRange('A3').setValue(executions);
  }
}

function doRunUnSalmoAcompietaSubscribers() {

  //creates the bot and the samiObj
  var spread = new SpreadData();
  var bot = new Bot(token, {});
  var salmiObj = new SalmiOnGoogle();
  var salmoToSend = salmiObj.selectVerse()[0];
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
  var salmoSelected = salmiObj.selectVerse();
  var salmoToSend = salmoSelected[0];
  var salmoSeed = salmoSelected[1];
  var prayers = spread.listSubscribersByTime("l");
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
  setlastSentUsers(prayersCount);
  setlastVerse(salmoSeed);
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

function doGet(e) {
  var salmiObj = new SalmiOnGoogle();
  let htmlProlog = "<p><i>Preghiamo!\r\n ...siamo in "+lastSentUsers() +" uniti in preghiera</i></p><p>";
  let htmlOutput = HtmlService.createHtmlOutput(htmlProlog + salmiObj.niceVerseForWeb(lastVerse())+"</p>");
  htmlOutput.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT);
  return htmlOutput;
}

/* function doGet(e) {
  var template = HtmlService
  .createTemplateFromFile('200');
  try {
    //creates the bot
    var bot = new Bot(token, {});
    // queries the subscribers
    var spread = new SpreadData();
    
    var countMessages = 0;
    for (id of spread.listAllSubscribers()) {
      if (!isNaN(parseInt(id))) {
        countMessages++;
      }
    }
    //sends message to Roberto
    bot.pushMessage("Messaggi: " + countMessages.toString(), readDebugChat());
    //prepare the page
    template.num = countMessages;
    template.text = e.parameter["text"];
    
    for (id of spread.listAllSubscribers()) {
      if (!isNaN(parseInt(id))) {
        //pushes the message
        try {
          bot.pushMessage(template.text, parseInt(id));
        } catch (err) {
          bot.pushMessage("Eccezione sul messaggio: " + id.toString(), readDebugChat());
          bot.pushMessage(err.toString(), readDebugChat());
        }
      }
    }
  }
  catch (err) {
    var templateErr = HtmlService
    .createTemplateFromFile('500');
    templateErr.err = err;
    console.log(err, err.message);
    return templateErr.evaluate();
  }
  
  return template.evaluate();
} */

//Testing function. Use locally
function test()
{

}
