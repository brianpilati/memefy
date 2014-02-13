/* Data Object */

/*

  I stole this from here
  http://stackoverflow.com/questions/7574054/javascript-how-to-pass-object-by-value
*/

function clone(obj){
  if(obj == null || typeof(obj) != 'object')
  return obj;

  var temp = new obj.constructor(); 
  for(var key in obj)
  temp[key] = clone(obj[key]);

  return temp;
}

var memeDataObject = {
  'DosEquis' : {
    'title': 'Dos Equis',
    'tagLine' : 'I usually don\'t ...',
    'image': 'dosEquis.jpg',
    'memeTypeId': 'DosEquis',
    'rating': 'appropriate'
  },
  'BurtReynolds' : {
    'title': 'Burt Reynolds',
    'tagLine' : 'Sexy as a Service',
    'image': 'burtReynolds.jpg',
    'memeTypeId': 'BurtReynolds',
    'rating': 'restricted'
  }
};

var globalMemeTypes = [
  {
   'title': 'Dos Equis',
   'tagLine' : 'I usually don\'t ...',
   'image': 'dosEquis.jpg',
   'memeTypeId': 'DosEquis',
    'rating': 'appropriate'
  },
  {
    'title': 'Burt Reynolds',
    'tagLine' : 'Sexy as a Service',
    'image': 'burtReynolds.jpg',
    'memeTypeId': 'BurtReynolds',
    'rating': 'restricted'
  }
];

var globalDosEquisMemes = {
  "-adsfasdfasd1" : {lineOne: "1", lineTwo: "2"},
  "-adsfasdfasd2" : {lineOne: "3", lineTwo: "4"},
  "-adsfasdfasd3" : {lineOne: "5", lineTwo: "6"},
  "-adsfasdfasd4" : {lineOne: "7", lineTwo: "8"},
  "-adsfasdfasd5" : {lineOne: "9", lineTwo: "10"},
  "-adsfasdfasd6" : {lineOne: "11", lineTwo: "12"},
  "-adsfasdfasd7" : {lineOne: "13", lineTwo: "14"}
};

var globalReturnMemes = {
  "DosEquis": {
    "-JFSOZT0vfPTc381tAsU": {
      "user":"9101",
      "lineTwo":"6","lineOne":"5"
    },
    "-JFSOMEkprqcmHxOd2zd" : {
      "user":"1234",
      "lineTwo":"2",
      "lineOne":"1"
    }
  },
  "BurtReynolds" : {
    "-JFSOnHTnEWKGTbxU4Yv": {
      "user":"5678",
      "lineTwo":"4",
      "lineOne":"3"
    }
  }
};

var expectedDosEquisMemes = [
  {lineOne: '1', lineTwo: '2'}, 
  {lineOne: '3', lineTwo: '4'}, 
  {lineOne: '5', lineTwo: '6'}, 
  {lineOne: '7', lineTwo: '8'}, 
  {lineOne: '9', lineTwo: '10'}, 
  {lineOne: '11', lineTwo: '12'}, 
  {lineOne: '13', lineTwo: '14'}
];

var expectedDosEquisMeme = expectedDosEquisMemes.slice(0,1).pop();

var newMeme = {lineOne: '15', lineTwo: '16'}

var globalNewDosEquisMemes = clone(globalDosEquisMemes);
globalNewDosEquisMemes['-adsfasdfasd8'] = newMeme;

var expectedNewDosEquisMemes = expectedDosEquisMemes.slice(0);
expectedNewDosEquisMemes.push(newMeme);
