'use strict';
const expressionTypes = require('./expressionTypes');
const comments = require('../renderHelpers/renderHelperTypes').nodeTypes.comments;
const quoteRules = require('../renderRules/quoteRules');

const quoteRegex = {
    single: value => value.match(/[^\\]?'/gi),
    double: value => value.match(/[^\\]?"/gi)
};

const quoteDetection = {
    single: value => value.match(quoteRegex.single),
    double: value => value.match(quoteRegex.double)
};

const escapeQuotes = {
    single: value => value.replace(quoteRegex.single,"\\'"),
    double: value => value.replace(quoteRegex.double,'\\"')
};

class LiteralRendererFactory {
    constructor(renderContainer) {
        this.nodeType = expressionTypes.nodeTypes.literal;
        this.classification = expressionTypes.classification;
        this.renderContainer = renderContainer;
    }

    build (nodeDefinition) {
        let literalRender = {
            defineRender: renderContext => {
                let renderTemplate = renderContext.addRenderTemplate({
                    template: getTemplate(nodeDefinition),
                    newLine: nodeDefinition.relLoc.line > 0
                });
                renderTemplate.setRelativeLocation(nodeDefinition.relLoc);
            }
        };
        return this.renderContainer.get(comments).build(nodeDefinition, literalRender);
    }

    getTemplate(literalDefinition) {
        if(literalDefinition.raw) { return () => literalDefinition.raw; }
        if(literalDefinition.value === null) { return () => 'null'; }
        if(literalDefinition.regex) { return () => renderRegex(literalDefinition.regex); }
        if(typeof literalDefinition.value === 'string') {
            return () => renderString(literalDefinition.value);
        }
        return () => literalDefinition.value.toString();
    }

    renderRegex(regex) { return `/${regex.pattern}/${regex.flags}`; }

    renderString(value) {
        if(quoteRules.quoteType === 'single') {
            this.renderSingleQuotePreference(value);
        } else {
            this.renderDoubleQuotePreference(value);
        }
    }

    renderSingleQuotePreference(value) {
        let hasUnescapedSingleQuotes = quoteDetection.single(value);
        let hasUnescapedDoubleQuotes = quoteDetection.double(value);

        if(hasUnescapedSingleQuotes && hasUnescapedDoubleQuotes) {
            return `'${escapeQuotes.single(value)}'`;
        }
        if(hasUnescapedSingleQuotes) {
            return `"${value}"`;
        }
        return `'${value}'`;
    }

    renderDoubleQuotePreference(value) {
        let hasUnescapedSingleQuotes = quoteDetection.single(value);
        let hasUnescapedDoubleQuotes = quoteDetection.double(value);

        if(hasUnescapedSingleQuotes && hasUnescapedDoubleQuotes) {
            return `"${escapeQuotes.double(value)}"`;
        }
        if(hasUnescapedDoubleQuotes) {
            return `'${value}'`;
        }
        return `"${value}"`;
    }
}

module.exports = LiteralRendererFactory;