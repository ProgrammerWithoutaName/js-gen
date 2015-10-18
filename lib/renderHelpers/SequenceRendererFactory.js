'use strict';
/* note: could pull in sequence and use non standard??*/

const renderHelperTypes = require('./renderHelperTypes');
const commaRules = require('../renderRules/commaRules');

const commaSpaceFormat = {
    before: commaRules.spaceBeforeComma ? ' ' : '',
    after: commaRules.spaceAfterComma ? ' ' : ''
};

const newlineComma = commaRules.appendCommaWhenMultiline ? `${commaSpaceFormat.after},\n` : `\n,${commaSpaceFormat.before}`;

const spaceExists = {
    atStartOf: code => code[0].search(/^\s/gi) >= 0,
    atEndOf: code => !!code[code.length-1] && code[code.length-1].search(/\s$/gi) >= 0
};

class SequenceRendererFactory {
    constructor(renderContainer) {
        this.nodeType = renderHelperTypes.nodeTypes.sequence;
        this.classification = renderHelperTypes.classification;
        this.renderContainer = renderContainer;
    }

    build(nodeDefinitions, useNewLines) {
        let prependCallback = getPrependCallback(useNewLines);
        let appendCallback = getAppendCallback(useNewLines);

        return {
            defineRender: renderContext => {
                nodeDefinitions.forEach((nodeDefinition, index) => {
                    let renderOptions = {nodeDefinition, renderContext};
                    renderOptions.prependCallback = getPrependCallback(useNewLines, index === 0);
                    renderOptions.appendCallback = getAppendCallback(useNewLines, index >= nodeDefinitions.length - 1);
                    addExpressionTemplateToRenderContext({nodeDefinition, renderContext, appendCallback, prependCallback});
                });
            }
        };
    }

    addExpressionTemplateToRenderContext(options) {
        let renderTemplate = options.renderContext.addRenderTemplate({ template: context => context.expression });
        renderTemplate.define({
            name: 'expression',
            renderDefinition: this.renderContainer.get(options.nodeDefinition.type).build(options.nodeDefinition),
            prependCallback: options.prependCallback,
            appendCallback: options.appendCallback
        });
        renderTemplate.setRelativeLocation(options.nodeDefinition.relLoc);
    }

    getPrependCallback(useNewLines, isFirstLine) {
        if(!isFirstLine && useNewLines && !commaRules.appendCommaWhenMultiline) {
            return renderNewLineComma;
        }
        return undefined;
    }

    getAppendCallback(useNewLines, isLastLine) {
        if(isLastLine) {
            return undefined;
        }
        if(!useNewLines) {
            return renderComma;
        }
        if(commaRules.appendCommaWhenMultiline) {
            return renderNewLineComma;
        }
        return undefined;
    }

    renderNewLineComma(rawCode) {
        let before = spaceExists.atStartOf(rawCode) ? 0 : commaSpaceFormat.before;
        let after = spaceExists.atEndOf(rawCode) ? 0 : commaSpaceFormat.after;
        return commaRules.appendCommaWhenMultiline ? `${before},` : `,${after}`
    }

    renderComma(expression) {
        let before = spaceExists.atStartOf(expression.code) ? 0 : commaSpaceFormat.before;
        let after = spaceExists.atEndOf(expression.code) ? 0 : commaSpaceFormat.after;
        return `${before},${after}`;
    }
}

module.exports = SequenceRendererFactory;

//curly
//dot-location
//eol-last
//array-bracket-spacing
//block-spacing
//brace-style
//indent
//lines-around-comments
//no-scaped-function
//quotePreference
//semi-spacing


// comma-spacing
// comma-style
// comma-dangle
/*
 space-after-keywords
 space-before-blocks
 space-before-function-paren
 space-before-keywords
 space-in-parens
 space-infix-ops
 space-return-throw-case
 space-unary-ops
 spaced-comment
 wrap-regex
 arrow-parens ( requires parens in arrow calls );
 arrow-spacing
 generator-star-spacing

 */

// get comma rules here:
