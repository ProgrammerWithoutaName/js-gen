'use strict';
const expressionTypes = require('./expressionTypes');
const comments = require('../renderHelpers/renderHelperTypes').nodeTypes.comments;

class ConditionalExpressionRendererFactory {
    constructor(renderContainer) {
        this.nodeType = expressionTypes.nodeTypes.conditionalExpression;
        this.classification = expressionTypes.classification;
        this.renderContainer = renderContainer;
    }

    build(nodeDefinition) {
        let conditionalExpressionRender = {
            defineRender: renderContext => {
                let renderTemplate = renderContext.addRenderTemplate({
                    //Note: not seeing where esprima notes the parens, so using these by default.
                    template: context => `(${context.test}) ? ${context.consequent} : ${context.alternate}`,
                    newLine: nodeDefinition.relLoc.line > 0
                });

                renderTemplate.defineRenderNode({
                    name: 'test',
                    nodeDefinition: nodeDefinition.test
                });

                renderTemplate.defineRenderNode({
                    name: 'consequent',
                    nodeDefinition: nodeDefinition.consequent
                });

                renderTemplate.defineRenderNode({
                    name: 'alternate',
                    nodeDefinition: nodeDefinition.alternate
                });

                renderTemplate.setRelativeLocation(nodeDefinition.relLoc);
            }
        };

        return this.renderContainer.get(comments).build(conditionalExpressionRender);
    }
}

module.exports =  ConditionalExpressionRendererFactory;