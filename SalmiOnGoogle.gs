function SalmiOnGoogle() {
  //set up tab
  this.tabData = SpreadsheetApp.openById(SalmiDBSpreadsheet).getSheetByName(SalmiDBTab);
  this.tabTypeData = SpreadsheetApp.openById(SalmiDBSpreadsheet).getSheetByName(SalmiDBByTypeTab);
}

// Used for prego command!
SalmiOnGoogle.prototype.selectVerse = function() {
  let objLiturgicDay = getLiturgicDay()
  //gets the seed
  var seedT = parseInt( Math.random() * ( parseInt(this.tabTypeData.getRange("A1").getValue() ) )) +2;
  //gets the verse
  var verseRaw = this.getVerseTypeData(seedT);
  while (verseRaw[0][1]!=objLiturgicDay.psalm) {
    seedT = parseInt( Math.random() * ( parseInt(this.tabTypeData.getRange("A1").getValue() ) )) +2;
    //gets the verse
    verseRaw = this.getVerseTypeData(seedT);
  }
  let verse = this.createNiceVerseRandom(seedT);

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

SalmiOnGoogle.prototype.getVerseTypeData = function(seedT) {
  //gets the verse
  return this.tabTypeData.getRange("A"+seedT.toString()+":D"+seedT.toString()).getValues();
}

SalmiOnGoogle.prototype.createNiceVerse = function() {
  return getLastVerseFull().toString().replace(/###/g,"\r\n");
}

SalmiOnGoogle.prototype.createNiceVerseRandom = function(seedT) {
  let verseRaw = this.tabTypeData.getRange("A"+seedT.toString()+":D"+seedT.toString()).getValues();
  let verse = verseRaw[0][0]+","+verseRaw[0][2] + "###" + verseRaw[0][3].toString();
  return verse.replace(/###/g,"\r\n");
}
    
