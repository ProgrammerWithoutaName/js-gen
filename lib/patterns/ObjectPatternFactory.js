'use strict';
const patternTypes = require('./patternTypes');
const renderHelperNodeTypes = require('../renderHelpers/renderHelperTypes').nodeTypes;
const comments =renderHelperNodeTypes.comments;
const sequence = renderHelperNodeTypes.sequence;

class ObjectPatternFactory {
    constructor(renderContainer) {
        this.nodeType = expressionTypes.nodeTypes.objectPattern;
        this.classification = expressionTypes.classification;
        this.renderContainer = renderContainer;
    }

    build(nodeDefinition) {
        let objectPatternRender = {
            defineRender: renderContext => {
                let renderTemplate = renderContext.addRenderTemplate({
                    //Note: not seeing where esprima notes the parens, so using these by default.
                    template: getTemplate(nodeDefinition),
                    newLine: nodeDefinition.relLoc.line > 0
                });

                renderTemplate.define({
                    name: 'properties',
                    renderDefinition: this.renderContainer.get(sequence).build(nodeDefinition.properties, objectIsMultiline(nodeDefinition))
                });

                renderTemplate.setRelativeLocation(nodeDefinition.relLoc);
            }
        };

        return this.renderContainer.get(comments).build(objectPatternRender);
    }

    getTemplate(nodeDefinition) {
        let template = `{${context.properties}}`;
        if(objectIsMultiline(nodeDefinition)) {
            template = context => `{
${context.newLineIndent}${context.properties}
}`;
        }

        return template;
    }

    objectIsMultiline(nodeDefinition) {
        let objectLoc = nodeDefinition.loc;
        let firstProperty = nodeDefinition.property[0];
        return firstProperty && objectLoc.line !== firstProperty.loc.line;
    }
}

module.exports =  ObjectPatternFactory;