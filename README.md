# fancy-node
Access or create DOM nodes in style.

## Features
This package lets you conveniently access existing and create new DOM nodes. It works with either the DOM in a web browser or [jsdom](https://www.npmjs.com/package/jsdom). 

## Installation
You can add `fancy-node` to your project with:
```bash
npm i fancy-node
```

## Usage
```javascript
// client-side
import fn from 'fancy-node'; 

// server-side
import fn from 'fancy-node/server.js';
// alternatively: const fn = require('fancy-node/server')
```
`fancy-node/server.js` sets up a `jsdom` environment with `require('global-jsdom/register');`. Other than that it's identical with the client-side version.  

### Building elements
The basic syntax is `fn.<any>()` where `<any>` is the type of element you wish to create:
```javascript
const div1 = fn.div();
// -> <div></div>

const div2 = fn.div({options}); 
// -> <div id="foo" class="bar"></div>, we'll see about the options in a minute
```
You can use any native HTML or SVG element as a method, in fact, all function calls go through a `Proxy` that acts as a dispatcher. In other words, you could use `fn.span()`, `fn.ul()`, `fn.svg()` and so on. Web components are not supported, `fn.myComponent()` would fail.

#### Options
Options are a nested object with the following keys:
| Name         | Type    | Default     |
|--------------|---------|-------------|
| `content`    | mixed   | `undefined` |
| `attributes` | Object  | `{}`        |
| `style`      | Object  | `{}`        |
| `data`       | Object  | `{}`        |
| `aria`       | Object  | `{}`        |
| `events`     | Object  | `{}`        |
| `classNames` | Array   | `[]`        |
| `isSvg`      | Boolean | `false`     |

##### `content`
This is, as you would have expected, the content of the element. It can be any of the following:
- text
- an HTML element with or without sub-elements
- a SVG element with or without sub-elements
- a piece of HTML code
- a piece of SVG code - this works only when the code starts with `<svg`!
- an array with any combination of the above
```javascript
// the example assume fn.div({ content: ... }) as basis

content: 'some random text'
// -> <div>some random text</div>

content: fn.div({
    content: fn.span()
})
// -> <div><div><span></span></div></div>

content: '<div><span></span></div>'
// -> <div><div><span></span></div></div>

content: [
    'another random text',
    fn.span(
        attributes: {
            id: 'foo'
        }
        content: fn.svg({
            isSvg: true
        })
    )
]
// -> <div>another random text<span id="foo"><svg ..></svg></span></div>
```

##### `attributes`
Example:
```javascript
attributes: {
    id: 'foo',
    href: '#bar',
    src: './foo/bar.png', // as if this combination would make any sense, whatsoever...
    disabled: true // for boolean attributes
}
// -> <elem id="foo" href="#bar" src="./foo/bar.png" disabled>
```
When assigning properties or attributes to an element created with `document.createElement()`, we sometimes come across cases not everybody is familiar with. `for` in a `<label>` needs actually to be set as `htmlFor` and `tabindex` needs to be written in camel case. `fn` uses a mapping to automatically fix these issues, so that `for` and `htmlFor`, `class` and `className` etc. are equally accepted.

_Important note: [jsdom doesn't support some attributes such as `contentEditable`](https://github.com/jsdom/jsdom/issues/1670). This is something you need to take into account when using this package to build HTML on the server!_

##### `style`
This accepts the same values you would set in `element.style`:
```javascript
style: {
    fontSize: '1.4rem', 
    border: '1px red solid'
}
// -> <div style="font-size: 1.4rem; border: 1px red solid">
```
You could also set a string in `attributes.style`; it will be merged into the `style` object. `style` takes precedence over `attributes.style`.

##### `data`
These values are applied to `element.dataset`.
```javascript
data: {
    foo: 'bar',
    bar: 42
}
// -> <div data-foo="bar" data-bar"42">
```
##### `aria`
Before you set anything ARIA-related consider the [first rule of ARIA use](https://www.w3.org/TR/using-aria/#firstrule); there probably already exists an [HTML element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) for your particular purpose.

With that being said, you can set ARIA rules like this:
```javascript
aria: {
    role: 'progressbar', // see above
    hidden: true, 
    label: 'Close'
}
// -> <div role="progessbar" aria-hidden="true" aria-label="Close">
```
All rules but `role` will be prefixed with `aria-`.

##### `events`
Key-value pairs of events and their associated functions:
```javascript
events: {
    click: evt => {
        magic(evt.target);
    }
}
// -> div does something magical when being clicked
```

##### `classNames`
An array of class names that will be added to `element.classList`. `attributes.className` or `attribute.class` for those of you, who can never remember how to do stuff properly, will also work. Admittedly, `className` is a property and not an attribute, but you have to compromise at some point. If that bothers you, use `classNames` instead.

##### `isSvg`
This needs to `true` for all SVG elements (`svg`, `path`, `circle`, etc.).

### Retrieving elements
Wrapping `document.querySelector()` and `document.querySelectorAll()` into `$()` or `$$()` is nothing new, the versions in `fancy-node` are borrowed from [Lea Verou](https://lea.verou.me/2015/04/jquery-considered-harmful/). Here they live under the namespace `fn` or whatever name you have chosen upon import.

The first argument for both functions, `$()` and `$$()` is a CSS selector, the optional second argument a container element.
```javascript
const list = fn.$('ul');
// -> first <ul>

const firstLiElement = fn.$('li', list);
// -> first <li> element inside this <ul>

const allLiElements = fn.$$('li', list);
// -> all <li> elements inside this <ul>
```
### Other functions

#### `fn.toNode()`
This is used under the hood to power the `content` argument but is also publicly accessible. It accepts the same input as `content` and returns either an `HTMLElement` or a `DOMFragment`, either way a single piece.

To resuse the example from [`content`](#content), this would be:
```javascript
fn.toNode('some random text')
// -> TextNode

fn.toNode(fn.div({
    content: fn.span()
}))
// -> HTMLElement '<div><span></span></div>'

fn.toNode('<div><span></span></div>')
// -> HTMLElement '<div><span></span></div>'

fn.toNode([
    'another random text',
    fn.span(
        attributes: {
            id: 'foo'
        }
    ),
    fn.svg({
        isSvg: true
    })
])
// -> DOMFragment containing all the above 
```

#### `fn.empty()`
This removes all content from an element without the shortcomings of `element.innerHTML = ''`.
```javascript
const elem = fn.empty(fn.$('.bar'));
// -> <elem><x><y><z>text</z></y></x></elem> to <elem></elem>
```

#### `fn.waitFor()`
This waits for an element to be present in the DOM and takes the same arguments as `fn.$()`. It returns a Promise with the element as its value.
```javascript
const ul = fn.$('ul');
fn.waitFor('li.bar', ul) // container is optional
    .then(element => {
        magic(element);
    })
// -> waits for `<li class="bar"> to be present before doing magic
```
