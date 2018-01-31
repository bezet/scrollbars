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

var myScrollbars = new _scrollbars2.default({
  contentClass: 'content-container__content'
});

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
      selector: '.scrollbars',
      className: 'scrollbars',
      contentClass: 'scroll-content'
    };

    Object.keys(options).forEach(function (option) {
      _this.settings[option] = options[option];
    });

    this.scrollContainers = document.querySelectorAll(this.settings.selector);
    this.initScrollContainers();
  }

  _createClass(Scrollbars, [{
    key: 'dragStart',
    value: function dragStart(startEvent, scrollWrapper, bar) {
      var _this2 = this;

      var scrollRatio = scrollWrapper.clientHeight / scrollWrapper.scrollHeight;
      var lastpageY = event.pageY;

      bar.parentNode.classList.add(this.settings.className + '__bar-wrapper--grabbed');

      var drag = function drag(event) {
        var delta = event.pageY - lastpageY;
        var scrollShift = delta / scrollRatio;

        lastpageY = event.pageY;

        Scrollbars.getRAFHandler()(function () {
          scrollWrapper.scrollTop += scrollShift;
        });
      };

      var dragStop = function dragStop(event) {
        document.removeEventListener('mousemove', drag, false);
        document.removeEventListener('mouseup', dragStop, false);

        bar.parentNode.classList.remove(_this2.settings.className + '__bar-wrapper--grabbed');
      };

      document.addEventListener('mousemove', drag);
      document.addEventListener('mouseup', dragStop);

      startEvent.preventDefault();
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents(scrollWrapper, bar) {
      var _this3 = this;

      scrollWrapper.addEventListener('scroll', function (event) {
        Scrollbars.calcBarPosition(scrollWrapper, bar);
      });

      bar.addEventListener('mousedown', function (event) {
        _this3.dragStart(event, scrollWrapper, bar);
      });

      window.addEventListener('resize', function (event) {
        Scrollbars.calcBarParams(scrollWrapper, bar);
      });

      window.addEventListener('load', function (event) {
        Scrollbars.calcBarParams(scrollWrapper, bar);
        bar.style.visibility = 'visible';
      });
    }
  }, {
    key: 'createScrollbars',
    value: function createScrollbars(scrollContainer) {
      scrollContainer.classList.add('' + this.settings.className);

      var contentWrapper = Scrollbars.createElement('div', this.settings.className + '__content-wrapper');
      var scrollWrapper = Scrollbars.createElement('div', this.settings.className + '__scroll-wrapper');
      var barWrapper = Scrollbars.createElement('div', this.settings.className + '__bar-wrapper');
      var bar = Scrollbars.createElement('div', this.settings.className + '__bar');

      Scrollbars.wrapContent(scrollContainer, contentWrapper);

      bar.style.visibility = 'hidden';
      barWrapper.appendChild(bar);
      scrollContainer.appendChild(barWrapper);

      contentWrapper.classList.add(this.settings.contentClass);
      scrollWrapper.appendChild(contentWrapper);
      scrollContainer.appendChild(scrollWrapper);

      this.bindEvents(scrollWrapper, bar);
    }
  }, {
    key: 'initScrollContainers',
    value: function initScrollContainers() {
      var _this4 = this;

      [].concat(_toConsumableArray(this.scrollContainers)).forEach(function (scrollContainer) {
        _this4.createScrollbars(scrollContainer);
      });
    }
  }], [{
    key: 'calcBarPosition',
    value: function calcBarPosition(scrollWrapper, bar) {
      bar.style.top = scrollWrapper.scrollTop / scrollWrapper.scrollHeight * 100 + '%';
    }
  }, {
    key: 'calcBarHeight',
    value: function calcBarHeight(scrollWrapper, bar) {
      bar.style.height = scrollWrapper.clientHeight / scrollWrapper.scrollHeight * 100 + '%';
    }
  }, {
    key: 'calcBarParams',
    value: function calcBarParams(scrollWrapper, bar) {
      Scrollbars.calcBarHeight(scrollWrapper, bar);
      Scrollbars.calcBarPosition(scrollWrapper, bar);
    }
  }, {
    key: 'wrapContent',
    value: function wrapContent(contentContainer, wrapper) {
      var oldWrapper = contentContainer;
      var newWrapper = wrapper;

      while (oldWrapper.firstChild) {
        newWrapper.appendChild(oldWrapper.removeChild(oldWrapper.firstChild));
      }

      return newWrapper;
    }
  }, {
    key: 'getRAFHandler',
    value: function getRAFHandler() {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (cb) {
        return window.setTimeout(cb, 1000 / 60);
      };
    }
  }, {
    key: 'createElement',
    value: function createElement(tag, className) {
      var element = document.createElement(tag);
      element.classList.add(className);
      return element;
    }
  }]);

  return Scrollbars;
}();

exports.default = Scrollbars;
module.exports = exports['default'];

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map