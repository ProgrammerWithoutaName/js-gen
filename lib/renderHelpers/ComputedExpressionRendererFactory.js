'use strict';
const renderHelperTypes = require('./renderHelperTypes');

class ComputedExpressionRendererFactory {
    constructor (renderContainer) {
        this.nodeType = renderHelperTypes.nodeTypes.computedExpression;
        this.classification = renderHelperTypes.classification;
        this.renderContainer = renderContainer.computedExpression;
    }

    build(nodeDefinition) {
        return {
            defineRender: renderContext => {
                let renderTemplate = renderContext.addRenderTemplate({
                    template: context => `[${context.expression}]`,
                    newLine: nodeDefinition.relLoc.line > 0
                });
                renderTemplate.defineRenderNode({
                    name: 'expression',
                    nodeDefinition: nodeDefinition
                });
                renderTemplate.setRelativeLocation(nodeDefinition.relLoc);
            }
        };
    }
}

module.exports = ComputedExpressionRendererFactory;