'use strict';
const expressionTypes = require('./expressionTypes');
const comments = require('../renderHelpers/renderHelperTypes').nodeTypes.comments;

class MemberExpressionRendererFactory {
    constructor(renderContainer) {
        this.nodeType = expressionTypes.nodeTypes.memberExpression;
        this.classification = expressionTypes.classification;
        this.renderContainer = renderContainer;
    }

    build(nodeDefinition) {
        let memberExpressionRender = {
            defineRender: renderContext => {
                let renderTemplate = renderContext.addRenderTemplate({
                    template: getRenderTemplate(nodeDefinition),
                    newLine: nodeDefinition.relLoc.line > 0
                });

                renderTemplate.defineRenderNode({
                    name: 'object',
                    nodeDefinition: nodeDefinition.object
                });

                renderTemplate.defineRenderNode({
                    name: 'property',
                    nodeDefinition: nodeDefinition.property
                });

                renderTemplate.setRelativeLocation(nodeDefinition.relLoc);
            }
        };

        return this.renderContainer.get(comments).build(memberExpressionRender);
    }

    getRenderTemplate(nodeDefinition) {
        if(nodeDefinition.computed) {
            return context => `${context.object}[${context.property}]`;
        } else {
            return context => `${context.object}.${context.property}`;
        }
    }
}

module.exports =  MemberExpressionRendererFactory;