'use strict';
const expressionTypes = require('./expressionTypes');
const renderHelperNodeTypes = require('../renderHelpers/renderHelperTypes').nodeTypes;
const comments = renderHelperNodeTypes.comments;
const parameters = renderHelperNodeTypes.parameters;

class CallExpressionRendererFactory {
    constructor(renderContainer) {
        this.nodeType = expressionTypes.nodeTypes.callExpression;
        this.classification = expressionTypes.classification;
        this.renderContainer = renderContainer;
    }

    build(nodeDefinition) {
        let callExpressionRender =  {
            defineRender: renderContext => {
                let templateRender = renderContext.addRenderTemplate({
                    template: context => `${context.callee}(${context.arguments})`,
                    newLine: nodeDefinition.relLoc.line > 0
                });

                templateRender.define({
                    name: 'callee',
                    renderDefinition: this.renderContainer.get(nodeDefinition.callee.type).build(nodeDefinition.callee)
                });

                templateRender.define({
                    name: 'arguments',
                    renderDefinition: this.renderContainer.get(parameters).build(nodeDefinition.arguments)
                });

                templateRender.setRelativeLocation(nodeDefinition.relLoc);
            }
        };

        return this.renderContainer.get(comments).build(nodeDefinition, callExpressionRender);
    }
}

module.exports = CallExpressionRendererFactory;