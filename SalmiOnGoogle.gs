function SalmiOnGoogle() {
  //set up tab
  this.tabData = SpreadsheetApp.openById(SalmiDBSpreadsheet).getSheetByName(SalmiDBTab);
}

//Draws a tray
SalmiOnGoogle.prototype.selectVerse = function() {
  //gets the seed
  let seedT = parseInt( Math.random() * ( parseInt(this.tabData.getRange("A1").getValue() ) )) +2;
  //gets the verse
  let verseRaw = getVerseData(seedT);
  while (verseRaw[0][1]!="") {
  let seedT = parseInt( Math.random() * ( parseInt(this.tabData.getRange("A1").getValue() ) )) +2;
  //gets the verse
  let verseRaw = getVerseData(seedT);
  }
  let verse = this.createNiceVerse(verseRaw, seedT);
  setlastVerse(seedT);
  return verse;
}

SalmiOnGoogle.prototype.getVerseData = function(seedT) {
  //gets the verse
  return this.tabData.getRange("A"+seedT.toString()+":D"+seedT.toString()).getValues();
}

SalmiOnGoogle.prototype.createNiceVerse = function(verseRaw, seedT) {
  while (verseRaw[0][1]!="") {
    Logger.log(verseRaw);
    seedT++;
    verseRaw = this.tabData.getRange("A"+(parseInt(seedT)).toString()+":D"+(parseInt(seedT)).toString()).getValues();
  }
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
    
