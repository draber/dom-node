    
    /**
     * The `<summary>` HTML element specifies a summary, caption, or legend for a details
     * element's disclosure box. Clicking the `<summary>` element toggles the state of the parent
     * `<details>` element open and closed.
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
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary
     * @returns HTMLElement 
     */
    summary: ({
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
            tag: 'summary',
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