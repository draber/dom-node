    
    /**
     * The `<header>` HTML element represents introductory content, typically a group of
     * introductory or navigational aids. It may contain some heading elements but also a logo, a
     * search form, an author name, and other elements.
     * @param obj
     * @param {Element|DocumentFragment|Iterable|String|HTMLCode|SVGCode} [obj.content]
     * @param {Object} [obj.attributes={}] Attributes and properties
     * @param {Object} [obj.style={}] Styles
     * @param {Object} [obj.data={}] Data attributes
     * @param {Object} [obj.aria={}] ARIA attributes
     * @param {Object} [obj.events={}] Event listeners as closures with the event name as key
     * @param {Array} [obj.classNames=[]] CSS classes
     * @param {Boolean} [obj.isSvg=false] Whether the element is an SVG element
     * @memberof HTML
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header
     * @returns HTMLElement 
     */
    header: ({
        content,
        attributes = {},
        style = {},
        data = {},
        aria = {},
        events = {},
        classNames = [],
        isSvg = false,
    } = {}) => {
        return create({
            tag: 'header',
            content,
            attributes,
            style,
            data,
            aria,
            events,
            classNames,
            isSvg
    	});
    }