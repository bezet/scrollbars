class Scrollbars {
  constructor(options = {}) {
    this.settings = {
      selector: '.scrollbars',
      className: 'scrollbars',
      contentClass: 'scrollbars__content-wrapper',
      hoverable: true
    };

    Object.keys(options).forEach((option) => {
      this.settings[option] = options[option];
    });

    this.scrollContainers = document.querySelectorAll(this.settings.selector);
    this.initScrollContainers();
  }

  static setBarVisibility(barY, barX) {
    if (barY.style.height !== '100%') {
      barY.parentNode.style.visibility = 'visible';
    } else {
      barY.parentNode.style.visibility = 'hidden';
    }

    if (barX.style.width !== '100%') {
      barX.parentNode.style.visibility = 'visible';
    } else {
      barX.parentNode.style.visibility = 'hidden';
    }
  }

  static calcBarXPosition(scrollWrapper, bar) {
    bar.style.left = `${(scrollWrapper.scrollLeft / scrollWrapper.scrollWidth) * 100}%`;
  }

  static calcBarXLength(scrollWrapper, bar) {
    bar.style.width = `${(scrollWrapper.clientWidth / scrollWrapper.scrollWidth) * 100}%`;
  }

  static calcBarYPosition(scrollWrapper, bar) {
    bar.style.top = `${(scrollWrapper.scrollTop / scrollWrapper.scrollHeight) * 100}%`;
  }

  static calcBarYLength(scrollWrapper, bar) {
    bar.style.height = `${(scrollWrapper.clientHeight / scrollWrapper.scrollHeight) * 100}%`;
  }

  static calcBarParams(scrollWrapper, barY, barX) {
    Scrollbars.calcBarYLength(scrollWrapper, barY);
    Scrollbars.calcBarXLength(scrollWrapper, barX);
    Scrollbars.calcBarYPosition(scrollWrapper, barY);
    Scrollbars.calcBarXPosition(scrollWrapper, barX);
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

  bindEvents(scrollWrapper, barY, barX) {
    scrollWrapper.addEventListener('scroll', (event) => {
      Scrollbars.calcBarYPosition(scrollWrapper, barY);
      Scrollbars.calcBarXPosition(scrollWrapper, barX);
    });

    barY.addEventListener('mousedown', (event) => {
      this.dragStart(event, scrollWrapper, barY);
    });

    // barX.addEventListener('mousedown', (event) => {
    //   this.dragStart(event, scrollWrapper, barX);
    // });

    window.addEventListener('resize', (event) => {
      Scrollbars.calcBarParams(scrollWrapper, barY, barX);
      Scrollbars.setBarVisibility(barY, barX);
    });

    window.addEventListener('load', (event) => {
      Scrollbars.calcBarParams(scrollWrapper, barY, barX);
      Scrollbars.setBarVisibility(barY, barX);
    });
  }

  createScrollbars(scrollContainer) {
    scrollContainer.classList.add(`${this.settings.className}`);

    if (this.settings.hoverable) {
      scrollContainer.classList.add(`${this.settings.className}--hoverable`);
    }

    const contentWrapper = Scrollbars.createElement('div', `${this.settings.className}__content-wrapper`);
    const scrollWrapper = Scrollbars.createElement('div', `${this.settings.className}__scroll-wrapper`);

    const barWrapperY = Scrollbars.createElement('div', `${this.settings.className}__bar-wrapper-y`);
    const barY = Scrollbars.createElement('div', `${this.settings.className}__bar`);

    const barWrapperX = Scrollbars.createElement('div', `${this.settings.className}__bar-wrapper-x`);
    const barX = Scrollbars.createElement('div', `${this.settings.className}__bar`);

    Scrollbars.wrapContent(scrollContainer, contentWrapper);

    barWrapperX.style.visibility = 'hidden';
    barWrapperX.appendChild(barX);
    scrollContainer.appendChild(barWrapperX);

    barWrapperY.style.visibility = 'hidden';
    barWrapperY.appendChild(barY);
    scrollContainer.appendChild(barWrapperY);

    contentWrapper.classList.add(this.settings.contentClass);
    scrollWrapper.appendChild(contentWrapper);
    scrollContainer.appendChild(scrollWrapper);

    this.bindEvents(scrollWrapper, barY, barX);
  }

  initScrollContainers() {
    [...this.scrollContainers].forEach((scrollContainer) => {
      this.createScrollbars(scrollContainer);
    });
  }
}

export default Scrollbars;
