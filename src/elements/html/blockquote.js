    
    /**
     * The `<blockquote>` HTML element indicates that the enclosed text is an extended quotation.
     * Usually, this is rendered visually by indentation (see Notes for how to change it). A URL
     * for the source of the quotation may be given using the cite attribute, while a text
     * representation of the source can be given using the cite element.
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
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote
     * @returns HTMLQuoteElement 
     */
    blockquote: ({
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
            tag: 'blockquote',
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