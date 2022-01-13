// Deployment ID
const deployementID ='AKfycbxdrtvQnUfyQRCTX-8oYN-BEd3aL5yW-HO0AxMG8y_egu3jEw7J55p4UO-IBDMdTE0y';
var currentWebApp= "https://script.google.com/macros/s/"+deployementID+"/exec";

function setWebhook() {
  var bot = new Bot(token, {});
  Logger.log(ScriptApp.getService().getUrl())
  var result = bot.request('setWebhook', {
    url: currentWebApp
  });
  
  Logger.log(result);
}


function deleteWebhook() {
  var bot = new Bot(token, {});
  var result = bot.request('deleteWebhook', {});
  
  Logger.log(result);
}


function getWebhookInfo() {
  var bot = new Bot(token, {});
  var result = bot.request('getWebhookInfo', {});
  
  Logger.log(result);
}
