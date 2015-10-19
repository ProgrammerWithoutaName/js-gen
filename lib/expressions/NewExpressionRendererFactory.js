'use strict';
const expressionTypes = require('./expressionTypes');
const comments = require('../renderHelpers/renderHelperTypes').nodeTypes.comments;
const callExpression = expressionTypes.nodeTypes.callExpression;

class NewExpressionRendererFactory {
    constructor(renderContainer) {
        this.nodeType = expressionTypes.nodeTypes.newExpression;
        this.classification = expressionTypes.classification;
        this.renderContainer = renderContainer;
    }

    build(nodeDefinition) {
        let newExpressionRender = {
            defineRender: renderContext => {
                let renderTemplate = renderContext.addRenderTemplate({
                    template: context => `new ${context.call}`,
                    newLine: nodeDefinition.relLoc.line > 0
                });

                renderTemplate.define({
                    name: 'call',
                    renderDefinition: this.renderContainer.get(call).build(nodeDefinition, false)
                });

                renderTemplate.setRelativeLocation(nodeDefinition.relLoc);
            }
        };

        return this.renderContainer.get(comments).build(newExpressionRender);
    }
}

module.exports =  NewExpressionRendererFactory;