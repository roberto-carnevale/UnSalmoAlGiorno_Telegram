function SpreadData() {
  this.spread = SpreadsheetApp.openById(SubscriberSpreadsheet);
}

//gets subscriber line number (-1 if not found)
SpreadData.prototype.getSubscriber = function(id){
  //Catches the tab of the subscripers  
  var tab = this.spread.getSheetByName("Subscribers");
  var lastRowString= (tab.getLastRow()+1).toString();
  //search if already registered
  var rangeString = "A1:A" + lastRowString;
  
  var foundNumber = 1;
  var found = false;
  for (elem of tab.getRange(rangeString).getValues()) {
    if (elem == id) {
      found = true;
      break;
    } else { foundNumber++; }
  }
  if (found) { return foundNumber;}
  else {return -1;}
}

//records a new subscriber (if new)
SpreadData.prototype.writeSubscriber = function(value, name, surname){
  //Catches the tab of the subscripers  
  var tab = this.spread.getSheetByName("Subscribers");
  var lastRowString= (tab.getLastRow()+1).toString();
  //search for a subscriber
  var id_line=this.getSubscriber(value);
  //if not found it record it
  if (id_line == -1) { 
    rangeString = "A" + lastRowString;
    tab.getRange(rangeString).setValue(value);
    rangeString = "B" + lastRowString;
    tab.getRange(rangeString).setValue(name);
    rangeString = "C" + lastRowString;
    tab.getRange(rangeString).setValue(surname);
    rangeString = "D" + lastRowString;
    tab.getRange(rangeString).setValue("l");
    rangeString = "E" + lastRowString;
    tab.getRange(rangeString).setValue("Y");
  }
}

//deletes a subscriber if found
SpreadData.prototype.deleteSubscriber = function(value){
  //Catches the tab of the subscripers  
  var tab = this.spread.getSheetByName("Subscribers");
  //search for a subscriber
  var id_line=this.getSubscriber(value);
  //if not found it record it
  if (id_line > -1) { 
    tab.deleteRow(parseInt(id_line));
  }
}

//lists all subscribers
SpreadData.prototype.listAllSubscribers = function () {
  //Catches the tab of the subscripers  
  var tab = this.spread.getSheetByName("Subscribers");
  var lastRowString= (tab.getLastRow()).toString();
  //search if already registered
  var rangeString = "A1:A" + lastRowString;
  
  return tab.getRange(rangeString).getValues();

}

//lists all subcribers that allow drawing
SpreadData.prototype.listSubscribers = function () {
  //Catches the tab of the subscripers  
  var tab = this.spread.getSheetByName("Subscribers");
  var lastRowString= (tab.getLastRow()+1).toString();
  //search if already registered
  var rangeString = "A1:E" + lastRowString;
  var data = tab.getRange(rangeString).getValues();
  
  var dataToReturn = []
  
  for (id in data) {
    if (data[id][4] == "Y") {
      dataToReturn.push(data[id][0]);
    }
  }
  return dataToReturn;
}

//lists all subcribers that allow drawing
SpreadData.prototype.listSubscribersByTime = function (time) {
  //Catches the tab of the subscripers  
  var tab = this.spread.getSheetByName("Subscribers");
  var lastRowString= (tab.getLastRow()+1).toString();
  //search if already registered
  var rangeString = "A1:E" + lastRowString;
  var data = tab.getRange(rangeString).getValues();
  
  var dataToReturn = []
  
  for (id in data) {
    if (data[id][4] == "Y" && (data[id][3] == time || data[id][3] == "t")) {
      dataToReturn.push(data[id][0]);
    }
  }
  return dataToReturn;
}

//find a subscriber data
SpreadData.prototype.setTime = function(id, setTime){
  let id_line = this.getSubscriber(id);
  if (id_line > -1) {
    this.spread.getSheetByName("Subscribers").getRange("D"+id_line.toString()).setValue(setTime);
  }
}

//find a subscriber data
SpreadData.prototype.findSubscriber = function(id){
  //Catches the tab of the subscripers  
  var tab = this.spread.getSheetByName("Subscribers");
  var lastRowString= (tab.getLastRow()+1).toString();
  //search for a subscriber line
  var id_line=this.getSubscriber(id);
  
  // creates the dictonary
  var result = {}
  result["found"] = false;
  if (id_line > -1) { 
    result["found"] = true;
    rangeString = "A" + id_line.toString();
    result["id"] = tab.getRange(rangeString).getValue();
    rangeString = "B" + id_line.toString();
    result["name"] = tab.getRange(rangeString).getValue();
    rangeString = "C" + id_line.toString();
    result["surname"] = tab.getRange(rangeString).getValue();
    rangeString = "D" + id_line.toString();
    result["fortune"] = tab.getRange(rangeString).getValue();
    rangeString = "E" + id_line.toString();
    result["updates"] = tab.getRange(rangeString).getValue();    
  }
  return result;
}

//find a subscriber data
SpreadData.prototype.setStatus = function(id_line, status){
  this.spread.getSheetByName("Subscribers").getRange("E"+id_line.toString()).setValue(status);
}
