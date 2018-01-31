class Scrollbars {
  constructor(options = {}) {
    this.settings = {
      selector: '.scrollbars',
      className: 'scrollbars'
    };

    Object.keys(options).forEach((option) => {
      this.settings[option] = options[option];
    });

    this.scrollContainers = document.querySelectorAll(this.settings.selector);
    this.initScrollContainers();
  }

  static calcBarPosition(scrollWrapper, bar) {
    bar.style.top = `${(scrollWrapper.scrollTop / scrollWrapper.scrollHeight) * 100}%`;
  }

  static calcBarHeight(scrollWrapper, bar) {
    bar.style.height = `${(scrollWrapper.clientHeight / scrollWrapper.scrollHeight) * 100}%`;
  }

  static calcBarParams(scrollWrapper, bar) {
    Scrollbars.calcBarHeight(scrollWrapper, bar);
    Scrollbars.calcBarPosition(scrollWrapper, bar);
  }

  static wrapContent(contentContainer, wrapper) {
    const oldWrapper = contentContainer;
    const newWrapper = wrapper;

    while (oldWrapper.firstChild) {
      newWrapper.appendChild(oldWrapper.removeChild(oldWrapper.firstChild));
    }

    return newWrapper;
  }

  static initDragHandler(scrollWrapper, bar) {
    const raf = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.msRequestAnimationFrame;
    // || function(cb) {
    //   return window.setTimeout(cb, 1000 / 60);
    // };

    const scrollRatio = scrollWrapper.clientHeight / scrollWrapper.scrollHeight;
    let lastpageY;

    const drag = (event) => {
      const delta = event.pageY - lastpageY;

      lastpageY = event.pageY;

      raf(() => {
        scrollWrapper.scrollTop += delta / scrollRatio;
      });
    };

    const stop = () => {
      document.removeEventListener('mousemove', drag, false);
      document.removeEventListener('mouseup', stop, false);

      document.getElementsByTagName('body')[0].classList.remove('scrollbar-grabbed');
      bar.classList.remove(`${this.settings.className}__bar--grabbed`);
    };

    bar.addEventListener('mousedown', (event) => {
      lastpageY = event.pageY;

      document.addEventListener('mousemove', drag, false);
      document.addEventListener('mouseup', stop, false);

      document.getElementsByTagName('body')[0].classList.add('scrollbar-grabbed');
      bar.classList.add(`${this.settings.className}__bar--grabbed`);

      event.preventDefault();
    }, false);
  }

  static bindEvents(scrollWrapper, bar) {
    scrollWrapper.addEventListener('scroll', (event) => {
      Scrollbars.calcBarPosition(scrollWrapper, bar);
    });

    window.addEventListener('resize', event => Scrollbars.calcBarParams(scrollWrapper, bar));

    window.addEventListener('load', (event) => {
      Scrollbars.calcBarParams(scrollWrapper, bar);
      bar.style.visibility = 'visible';
    });

    Scrollbars.initDragHandler(scrollWrapper, bar);
  }

  static createElement(tag, className) {
    const element = document.createElement(tag);
    element.classList.add(className);
    return element;
  }

  createScrollbars(scrollContainer) {
    scrollContainer.classList.add(`${this.settings.className}`);

    const contentWrapper = Scrollbars.createElement('div', `${this.settings.className}__content-wrapper`);
    const scrollWrapper = Scrollbars.createElement('div', `${this.settings.className}__scroll-wrapper`);
    const barWrapper = Scrollbars.createElement('div', `${this.settings.className}__bar-wrapper`);
    const bar = Scrollbars.createElement('div', `${this.settings.className}__bar`);

    Scrollbars.wrapContent(scrollContainer, contentWrapper);

    bar.style.visibility = 'hidden';
    barWrapper.appendChild(bar);
    scrollContainer.appendChild(barWrapper);

    scrollWrapper.appendChild(contentWrapper);
    scrollContainer.appendChild(scrollWrapper);

    Scrollbars.bindEvents(scrollWrapper, bar);
  }

  initScrollContainers() {
    [...this.scrollContainers].forEach((scrollContainer) => {
      this.createScrollbars(scrollContainer);
    });
  }
}

export default Scrollbars;
