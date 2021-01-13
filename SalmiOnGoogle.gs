function SalmiOnGoogle() {
  //set up tab
  this.tabData = SpreadsheetApp.openById(SalmiDBSpreadsheet).getSheetByName(SalmiDBTab);
}

//Draws a tray
SalmiOnGoogle.prototype.selectVerse = function() {
  //gets the seed
  var seedT = parseInt( Math.random() * ( parseInt(this.tabData.getRange("A1").getValue() ) )) +2;
  //gets the verse
  var verseRaw = this.getVerseData(seedT);
  while (verseRaw[0][1]!="") {
    seedT = parseInt( Math.random() * ( parseInt(this.tabData.getRange("A1").getValue() ) )) +2;
    //gets the verse
    verseRaw = getVerseData(seedT);
  }
  let verse = this.createNiceVerse(verseRaw);
  setlastVerse(seedT);
  return verse;
}

SalmiOnGoogle.prototype.getVerseData = function(seedT) {
  //gets the verse
  return this.tabData.getRange("A"+seedT.toString()+":D"+seedT.toString()).getValues();
}

SalmiOnGoogle.prototype.createNiceVerse = function(verseRaw) {
  return verseRaw[0][0]+","+verseRaw[0][2] +"\r\n"+ verseRaw[0][3].toString().replace(/###/g,"\r\n");
}

SalmiOnGoogle.prototype.niceVerseForWeb = function(seedW) {
  let verseRaw = this.tabData.getRange("A"+seedW+":D"+seedW).getValues();
  let htmlVerse = verseRaw[0][0]+","+verseRaw[0][2] + "<br/>" + verseRaw[0][3].toString().replace(/###/g,"<br/>");
  return htmlVerse;
}


//Testing function. Use locally
function test(){
  var f = new SalmiOnGoogle();
  var r = f.selectVerse();
  Logger.log(r);
}
    
