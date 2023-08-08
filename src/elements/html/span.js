    
    /**
     * The `<span>` HTML element is a generic inline container for phrasing content, which does
     * not inherently represent anything. It can be used to group elements for styling purposes
     * (using the class or id attributes), or because they share attribute values, such as lang.
     * It should be used only when no other semantic element is appropriate. `<span>` is very
     * much like a div element, but div is a block-level element whereas a `<span>` is an inline
     * element.
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
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span
     * @returns HTMLSpanElement 
     */
    span: ({
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
            tag: 'span',
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