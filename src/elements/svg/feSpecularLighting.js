    
    /**
     * The `<feSpecularLighting>` SVG filter primitive lights a source graphic using the alpha
     * channel as a bump map. The resulting image is an RGBA image based on the light color. The
     * lighting calculation follows the standard specular component of the Phong lighting model.
     * The resulting image depends on the light color, light position and surface geometry of the
     * input bump map. The result of the lighting calculation is added. The filter primitive
     * assumes that the viewer is at infinity in the z direction.
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
     * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feSpecularLighting
     * @returns SVGFESpecularLightingElement 
     */
    feSpecularLighting: ({
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
            tag: 'feSpecularLighting',
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