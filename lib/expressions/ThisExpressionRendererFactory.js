'use strict';
const expressionTypes = require('./expressionTypes');
const comments = require('../renderHelpers/renderHelperTypes').nodeTypes.comments;

class ThisExpressionRendererFactory {
    constructor(renderContainer) {
        this.nodeType = expressionTypes.nodeTypes.thisExpression;
        this.classification = expressionTypes.classification;
        this.renderContainer = renderContainer;
    }

    build(nodeDefinition) {
        let thisExpressionRender = {
            defineRender: renderContext => {
                let renderTemplate = renderContext.addRenderTemplate({
                    template: context => `this`,
                    newLine: nodeDefinition.relLoc.line > 0
                });

                renderTemplate.setRelativeLocation(nodeDefinition.relLoc);
            }
        };

        return this.renderContainer.get(comments).build(thisExpressionRender);
    }
}

module.exports =  ThisExpressionRendererFactory;