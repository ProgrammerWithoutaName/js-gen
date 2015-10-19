'use strict';
const expressionTypes = require('./expressionTypes');
const comments = require('../renderHelpers/renderHelperTypes').nodeTypes.comments;

class YieldExpressionRendererFactory {
    constructor(renderContainer) {
        this.nodeType = expressionTypes.nodeTypes.yieldExpression;
        this.classification = expressionTypes.classification;
        this.renderContainer = renderContainer;
    }

    build(nodeDefinition) {
        let yieldExpressionRender = {
            defineRender: renderContext => {
                let renderTemplate = renderContext.addRenderTemplate({
                    //Note: not seeing where esprima notes the parens, so using these by default.
                    template: context => `yield ${context.argument}`,
                    newLine: nodeDefinition.relLoc.line > 0
                });

                this.buildArgumentRenderNode(nodeDefinition, renderTemplate);
                renderTemplate.setRelativeLocation(nodeDefinition.relLoc);
            }
        };

        return this.renderContainer.get(comments).build(yieldExpressionRender);
    }

    buildArgumentRenderNode(nodeDefinition, renderTemplate) {
        renderTemplate.defineRenderNode({
            name: 'argument',
            nodeDefinition: nodeDefinition.argument,
            prepend: nodeDefinition.delegate && (() => '*')
        });
    }
}

module.exports =  YieldExpressionRendererFactory;