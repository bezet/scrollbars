class Scrollbars {
  constructor(options = {}) {
    this.settings = {
      selector: '.scrollbars'
    };

    Object.keys(options).forEach((option) => {
      this.settings[option] = options[option];
    });

    this.scrollbared = document.querySelectorAll(this.settings.selector);
    this.initScrollbaredElements();
  }

  createScrollbars(element) {
    const elementStyle = window.getComputedStyle(element);

    if (elementStyle.overflowY === 'auto' || elementStyle.overflowY === 'scroll') {
      if (elementStyle.position === 'static') {
        element.style.position = 'relative';
      }

      element.style.overflow = 'hidden';

      const content = [];

      while (element.firstChild) {
        content.push(element.removeChild(element.firstChild));
      }

      const scrollContainer = document.createElement('div');
      scrollContainer.classList.add('scrollbars__scroll-container');

      const contentContainer = document.createElement('div');
      contentContainer.classList.add('scrollbars__content-container');

      const scrollbarContainer = document.createElement('div');
      scrollbarContainer.classList.add('scrollbars__scrollbar-container');

      const scrollbar = document.createElement('div');
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

  initScrollbaredElements() {
    [...this.scrollbared].forEach((element, index) => {
      this.createScrollbars(element);
    });
  }
}

export default Scrollbars;



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
