    
    /**
     * The `<u>` HTML element represents a span of inline text which should be rendered in a way
     * that indicates that it has a non-textual annotation. This is rendered by default as a
     * simple solid underline, but may be altered using CSS.
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
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/u
     * @returns HTMLElement 
     */
    u: ({
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
            tag: 'u',
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