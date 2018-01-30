/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _scrollbars = __webpack_require__(1);

var _scrollbars2 = _interopRequireDefault(_scrollbars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var myScrollbars = new _scrollbars2.default();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scrollbars = function () {
  function Scrollbars() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Scrollbars);

    this.settings = {
      selector: '.scrollbars'
    };

    Object.keys(options).forEach(function (option) {
      _this.settings[option] = options[option];
    });

    this.scrollbared = document.querySelectorAll(this.settings.selector);
    this.initScrollbaredElements();
  }

  _createClass(Scrollbars, [{
    key: 'createScrollbars',
    value: function createScrollbars(element) {
      var elementStyle = window.getComputedStyle(element);

      if (elementStyle.overflowY === 'auto' || elementStyle.overflowY === 'scroll') {
        if (elementStyle.position === 'static') {
          element.style.position = 'relative';
        }

        element.style.overflow = 'hidden';

        var content = [];

        while (element.firstChild) {
          content.push(element.removeChild(element.firstChild));
        }

        var scrollContainer = document.createElement('div');
        scrollContainer.classList.add('scrollbars__scroll-container');

        var contentContainer = document.createElement('div');
        contentContainer.classList.add('scrollbars__content-container');

        var scrollbarContainer = document.createElement('div');
        scrollbarContainer.classList.add('scrollbars__scrollbar-container');

        var scrollbar = document.createElement('div');
        scrollbar.classList.add('scrollbars__scrollbar');

        while (content.length) {
          contentContainer.appendChild(content.shift());
        }

        scrollbarContainer.appendChild(scrollbar);
        scrollContainer.appendChild(scrollbarContainer);
        scrollContainer.appendChild(contentContainer);
        element.appendChild(scrollContainer);
      }
    }
  }, {
    key: 'initScrollbaredElements',
    value: function initScrollbaredElements() {
      var _this2 = this;

      [].concat(_toConsumableArray(this.scrollbared)).forEach(function (element, index) {
        _this2.createScrollbars(element);
      });
    }
  }]);

  return Scrollbars;
}();

exports.default = Scrollbars;

// 	makeCustomScrollbars: function(containers) {

//     var self = this;

//   function createScrollbar(container) {

//     container.classList.add("content-container");

//     var content = [];
//     while (container.firstChild) {
//       content.push(container.removeChild(container.firstChild));
//     };

//     var scrollWrapper = document.createElement("div");
//     scrollWrapper.classList.add("scroll-wrapper");

//     var contentWrapper = document.createElement("div");
//     contentWrapper.classList.add("content-wrapper");

//     content.forEach(function(node, i) {
//       contentWrapper.appendChild(node);
//     });

//     var scrollbar = document.createElement("div");
//     scrollbar.classList.add("custom-scrollbar");

//     scrollWrapper.appendChild(contentWrapper);
//     container.appendChild(scrollWrapper);
//     container.appendChild(scrollbar);

//       var clientHeight = scrollWrapper.clientHeight,
//           scrollHeight = scrollWrapper.scrollHeight,
//           scrollRatio = clientHeight / scrollHeight,
//             lastpageY;

//       // (function() {
//           var raf = window.requestAnimationFrame
//               || window.webkitRequestAnimationFrame
//               || window.mozRequestAnimationFrame
//               || window.msRequestAnimationFrame
//               || function(cb) { return window.setTimeout(cb, 1000 / 60); };

//           function drag(event) {
//               var delta = event.pageY - lastpageY;

//               lastpageY = event.pageY;

//               raf(function() {
//                   scrollWrapper.scrollTop += delta / scrollRatio;
//               });
//           }

//           function stop() {
//               document.removeEventListener("mousemove", drag, false);
//               document.removeEventListener("mouseup", stop, false);

//               document.getElementsByTagName("body")[0].classList.remove("scrollbar-grabbed");
//             scrollbar.classList.remove("scrollbar-grabbed");
//           }

//           scrollbar.addEventListener("mousedown", function(event) {
//             lastpageY = event.pageY;

//             document.addEventListener("mousemove", drag, false);
//             document.addEventListener("mouseup", stop, false);

//             document.getElementsByTagName("body")[0].classList.add("scrollbar-grabbed");
//             scrollbar.classList.add("scrollbar-grabbed");

//             event.preventDefault();
//           }, false);
//       // }());

//       function resizeScrollbar() {
//           var scrollbarHeight;

//           if (scrollHeight > clientHeight) {
//              scrollbarHeight = (clientHeight / scrollHeight) * 100 + "%";
//              console.log("Resizing Scrollbar: ", scrollbarHeight);
//           } else {
//              scrollbar.style.display = "none";
//              contentWrapper.style.marginRight = "0";
//              scrollbarHeight = 0;
//           }

//           return scrollbarHeight;
//       }

//       function setScrollbarPosition() {
//             var scrollbarPos = (scrollWrapper.scrollTop / scrollHeight) * 100 + "%";
//             return scrollbarPos;
//         }

//       scrollbar.style.height = resizeScrollbar();

//       window.addEventListener("resize", function() {
//         scrollbar.style.height = resizeScrollbar();
//         scrollbar.style.top = setScrollbarPosition();
//       }, false);

//       scrollWrapper.addEventListener("scroll", function() {
//           scrollbar.style.top = setScrollbarPosition();
//       }, false);
//      }

//   if (!containers) {
//     var containers = document.getElementsByClassName("content-container");

//   } else if (typeof containers === "string") {
//     if (containers.indexOf(".") !== -1 && containers.indexOf(".") === 0) {
//       containers = containers.slice(1);
//       containers = document.getElementsByClassName(containers);

//     } else if (containers.indexOf("#") !== -1 && containers.indexOf("#") === 0) {
//       containers = containers.slice(1);
//       containers = document.getElementById(containers);
//     } else {
//       throw new Error("makeCustomScrollbars' argument must be a proper selector begining either with . or #");
//     }
//   }

//   if (typeof containers === "null" || (typeof containers === "object" && !containers.length)) {
//     throw new Error("makeCustomScrollbars' argument must be a proper string selector, HTLMCollection or DOM Node");
//   }

//   // If HTLMCollection (e.g. by getElementsByClassName)
//   if (containers.length) {
//     self.helpers.collectionLoop(containers, function(container) {
//       // console.log("run createScrollbar on collection el:", container);
//       createScrollbar(container);
//     });

//   // If single DOM node (e.g. by getElementById)
//   } else {
//     // console.log("run createScrollbar on single el:", containers);
//     createScrollbar(containers);
//   }
// },

module.exports = exports['default'];

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map