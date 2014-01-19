// Filename: docclick.js
// Timestamp: 2014.01.18-21:16:51 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)
// Requires: lsn.js, domev.js, eventhook.js

var lsn = require('lsn'),
    domev = require('domev'),
    eventhook = require('eventhook');

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
