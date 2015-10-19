'use strict';
const expressionTypes = require('./expressionTypes');
const comments = require('../renderHelpers/renderHelperTypes').nodeTypes.comments;

class UpdateExpressionRendererFactory {
    constructor(renderContainer) {
        this.nodeType = expressionTypes.nodeTypes.updateExpression;
        this.classification = expressionTypes.classification;
        this.renderContainer = renderContainer;
    }

    build(nodeDefinition) {
        let updateExpressionRender = {
            defineRender: renderContext => {
                let renderTemplate = renderContext.addRenderTemplate({
                    //Note: not seeing where esprima notes the parens, so using these by default.
                    template: getTemplate(nodeDefinition),
                    newLine: nodeDefinition.relLoc.line > 0
                });

                renderTemplate.defineRenderNode({
                    name: 'argument',
                    nodeDefinition: nodeDefinition.argument
                });

                renderTemplate.setRelativeLocation(nodeDefinition.relLoc);
            }
        };

        return this.renderContainer.get(comments).build(updateExpressionRender);
    }

    getTemplate(nodeDefinition) {
        if(nodeDefinition.prefix) {
            return context => `${nodeDefinition.operator}${context.argument}`;
        } else {
            return context => `${context.argument}${nodeDefinition.operator}`;
        }
    }
}

module.exports =  UpdateExpressionRendererFactory;