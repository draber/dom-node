    
    /**
     * The `<track>` HTML element is used as a child of the media elements, audio and video. It
     * lets you specify timed text tracks (or time-based data), for example to automatically
     * handle subtitles. The tracks are formatted in WebVTT format (`.vtt` files) — Web Video
     * Text Tracks.
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
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track
     * @returns HTMLTrackElement 
     */
    track: ({
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
            tag: 'track',
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