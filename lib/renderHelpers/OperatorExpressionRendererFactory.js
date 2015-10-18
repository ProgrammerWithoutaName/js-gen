'use strict';
const renderHelperTypes = require('./renderHelperTypes');


class OperatorExpressionRendererFactory {
    constructor(renderContainer) {
        this.nodeType = expressionTypes.nodeTypes.operatorExpression;
        this.classification = expressionTypes.classification;
        this.renderContainer = renderContainer;
    }

    build(nodeDefinition) {
        return {
            defineRender: renderContext => {
                let templateRender = renderContext.addRenderTemplate({
                    template: context => `${context.left} ${nodeDefinition.operator} ${context.right}`,
                    newLine: nodeDefinition.relLoc.line > 0
                });

                templateRender.define({
                    name: 'left',
                    renderDefinition: this.renderContainer.get(nodeDefinition.left.type).build(nodeDefinition.left)
                });

                templateRender.define({
                    name: 'right',
                    renderDefinition: this.renderContainer.get(nodeDefinition.right.type).build(nodeDefinition.right)
                });

                templateRender.setRelativeLocation(nodeDefinition.relLoc);
            }
        };
    }
}

module.exports = OperatorExpressionRendererFactory;