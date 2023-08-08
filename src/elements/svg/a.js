    
    /**
     * The \<a> SVG element creates a hyperlink to other web pages, files, locations in the same
     * page, email addresses, or any other URL. It is very similar to HTML's a element.
     * @param obj
     * @param {Element|DocumentFragment|Iterable|String|HTMLCode|SVGCode} [obj.content]
     * @param {Object} [obj.attributes={}] Attributes and properties
     * @param {Object} [obj.style={}] Styles
     * @param {Object} [obj.data={}] Data attributes
     * @param {Object} [obj.aria={}] ARIA attributes
     * @param {Object} [obj.events={}] Event listeners as closures with the event name as key
     * @param {Array} [obj.classNames=[]] CSS classes
     * @param {Boolean} [obj.isSvg=false] Whether the element is an SVG element
     * @memberof SVG
     * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/a
     * @returns SVGAElement 
     */
    a: ({
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
            tag: 'a',
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