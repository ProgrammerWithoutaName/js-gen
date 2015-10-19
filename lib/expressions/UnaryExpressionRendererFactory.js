'use strict';
const expressionTypes = require('./expressionTypes');
const comments = require('../renderHelpers/renderHelperTypes').nodeTypes.comments;

class UnaryExpressionRendererFactory {
    constructor(renderContainer) {
        this.nodeType = expressionTypes.nodeTypes.unaryExpression;
        this.classification = expressionTypes.classification;
        this.renderContainer = renderContainer;
    }

    build(nodeDefinition) {
        let unaryExpressionRender = {
            defineRender: renderContext => {
                let renderTemplate = renderContext.addRenderTemplate({
                    //Note: not seeing where esprima notes the parens, so using these by default.
                    template: context => `${nodeDefinition.operator}${context.argument}`,
                    newLine: nodeDefinition.relLoc.line > 0
                });

                renderTemplate.defineRenderNode({
                    name: 'argument',
                    nodeDefinition: nodeDefinition.argument
                });

                renderTemplate.setRelativeLocation(nodeDefinition.relLoc);
            }
        };

        return this.renderContainer.get(comments).build(unaryExpressionRender);
    }
}

module.exports =  UnaryExpressionRendererFactory;