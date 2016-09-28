
## Suggestions for development

- [Dealing with class names in React.](#reactClass)
- [`shouldComponentUpdate` without immutables.](reactShouldUpdateSimple)

## <a name="reactClass"></a> Dealing with class names in React.

Your styles are in `./style.css` files.
Webpack and `style-loader` locally scope class names.
You import a map of class names with `import style from './style'`.

Fancy. Now all you have to do is decide which class names so render.

The package `classNames` works well here.

```javascript
import classNames from 'classnames';
classNames('foo', 'bar'); // => 'foo bar'
classNames('foo', { bar: true }); // => 'foo bar'
classNames({ 'foo-bar': true }); // => 'foo-bar'
classNames({ 'foo-bar': false }); // => ''
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'
classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'

var Button = React.createClass({
  // ...
  render () {
    var btnClass = classNames(
      'btn',
      this.props.className,
      { 'btn-pressed': this.state.isPressed,
        'btn-over': !this.state.isPressed && this.state.isHovered
    });
    return <button className={btnClass}>{this.props.label}</button>;
  }
});
```

## <a name="reactShouldUpdateSimple"></a> `shouldComponentUpdate` without immutables.

Your alternative is to compare current and previous prop and state values.
The impressive `tj` (express, stylus, koa, co, etc. 23.3k followers)
suggests doing
https://gist.github.com/tj/7e135a1357982edd1fd0a5649578f6ec
