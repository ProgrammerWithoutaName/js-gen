'use strict';
const expressionTypes = require('./expressionTypes');
const helperTypes = require('../renderHelpers/renderHelperTypes').nodeTypes;
const patternTypes = require('./patternTypes');
const arrayRules = require('../renderRules/arrayRules');

const sequence = helperTypes.sequence;
const comments = helperTypes.comments;

const arrayTemplates = {
    space: context => `[ ${context.elements} ]`,
    noSpace: context => `[${context.elements}]`,
    multiline: `[
${context.elements}
${context.newLineIndent}]`
};

class ArrayPatternFactory {
    constructor(renderContainer) {
        this.nodeType = patternTypes.nodeTypes.arrayPattern;
        this.classification = patternTypes.classification;
        this.renderContainer = renderContainer;
    }

    build (nodeDefinition) {
        let arrayRenderer = {
            defineRender: renderContext => {
                let multiline = this.arrayIsMuliline(nodeDefinition);
                let sequenceRenderer = this.renderContainer.get(sequence).build(nodeDefinition.elements, multiline);

                let templateRender = renderContext.addRenderTemplate({
                    template: getRenderTemplate (multiline),
                    newLine: multiline
                });

                templateRender.define({
                    name: 'elements',
                    renderDefinition: sequenceRenderer
                });

                templateRender.setRelativeLocation(nodeDefinition.relLoc);
            }
        };

        return this.renderContainer.get(comments).build(nodeDefinition, arrayRenderer);
    }

    arrayIsMuliline(arrayExpressionDefinition) {
        return arrayExpressionDefinition.loc.start.line !== arrayExpressionDefinition.loc.end.line;
    }

    getRenderTemplate(multiline) {
        let template;

        if(multiline) {
            template = arrayTemplates.multiline;
        } else {
            template = arrayRules.useSpacesBetweenBrackets ? arrayTemplates.space : arrayTemplates.noSpace;
        }

        return template;
    }
}

module.exports = ArrayPatternFactory;