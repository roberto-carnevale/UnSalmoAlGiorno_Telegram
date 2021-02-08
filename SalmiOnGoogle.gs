function SalmiOnGoogle() {
  //set up tab
  this.tabData = SpreadsheetApp.openById(SalmiDBSpreadsheet).getSheetByName(SalmiDBTab);
  this.tabTypeData = SpreadsheetApp.openById(SalmiDBSpreadsheet).getSheetByName(SalmiDBByTypeTab);
}

// Used for prego command!
SalmiOnGoogle.prototype.selectVerse = function() {
  //gets the seed
  var seedT = parseInt( Math.random() * ( parseInt(this.tabData.getRange("A1").getValue() ) )) +2;
  //gets the verse
  var verseRaw = this.getVerseData(seedT);
  while (verseRaw[0][1]!="") {
    seedT = parseInt( Math.random() * ( parseInt(this.tabData.getRange("A1").getValue() ) )) +2;
    //gets the verse
    verseRaw = this.getVerseData(seedT);
  }
  let verse = this.createNiceVerse(verseRaw);
  setLastVerse(seedT);
  return verse;
}

//Draws a tray
SalmiOnGoogle.prototype.selectTypeVerse = function(type) {
  //gets the seed
  var seedT = parseInt( Math.random() * ( parseInt(this.tabData.getRange("A1").getValue() ) )) +2;
  //gets the verse
  var verseRaw = this.getVerseTypeData(seedT);
  while (verseRaw[0][1]!=type) {
    Logger.log("re-run:" + verseRaw[0][1] + "/" + seedT);
    seedT = parseInt( Math.random() * ( parseInt(this.tabData.getRange("A1").getValue() ) )) +2;
    //gets the verse
    verseRaw = this.getVerseTypeData(seedT);
  }
  return seedT;
}

SalmiOnGoogle.prototype.getSelectedTypeVerse = function() {

  let verse = this.createNiceVerse(verseRaw);
  return verse;
}

SalmiOnGoogle.prototype.getVerseData = function(seedT) {
  //gets the verse
  return this.tabData.getRange("A"+seedT.toString()+":D"+seedT.toString()).getValues();
}
SalmiOnGoogle.prototype.getVerseTypeData = function(seedT) {
  //gets the verse
  return this.tabTypeData.getRange("A"+seedT.toString()+":D"+seedT.toString()).getValues();
}

SalmiOnGoogle.prototype.createNiceVerse = function() {
  return getLastVerseFull().toString().replace(/###/g,"\r\n");
}

SalmiOnGoogle.prototype.niceVerseForWeb = function(seedW) {
  let verseRaw = this.tabTypeData.getRange("A"+seedW+":D"+seedW).getValues();
  let htmlVerse = getLastVerseFull().toString().replace(/###/g,"<br/>");
  return htmlVerse;
}


//Testing function. Use locally
function test(){
  var f = new SalmiOnGoogle();
  var r = f.selectVerse();
  Logger.log(r);
}
    
