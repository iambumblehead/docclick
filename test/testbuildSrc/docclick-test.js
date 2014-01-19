// Filename: docclick-test.js  
// Timestamp: 2014.01.18-20:27:51 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)  
// Requires: docclick.js, domev.js

var docclicktest = (function() {

  return {
    init : function () {
      docclick().filter(function (e, elem) {
        return elem.className.match(/popup/i);
      }).onClick(function (e, elem) {
        console.log('click', e, elem);
        return domev.stopDefaultAt( e ); 
      });

      docclick().filter(function (e, elem) {
        return elem.className.match(/internal/i);
      }).onClick(function (e, elem) {
        console.log('click', e, elem);
        return domev.stopDefaultAt( e ); 
      });
    }
  };

}());
