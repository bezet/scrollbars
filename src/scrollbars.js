class Scrollbars {
  constructor(options = {}) {
    this.settings = {
      selector: '.scrollbars',
      className: 'scrollbars',
      contentClass: 'scrollbars__content-wrapper'
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

  static getRAFHandler() {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      (cb => window.setTimeout(cb, 1000 / 60));
  }

  static createElement(tag, className) {
    const element = document.createElement(tag);
    element.classList.add(className);
    return element;
  }

  dragStart(startEvent, scrollWrapper, bar) {
    const scrollRatio = scrollWrapper.clientHeight / scrollWrapper.scrollHeight;
    let lastpageY = event.pageY;

    bar.parentNode.classList.add(`${this.settings.className}__bar-wrapper--grabbed`);

    const drag = (event) => {
      const delta = event.pageY - lastpageY;
      const scrollShift = delta / scrollRatio;

      lastpageY = event.pageY;

      Scrollbars.getRAFHandler()(() => {
        scrollWrapper.scrollTop += scrollShift;
      });
    };

    const dragStop = (event) => {
      document.removeEventListener('mousemove', drag, false);
      document.removeEventListener('mouseup', dragStop, false);

      bar.parentNode.classList.remove(`${this.settings.className}__bar-wrapper--grabbed`);
    };

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragStop);

    startEvent.preventDefault();
  }

  bindEvents(scrollWrapper, bar) {
    scrollWrapper.addEventListener('scroll', (event) => {
      Scrollbars.calcBarPosition(scrollWrapper, bar);
    });

    bar.addEventListener('mousedown', (event) => {
      this.dragStart(event, scrollWrapper, bar);
    });

    window.addEventListener('resize', (event) => {
      Scrollbars.calcBarParams(scrollWrapper, bar);
    });

    window.addEventListener('load', (event) => {
      Scrollbars.calcBarParams(scrollWrapper, bar);
      bar.style.visibility = 'visible';
    });
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

    contentWrapper.classList.add(this.settings.contentClass);
    scrollWrapper.appendChild(contentWrapper);
    scrollContainer.appendChild(scrollWrapper);

    this.bindEvents(scrollWrapper, bar);
  }

  initScrollContainers() {
    [...this.scrollContainers].forEach((scrollContainer) => {
      this.createScrollbars(scrollContainer);
    });
  }
}

export default Scrollbars;
