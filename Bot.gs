//construct a function that way you can add features to your bot.
function Bot (token, update) {
 this.token = token;
 this.update = update;
 this.handlers = [];
}


// Defines a way to register handlers that are triggered by a given condition.
Bot.prototype.register = function (handler) {
  this.handlers.push(handler);
}


//The process method invokes only handlers that satisfy the given condition.
Bot.prototype.process = function () {  
  for (var i in this.handlers) {
    var event = this.handlers[i];
    var result = event.condition(this);
    if (result) {
      return event.handle(this);
    }
  }
}

//The request method handles the call to the Telegram Bot Platform. It sends each request as a serialized JSON object.
Bot.prototype.request = function (method, data) {
 var options = {
  'method' : 'post',
  'contentType': 'application/json',
  // Convert the JavaScript object to a JSON string.
  'payload' : JSON.stringify(data),
  'muteHttpExceptions' : true
 };
 Logger.log(options.payload.toString());

 var response = UrlFetchApp.fetch('https://api.telegram.org/bot' + this.token + '/' + method, options);
 
 if (response.getResponseCode() == 200) {
  return JSON.parse(response.getContentText());
 }
  if (response.getResponseCode() != 200) {
  Logger.log(response.getResponseCode());
  Logger.log(response.getContentText());
 }
return false;
}

//The replyToSender method is a utility function for your convenience.
Bot.prototype.replyToSender = function (text) {
 return this.request('sendMessage', {
  'chat_id': this.update.message.chat.id,
  'text': text
 });
}

//Sends a direct message
Bot.prototype.pushMessage = function (text, id) {
  return this.request('sendMessage', {
    'chat_id' : id,
    'text' : text
  });
}

//////////////////////////////TEST -- WORKING AREA  ///////////////////////////////////////////////
function testMedia () {
  var file = DriveApp.getFolderById("16fgZ4yKCc2c-tOmkyuFNFU-_4Oewu4Fz").getFilesByName("brand.jpg").next().getBlob();
  //Logger.log(file.getBlob().getContentType());
  var bot = new Bot(token, {})

   var options = {
    'method' : 'post',
    payload: {'chat_id':getDebugChat().toString(),
    'photo': "AgACAgQAAxkDAANFYCcSduYbYCeYcR_-3YVnnS1TDZgAApu2MRsMCDlRltFAEhksWfYgvQUpXQADAQADAgADbQADjqcDAAEeBA"},
    'muteHttpExceptions': true
  };
Logger.log(UrlFetchApp.getRequest('https://api.telegram.org/bot1603346201:AAHspbLK3s9vYjr0Ni8TulLFkl-3ioGQYUg/sendPhoto', options));
 var response = UrlFetchApp.fetch('https://api.telegram.org/bot1603346201:AAHspbLK3s9vYjr0Ni8TulLFkl-3ioGQYUg/sendPhoto', options);

Logger.log(response.getResponseCode());
 if (response.getResponseCode() == 200) {
  Logger.log(response);
  return JSON.parse(response);
 }
  if (response.getResponseCode() != 200) {
  Logger.log(response);

 }
return false;
}

//////////////////////////////////////////////////////////////////////

//######TASTIERA####
//still under test to create a custom keyboard
Bot.prototype.createKeyboard = function(arrayOfButtons) {
  return this.request('sendMessage', {
    'chat_id': this.update.message.chat.id,
    'text': "Lodi o Compieta?" , 
    'reply_markup' : { 
      'keyboard' : arrayOfButtons,
      'one_time_keyboard': true
    }
  });
}

//still under test to delete a custom keyboard
Bot.prototype.destroyKeyboard = function() {
  return this.request('sendMessage', {
    'chat_id': this.update.message.chat.id,
    'text': "Buona Preghiera!" , 
    'reply_markup' : { 
      'remove_keyboard' : true
    }
  });
//#######TASTIERA#####
}
