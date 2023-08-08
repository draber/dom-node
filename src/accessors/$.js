/**
 * Returns first element that matches CSS selector `selector`.
 * Querying can optionally be restricted to `container`’s descendants
 * @param {String} selector
 * @param {HTMLElement} container
 * @return {HTMLElement|null}
 * @see https://lea.verou.me/2015/04/jquery-considered-harmful/
 */
const $ = (selector, container = null) => {
    return typeof selector === "string"
        ? (container || document).querySelector(selector)
        : selector || null;
};

export default $;
