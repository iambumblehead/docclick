docclick
========
**(c)[Bumblehead][0], 2013** [MIT-license](#license)  

### Overview:

docclick returns document click events to a function. You may want content-embedded links to render modals or page transitions. Attach a listener to the document, once, and return click events to a function handling this.

docclick only returns click events from `<a>` elements or elements that are childed to an `<a>` element. 

```javascript
docclick().filter(function (e, elem) {
    return elem.className.match(/popup/i);
}).onClick(function (e, elem) {
    doSomething();
    return e.preventDefault(); 
});
```

docclick **does not** use a popular library like jQuery to interface with the DOM. Instead, it uses purpose-built modules I've made -[eventhook][2], [domev][3], [lsn][4]. With the modules its minified size is ~5.2kb. Without the modules, its minified size is ~2.4kb. Modules are isolated on public docclick methods and may be redefined with methods using jQuery or any library. 


[0]: http://www.bumblehead.com                            "bumblehead"
[2]: https://github.com/iambumblehead/eventhook            "eventhook"
[3]: https://github.com/iambumblehead/domev                    "domev"
[4]: https://github.com/iambumblehead/lsn                        "lsn"

---------------------------------------------------------
#### <a id="get-started"></a>Get Started:

 1. **call a function if it passes a filter function** 

 ```javascript
 docclick().filter(function (e, elem) {
     return elem.className.match(/popup/i);
 }).onClick(function (e, elem) {
     doSomething(e, elem);
 });
 ```

---------------------------------------------------------
#### <a id="install"></a>Install:

docclick may be downloaded directly or installed through `npm`.

 * **npm**   

 ```bash
 $ npm install docclick
 ```

 * **Direct Download**
 
 ```bash  
 $ git clone https://github.com/iambumblehead/docclick.git
 $ cd docclick && npm install
 ```

---------------------------------------------------------
#### <a id="test"></a>Test:

Tests are not automated and are performed by loading a document in the browser and using the browser console.

1. build test files

   `npm start`
   
2. load `test/index.html` in your browser and run tests from the console


---------------------------------------------------------
#### <a id="license">License:

 ![scrounge](https://github.com/iambumblehead/scroungejs/raw/master/img/hand.png) 

(The MIT License)

Copyright (c) 2013 [Bumblehead][0] <chris@bumblehead.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
