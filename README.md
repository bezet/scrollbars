# scrollbars [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]
> A library providing customized scrollbars to a given elements.

[DEMO](https://bezet.github.io/scrollbars/)

## Installation

```bash
npm i @bezet/scrollbars
```


## Usage
### Add styles
`<link rel="stylesheet" type="text/css" href="dist/scrollbars.css">`

### Add JS
Either
```
import Scrollbars from '@bezet/scrollbars';
const myScrollbars = new Scrollbars({
  selector: '.scrollbars',
  className: 'scrollbars',
  contentClass: 'scrollbars__content-wrapper',
  hoverable: true
});
```

or
```
<script type="text/javascript" src="dist/scrollbars.js"></script>
<script type="text/javascript">
  var myScrollbars = new Scrollbars({
    selector: '.scrollbars',
    className: 'scrollbars',
    contentClass: 'scrollbars__content-wrapper',
    hoverable: true
  });
</script>
```

## License

MIT © [Bartek Zadara](github.com/bezet)


[npm-image]: https://badge.fury.io/js/%40bezet%2Fscrollbars.svg
[npm-url]: https://npmjs.org/package/@bezet/scrollbars
[daviddm-image]: https://david-dm.org/bezet/scrollbars.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/bezet/scrollbars
