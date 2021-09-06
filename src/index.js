/**
 *  Access or create DOM nodes in style.
 *
 *  Copyright (C) 2020  Dieter Raber
 *  https://opensource.org/licenses/MIT
 */

/**
 * Build an Element or DocumentFragment from just about anything
 * @param content
 * @returns {Element|DocumentFragment|HTMLElement|DocumentFragment|DocumentFragment}
 */
const cast = content => {

    if (typeof content === 'undefined') {
        return document.createDocumentFragment();
    }

    // HTML or SVG element or DocumentFragment, a single node either way
    if (content instanceof Element || content instanceof DocumentFragment) {
        return content;
    }

    // numeric values are treated as strings
    if (typeof content === 'number') {
        content = content.toString();
    }

    // HTML, text or a mix
    if (typeof content === 'string' ||
        content instanceof String
    ) {
        // if the string is text without any code
        if (!(/<(.*)>/.test(content))) {
            return document.createTextNode(content);
        }

        let node;
        // either HTML or SVG
        const mime = content.includes('<svg') ? 'image/svg+xml' : 'text/html';
        const doc = (new DOMParser()).parseFromString(content, mime);
        // if the string is HTML code
        if (doc.body) {
            node = document.createDocumentFragment();
            const children = Array.from(doc.body.childNodes);
            children.forEach(elem => {
                node.append(elem);
            });
            return node;
        }
        // if the string is SVG code
        else {
            return doc.documentElement;
        }
    }
    console.error('Expected Element|DocumentFragment|String|HTMLCode|SVGCode, got', content);
}

/**
 * Container object for all functions
 */
const obj = {
    /**
     * Returns first element that matches CSS selector `selector`.
     * Querying can optionally be restricted to `container`’s descendants
     * @param {String} selector
     * @param {HTMLElement} container
     * @return {HTMLElement || null}
     * @see https://lea.verou.me/2015/04/jquery-considered-harmful/
     */
    $: (selector, container = null) => {
        return typeof selector === 'string' ? (container || document).querySelector(selector) : selector || null;
    },

    /**
     * Returns all elements that match CSS selector `selector` as an array.
     * Querying can optionally be restricted to `container`’s descendants
     * @param {String} selector
     * @param {HTMLElement} container
     * @return {Array}
     * @see https://lea.verou.me/2015/04/jquery-considered-harmful/
     */
    $$: (selector, container = null) => {
        return [].slice.call((container || document).querySelectorAll(selector));
    },

    /**
     * Wait for an element to be present in the DOM
     * @param selector
     * @param container
     * @returns {Promise<HTMLElement>}
     */
    waitFor: function (selector, container = null) {
        return new Promise(resolve => {
            const getElement = () => {
                const element = obj.$(selector, container);
                if (element) {
                    resolve(element);
                } else {
                    requestAnimationFrame(getElement);
                }
            };
            getElement();
        })
    },

    /**
     * Convert whatever form of HTML to a single element or fragment
     * The actual conversion is mostly done by cast()
     * @param {Element|DocumentFragment|Iterable|String|HTMLCode|SVGCode} content
     * @return {Element|DocumentFragment}
     */
    toNode: content => {

        // cast non-iterables to array
        if (!content.forEach || typeof content.forEach !== 'function') {
            content = [content];
        }


        // cast all parts to Elements or DocumentFragments
        content = content.map(entry => cast(entry));

        if (content.length === 1) {
            return content[0]
        } else {
            const fragment = document.createDocumentFragment();
            // Array.from avoids problems with live collections
            content.forEach(entry => {
                fragment.append(entry);
            })
            return fragment;

        }
    },

    /**
     * Empty an element whilst avoiding `innerHTML`;
     * @param {HTMLElement} element
     * @returns
     */
    empty: element => {
        while (element.lastChild) {
            element.lastChild.remove();
        }
        element.textContent = '';
        return element;
    }
}

/**
 * Create elements conveniently
 * @param tag: String
 * @param content: Element|DocumentFragment|Iterable|String|HTMLCode|SVGCode
 * @param attributes: Object
 * @param style: Object
 * @param data: Object
 * @param aria: Object
 * @param events: Object
 * @param classNames: Array
 * @param isSvg: Boolean
 * @returns {HTMLElement}
 */
const create = function ({
    tag,
    content,
    attributes = {},
    style = {},
    data = {},
    aria = {},
    events = {},
    classNames = [],
    isSvg = false
} = {}) {
    const el = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', tag) : document.createElement(tag);
    // fix some common misconceptions
    new Map([
        ['class', 'className'],
        ['for', 'htmlFor'],
        ['tabindex', 'tabIndex'],
        ['nomodule', 'noModule'],
        ['contenteditable', 'contentEditable'],
        ['accesskey', 'accessKey']
    ]).forEach((right, wrong) => {
        if (typeof attributes[right] === 'undefined' && attributes[wrong]) {
            attributes[right] = attributes[wrong];
        }
        delete attributes[wrong];
    });

    if (attributes.style) {
        const styleAttr = {};
        attributes.style.split(';').forEach(rule => {
            const parts = rule.split(':').map(entry => entry.trim());
            styleAttr[parts[0]] = parts[1];
        })
        style = {
            ...styleAttr,
            ...style
        };
        delete attributes.style
    }

    for (let [key, value] of Object.entries(attributes)) {
        if (isSvg) {
            el.setAttributeNS(null, key, value.toString());
        } else if (value !== false) {
            el[key] = value;
        }
    }
    for (let [key, value] of Object.entries(aria)) {
        key = key === 'role' ? key : 'aria-' + key;
        el.setAttribute(key.toLowerCase(), value);
    }
    for (let [key, value] of Object.entries(data)) {
        value = value.toString();
        el.dataset[key] = value;
    }
    for (const [event, fn] of Object.entries(events)) {
        el.addEventListener(event, fn, false);
    }
    Object.assign(el.style, style);
    if (classNames.length) {
        el.classList.add(...classNames);
    }
    if (typeof content !== 'undefined') {
        el.append(obj.toNode(content));
    }
    return el;
};

/**
 * Dispatcher for `create()`, and all functions within {obj}
 */
module.exports = new Proxy(obj, {
    /**
     * Either build an element or retrieve one or multiple from the DOM
     * @param target
     * @param prop
     * @returns {function(): (*)}
     */
    get(target, prop) {
        return function () {
            const args = Array.from(arguments);
            if (Object.prototype.hasOwnProperty.call(target, prop) && target[prop] instanceof Function) {
                target[prop].bind(target);
                return target[prop].apply(null, args);
            }
            return create({
                ...{
                    tag: prop
                },
                ...args.shift()
            });
        }
    }
});