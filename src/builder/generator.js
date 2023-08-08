import fs from "fs-extra";
import html from "../elements/listing/html.json" assert { type: "json" };
import svg from "../elements/listing/svg.json" assert { type: "json" };

const elements = { html, svg };

const templates = {
    fn: `function.tpl`,
    fnWrapper: `fn-wrapper.tpl`,
    dtsWrapper: `dts-wrapper.tpl`,
    dtsDeclaration: `dts-declaration.tpl`,
    import: `import.tpl`,
    export: `export.tpl`
};

for (let [key, value] of Object.entries(templates)) {
    templates[key] = fs.readFileSync(
        `${process.cwd()}/src/templates/${value}`,
        "utf8"
    );
}

const declarations = [];
const functions = [];
// const protectedNames = [
//     'var',
//     'switch'
// ];

for(let [type, tags] of Object.entries(elements)) {
    const imports = [];
    for(let [tag, properties] of Object.entries(tags)) {

        if(['switch', 'var'].includes(tag)) {
            continue;
        }
    
        let description = properties.description.replace(/(.{1,90})(?:\n|$| )/g, "$1\n     * ").slice(0, -3).trim();
        const replacers = {
            tag,
            type,
            TYPE: type.toUpperCase(),
            interface: properties.interface,
            description,
            see: `https://developer.mozilla.org/en-US/docs/Web/${type.toUpperCase()}/Element/${tag}`
        };
        const localTemplates = structuredClone(templates);
        for (let [key, value] of Object.entries(localTemplates)) {
            localTemplates[key] = value.replace(/({{([\w]+)}})/g, function(full, outer, inner)  {
                return replacers[inner];
            });
        }
        fs.outputFileSync(`${process.cwd()}/src/elements/${type}/${tag}.js`, localTemplates.fn);
        declarations.push(localTemplates.dtsDeclaration);
        functions.push(localTemplates.fn);
        imports.push(localTemplates.import);
    }
    // const exports = `/** @namespace ${type.toUpperCase()} */\n` + templates.export.replace('{{exports}}', tags.join(",\n    "));
    // fs.outputFileSync(`${process.cwd()}/src/elements/${type}.js`, `${imports.join('\n')}\n${exports}`);
}

fs.outputFileSync(`${process.cwd()}/src/index.d.ts`, templates.dtsWrapper.replace('{{declarations}}', declarations.join('\n')));
fs.outputFileSync(`${process.cwd()}/src/index.js`, templates.fnWrapper.replace('{{functions}}', functions.join(',\n')));

