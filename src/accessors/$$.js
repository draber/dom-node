/**
 * Returns all elements that match CSS selector `selector` as an array.
 * Querying can optionally be restricted to `container`’s descendants
 * @param {String} selector
 * @param {HTMLElement} container
 * @return {Array}
 * @see https://lea.verou.me/2015/04/jquery-considered-harmful/
 */
const $$ = (selector, container = null) => {
    return [].slice.call((container || document).querySelectorAll(selector));
};

export default $$;
