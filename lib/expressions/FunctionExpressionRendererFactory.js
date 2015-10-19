'use strict';
const expressionTypes = require('./expressionTypes');
const renderHelperNodeTypes = require('../renderHelpers/renderHelperTypes').nodeTypes;
const comments = renderHelperNodeTypes.comments;
const computedExpression = renderHelperNodeTypes.computedExpression;

class FunctionExpressionRendererFactory {
    constructor(renderContainer) {
        this.nodeType = expressionTypes.nodeTypes.functionExpression;
        this.classification = expressionTypes.classification;
        this.renderContainer = renderContainer;
    }

    build(nodeDefinition, alternateDefinitionOptions) {
        alternateDefinitionOptions = alternateDefinitionOptions || {};
        let functionRender = {
            defineRender: renderContext => {
                let predefinition = getPredefinition(nodeDefinition);
                let generator = nodeDefinition.generator ? '*' : '';

                let renderTemplate = renderContext.addRenderTemplate({
                    template: context => `${predefinition}${generator}${context.id || ''} ${context.body}`,
                    newLine: nodeDefinition.relLoc.line > 0
                });

                addRenderTemplateId(nodeDefinition, alternateDefinitionOptions, renderTemplate);
                renderTemplate.defineRenderNode({
                    name: 'body',
                    nodeDefinition: nodeDefinition.body
                });

                renderTemplate.setRelativeLocation(nodeDefinition.relLoc);
            }
        };

        return this.renderContainer.get(comments).build(functionRender);
    }

    addRenderTemplateId(nodeDefinition, alternateDefinitionOptions, renderTemplate) {
        let id = nodeDefinition.id || alternateDefinitionOptions.id;
        if(alternateDefinitionOptions.computed) {
            renderTemplate.define({
                name: 'id',
                renderDefinition: this.renderContainer.get(computedExpression).build(id)
            });
        } else if(id) {
            renderTemplate.defineRenderNode({
                name: 'id',
                nodeDefinition: id
            });
        }
    }

    getPredefinition (alternateDefinitionOptions) {
        if(alternateDefinitionOptions.kind === 'get' || alternateDefinitionOptions.kind === 'set') {
            return alternateDefinitionOptions.kind + ' ';
        }
        if(alternateDefinitionOptions.method) {
            return '';
        }
        return 'function ';
    }

}

module.exports =  FunctionExpressionRendererFactory;