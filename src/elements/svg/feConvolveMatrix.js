    
    /**
     * The `<feConvolveMatrix>` SVG filter primitive applies a matrix convolution filter effect.
     * A convolution combines pixels in the input image with neighboring pixels to produce a
     * resulting image. A wide variety of imaging operations can be achieved through
     * convolutions, including blurring, edge detection, sharpening, embossing and beveling.
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
     * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feConvolveMatrix
     * @returns SVGFEConvolveMatrixElement 
     */
    feConvolveMatrix: ({
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
            tag: 'feConvolveMatrix',
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