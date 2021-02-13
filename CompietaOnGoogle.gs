function CompietaOnGoogle() {
  //set up tab
  this.tabData = SpreadsheetApp.openById(SalmiDBSpreadsheet).getSheetByName(SalmiDBCompieta);
}

CompietaOnGoogle.prototype.selectVerse = function(day) {
  //gets the seed
  let dayCol = day +1;
  var seedT = parseInt( Math.random() * ( parseInt(this.tabData.getRange(2,dayCol,1,1).getValue() )-2 ))+3;
  return seedT;
}

CompietaOnGoogle.prototype.createNiceVerse = function(verseRaw, day) {
  let dayCol = day +1;
  return this.tabData.getRange(verseRaw,dayCol,1,1).getValue().toString().replace(/###/g,"\r\n");
}

CompietaOnGoogle.prototype.getDayString = function(day) {
  //gets the seed
  let dayCol = day +1;
  return this.tabData.getRange(1,dayCol,1,1).getValue();

}