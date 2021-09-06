const fn = require('../src/server');
const console = require('a-nicer-console');

const dummies = {
    text: 'random text',
    htmlString: '<div><em>Random</em> <strong><a href="#">Text</a></div>',
    htmlElem: (() => {
        return fn.div({
            classNames: ['random-element']
        })
    })(),
    svgString: '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="20"></circle></svg>',
    svgElem: (() => {
        const svg = fn.svg({
            attributes: {
                viewBox: '0 0 100 100'
            },
            isSvg: true
        });
        const circle = fn.circle({
            attributes: {
                cx: 50,
                cy: 50,
                r: 50
            },
            isSvg: true
        })
        svg.append(circle);
        return svg;
    })(),    
    classNames: ['arrCN_1', 'arrCN_2'],
    class: 'attrCls_1 attrCls_2',
    className: 'attrCn_1 attrCn_3'
}

// test cases

const tests = {};

/**
 * @returns {String} <div></div>
 */
tests.htmlElement = () => {
    return fn.div().outerHTML;
}

/**
 * @returns {String} <div><em>Random</em> <strong><a href="#">Text</a></strong></div>
 */
tests.htmlElementFromString = () => {
    const div = fn.div();
    div.append(fn.toNode(dummies.htmlString));
    return div.innerHTML;
}

/**
 * @returns {String} <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
 */
tests.svgElement = () => {
    return dummies.svgElem.outerHTML;
}

/**
 * @returns {String} <svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="20"></circle></svg>
 */
tests.svgElementFromString = () => {
    const div = fn.div();
    div.append(fn.toNode(dummies.svgString));
    return div.innerHTML;
}

/**
 * @returns {String} <div>random text</div>
 */
tests.contentFromText = () => {
    return fn.div({
        content: dummies.text
    }).outerHTML;
}

/**
 * @returns {String} <div><div class="random-element"></div></div>
 */
tests.contentFromHtmlElement = () => {
    return fn.div({
        content: dummies.htmlElem
    }).outerHTML;
}

/**
 * @returns {String} <div><div><em>Random</em> <strong><a href="#">Text</a></strong></div></div>
 */
tests.contentFromHtmlString = () => {
    return fn.div({
        content: dummies.htmlString
    }).outerHTML;
}

/**
 * @returns {String} <div><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg></div>
 */
tests.contentFromSvgElement = () => {
    return fn.div({
        content: dummies.svgElem
    }).outerHTML;
}

/**
 * @returns {String} <div><svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="20"></circle></svg></div>
 */
tests.contentFromSvgString = () => {
    return fn.div({
        content: dummies.svgString
    }).outerHTML;
}

/**
 * @returns {String} <div>random text<div class="random-element"></div><div><em>Random</em> <strong><a href="#">Text</a></strong></div><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg><svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="20"></circle></svg></div>
 */
tests.contentFromMixedArray = () => {
    return fn.div({
        content: [
            dummies.text,
            dummies.htmlElem,
            dummies.htmlString,
            dummies.svgElem,
            dummies.svgString,
        ]
    }).outerHTML;
}

/**
 * @returns {String} <div><div><div><div><div><div></div></div></div></div></div></div>
 */
tests.contentFromNestedElements = () => {
    return fn.div({
        content: fn.div({
            content: fn.div({
                content: fn.div({
                    content: fn.div({
                        content: fn.div()
                    })
                })
            })
        })
    }).outerHTML;
}

/**
 * @returns {String} <label class="class-property" for="input" tabindex="5" accesskey="l" style="border: 3px solid blue;"></label>
 */
tests.fixBadAttributes = () => {
    return fn.label({
        attributes: {
            tabindex: 5,
            for: 'input',
            accesskey: 'l',
            style: 'border: 1px red solid; border: 3px blue solid',
            class: 'class-property'
        }
    }).outerHTML;
}

/**
 * @returns {String} <div id="bar" role="presentation" aria-hidden="false" data-foo="42" style="border: 2px dotted green;" class="foo bar" tabindex="2">random text</div>
 */
tests.allProps = () => {
    const div = fn.div({
        classNames: ['foo', 'bar'],
        attributes: {
            name: 'foo',
            id: 'bar'
        },
        style: {
            border: '2px green dotted'
        },
        data: {
            foo: 42
        },
        aria: {
            role: 'presentation',
            hidden: false
        },
        events: {
            click: evt => evt.target.tabIndex = 2
        },
        content: dummies.text
    })
    div.click();
    return div.outerHTML;
}

/**
 * @returns {String} <div></div>
 */
tests.select = () => {
    const body = fn.empty(fn.$('body'));
    const div = fn.div();
    body.append(div);
    return fn.$('div').outerHTML;
}

/**
 * @returns {Number} 3
 */
tests.selectAll = () => {
    const body = fn.empty(fn.$('body'));
    const div1 = fn.div();
    const div2 = fn.div();
    const div3 = fn.div();
    body.append(div1, div2, div3);
    return fn.$$('div').length;
}

/**
 * @returns {String} <div class="attrCn_1 attrCn_3 arrCN_1 arrCN_2"></div>
 */
tests.classNamesAndAttrClassName = () => {
    return fn.div({
        classNames: dummies.classNames,
        attributes: {
            className: dummies.className
        } 
    }).outerHTML;
}

/**
 * @returns {String} <label class="attrCls_1 attrCls_2" for="from-for" accesskey="a"></label>
 */
tests.ambigiousAttributes = () => {
    return fn.label({
        attributes: {
            class: dummies.class,
            accesskey: 'a',
            for: 'from-for'
        } 
    }).outerHTML;
}

/**
 * @returns {String} <label class="attrCn_1 attrCn_3" accesskey="p" for="from-htmlFor"></label>
 */
tests.ambigiousProperties = () => {
    return fn.label({
        attributes: {
            className: dummies.className,
            accessKey: 'p',
            htmlFor: 'from-htmlFor'
        } 
    }).outerHTML;
}

/**
 * @returns {String} <label class="attrCn_1 attrCn_3" accesskey="p" for="from-htmlFor"></label>
 */
tests.propertiesOverAttributes = () => {
    return fn.label({
        attributes: {
            class: dummies.class,
            className: dummies.className,
            accesskey: 'a',
            accessKey: 'p',
            for: 'from-for',
            htmlFor: 'from-htmlFor'
        } 
    }).outerHTML;
}

const cases = {
    htmlElement: "<div></div>",
    htmlElementFromString: "<div><em>Random</em> <strong><a href=\"#\">Text</a></strong></div>",
    svgElement: "<svg viewBox=\"0 0 100 100\"><circle cx=\"50\" cy=\"50\" r=\"50\"></circle></svg>",
    svgElementFromString: "<svg viewBox=\"0 0 40 40\"><circle cx=\"20\" cy=\"20\" r=\"20\"></circle></svg>",
    contentFromText: "<div>random text</div>",
    contentFromHtmlElement: "<div><div class=\"random-element\"></div></div>",
    contentFromHtmlString: "<div><div><em>Random</em> <strong><a href=\"#\">Text</a></strong></div></div>",
    contentFromSvgElement: "<div><svg viewBox=\"0 0 100 100\"><circle cx=\"50\" cy=\"50\" r=\"50\"></circle></svg></div>",
    contentFromSvgString: "<div><svg viewBox=\"0 0 40 40\"><circle cx=\"20\" cy=\"20\" r=\"20\"></circle></svg></div>",
    contentFromMixedArray: "<div>random text<div class=\"random-element\"></div><div><em>Random</em> <strong><a href=\"#\">Text</a></strong></div><svg viewBox=\"0 0 100 100\"><circle cx=\"50\" cy=\"50\" r=\"50\"></circle></svg><svg viewBox=\"0 0 40 40\"><circle cx=\"20\" cy=\"20\" r=\"20\"></circle></svg></div>",
    contentFromNestedElements: "<div><div><div><div><div><div></div></div></div></div></div></div>",
    fixBadAttributes: "<label class=\"class-property\" for=\"input\" tabindex=\"5\" accesskey=\"l\" style=\"border: 3px solid blue;\"></label>",
    allProps: "<div id=\"bar\" role=\"presentation\" aria-hidden=\"false\" data-foo=\"42\" style=\"border: 2px dotted green;\" class=\"foo bar\" tabindex=\"2\">random text</div>",
    select: "<div></div>",
    selectAll: 3,
    classNamesAndAttrClassName: '<div class="attrCn_1 attrCn_3 arrCN_1 arrCN_2"></div>',
    ambigiousAttributes: '<label class="attrCls_1 attrCls_2" for="from-for" accesskey="a"></label>',
    ambigiousProperties: '<label class="attrCn_1 attrCn_3" accesskey="p" for="from-htmlFor"></label>',
    propertiesOverAttributes: '<label class="attrCn_1 attrCn_3" accesskey="p" for="from-htmlFor"></label>'
}

const success = {};
const failures = {};

for (let [fn, expected] of Object.entries(cases)) {
    const entry = {
        expected,
        result: tests[fn]()
    }
    if (entry.result === entry.expected) {
        success[fn] = entry;
    } else {
        failures[fn] = entry;
    }
}

const caseCnt = Object.keys(success).length;
const successCnt = Object.keys(success).length;
const failureCnt = Object.keys(failures).length;

if (failureCnt) {
    console.error(`${failureCnt}/${caseCnt} tests failed:\n`);
    for (let [fn, entry] of Object.entries(failures)) {
        console.log(`test.${fn}()`);
        console.info(`Exp: ${entry.expected}`);
        console.error(`Got: ${entry.result}\n`);
    }
}

if (successCnt) {
    console.success(`${successCnt}/${caseCnt} tests passed:\n`);
    Object.keys(success).forEach(fn => {        
        console.success(`test.${fn}() ✔`);
    })
}