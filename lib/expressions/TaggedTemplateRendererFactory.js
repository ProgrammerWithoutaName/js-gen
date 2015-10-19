'use strict';
const expressionTypes = require('./expressionTypes');
const comments = require('../renderHelpers/renderHelperTypes').nodeTypes.comments;

class TaggedTemplateRendererFactory {
    constructor(renderContainer) {
        this.nodeType = expressionTypes.nodeTypes.taggedTemplateExpression;
        this.classification = expressionTypes.classification;
        this.renderContainer = renderContainer;
    }

    build(nodeDefinition) {
        let taggedTemplateRender = {
            defineRender: renderContext => {
                let renderTemplate = renderContext.addRenderTemplate({
                    template: context => `${context.tag}${context.quasi}`,
                    newLine: nodeDefinition.relLoc.line > 0
                });

                renderTemplate.defineRenderNode({
                    name: 'tag',
                    nodeDefinition: nodeDefinition.tag
                });

                renderTemplate.defineRenderNode({
                    name: 'quasi',
                    nodeDefinition: nodeDefinition.quasi
                });
            }
        };

        return this.renderContainer.get(comments).build(taggedTemplateRender);
    }
}

module.exports =  TaggedTemplateRendererFactory;