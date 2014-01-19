// Filename: docclick.full.js  
// Timestamp: 2014/01/18 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)  

// Filename: incrnum.js  
// Timestamp: 2013.10.22-11:32:49 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)  

var incrnum = ((typeof module === 'object') ? module : {}).exports = (function (uid, fn) {
  
  fn = function () { return uid++; };
  fn.toString = function () { return uid++; };

  return fn;

}(0));
// Filename: eventhook.js
// Timestamp: 2013.10.30-10:51:34 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)
// Requires: incrnum.js



var eventhook = ((typeof module === 'object') ? module : {}).exports = (function () {

  var proto = {
    fnArr: [],

    addFn: function (fn) {
      if (typeof fn === 'function') {
        fn.oname = 'fn' + incrnum;
        this.fnArr.push(fn);
      }
    },

    rmFn: function (fn) {
      var oname = fn.oname;

      if (typeof fn === 'function') {
        this.fnArr = this.fnArr.filter(function (fn) {
          return fn.oname !== oname;
        });
      }
    },

    fire: function (a1,a2,a3,a4) {
      this.fnArr.map(function (fn) {
        fn(a1,a2,a3,a4);
      });
    }
  };

  return {
    proto : proto,
    getNew : function () {
      var that = Object.create(proto);
      that.fnArr = [];
      return that;
    }
  };

}());
// Filename: domev.js
// Timestamp: 2013.12.26-21:15:17 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)

var domev = {
  getElemAt : function (e) {
    var fn = function () {};
    if (typeof e === 'object' && e) {
      if ('target' in e) {
        fn = function (ev) {
          return ev.target;
        };
      } else if ('srcElement' in e) {
        fn = function (ev) {
          return ev.srcElement;
        };
      }
    }
    return (domev.getElemAt = fn)(e);
  },

  stopDefaultAt : function (e) {
    var fn = function () {};
    if (typeof e === 'object' && e) {
      if (e.preventDefault) {
        fn = function (ev) {
          return ev.preventDefault();          
        };
      } else {
        fn = function (ev) {
          return ev.returnValue = false;          
        };
      }
    }
    return (domev.stopDefaultAt = fn)(e);
  }
};


// Filename: lsn.js
// Timestamp: 2013.12.18-10:52:52 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)

var lsn = (function (de, deffn, o, p) {

  de = document.documentElement;
  deffn = function () {};

  function isMethod (o) {
    return /^(?:function|object|unknown)$/.test(typeof o) ? true : false;
  }

  o = {
    add : (function (fn) {
      if (isMethod(de.addEventListener)) {
        fn = function (el, e, fn) {
          el.addEventListener(e, fn, false);
        };
      } else if (isMethod(de.addatchEvent)) {
        fn = function (el, e, fn) {
          el.attachEvent('on'+e, function (e) {
            fn(e || window.event);
          });
        };
      }
      return fn || deffn;
    }()),

    rm : (function (fn) {
      if (isMethod(de.removeEventListener)) {      
        fn = function (el, e, fn) {
          el.removeEventListener(e, fn, false);
        };
      } else if (isMethod(de.detachEvent)) {      
        fn = function (el, e, fn) {
          el.detachEvent('on'+e, fn);
        };
      }
      return fn || deffn;
    }())
  };

  p = o.add;
  p.rm = o.rm;

  return p;
}());


// Filename: docclick.js
// Timestamp: 2014.01.18-20:24:37 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)
// Requires: lsn.js, domev.js, eventhook.js

var docclick = (function (p) {

  var proto = {
    count : 0,
    fnFilterArr : [],

    addFilterFn: function (fn) {
      if (typeof fn === 'function') {
        this.fnFilterArr.push(fn);
      }
      return this;
    },

    isPassFilter : function (e, elem) {
      for (var arr = this.fnFilterArr, x = arr.length; x--;) {
        if (!arr[x](e, elem)) return false;
      }
      return true;
    },

    getParentLink : function (elem, p) {
      if (elem && elem.tagName) {
        if (elem.tagName.match(/^a/i)) {
          p = elem;
        } else {
          p = this.getParentLink(elem.parentNode);
        }
      }

      return p;
    },

    onClick : function (fn) {
      this.atClickHook.addFn(fn);
      return this;
    },

    filter : function (fn) {
      return this.addFilterFn(fn);
    },

    connect : function () {
      var that = this,
          clickElem,
          linkElem;

      lsn(that.elem, 'click', function (e) {
        clickElem = domev.getElemAt(e);
        linkElem = that.getParentLink(clickElem);

        if (linkElem && that.isPassFilter(e, linkElem)) {
          that.atClickHook.fire(e, linkElem);
        }
      });
    }
  };
  
  p = function (opts, fn) {
    var that = Object.create(proto);

    that.elem = (opts && opts.elem) ? opts.elem : document.body;
    that.fnFilterArr = [];
    that.connect();
    that.atClickHook = eventhook.getNew();

    return that;
  };

  p.proto = proto;

  return p;

}());
// Filename: docclick.full.js  
// Timestamp: 2014.01.18-21:14:18 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)  
// Requires: docclick.js
//
// placeholder file for directing scroungejs build
