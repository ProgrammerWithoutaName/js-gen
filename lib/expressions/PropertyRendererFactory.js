'use strict';
const expressionTypes = require('./expressionTypes');
const functionExpression = expressionTypes.nodeTypes.functionExpression;
const renderHelperNodeTypes = require('../renderHelpers/renderHelperTypes').nodeTypes;
const comments = renderHelperNodeTypes.comments;
const computedExpression = renderHelperNodeTypes.computedExpression;

class PropertyRendererFactory {
    constructor(renderContainer) {
        this.nodeType = expressionTypes.nodeTypes.property;
        this.classification = expressionTypes.classification;
        this.renderContainer = renderContainer;
    }

    build(nodeDefinition) {
        let propertyRender = {
            defineRender: renderContext => {
                let renderOptions = { renderContext, nodeDefinition };
                if(nodeDefinition.shorthand) {
                    this.addShorthandRenderTemplate(renderOptions);
                } else if (nodeDefinition.kind == 'get' || nodeDefinition.kind == 'set' || nodeDefinition.method) {
                    this.addShortFunctionRenderTemplate(renderOptions);
                } else {
                    this.addBasicPropertyTemplate(renderOptions);
                }
            }
        };

        return this.renderContainer.get(comments).build(propertyRender);
    }

    addBasicPropertyTemplate(options) {

        let renderTemplate = options.renderContainer.addRenderTemplate({
            template: context => `${key}: ${value}`,
            newLine: options.nodeDefinition.relLoc.line > 0
        });

        renderTemplate.defineRenderNode({
            name: 'value',
            nodeDefinition: options.nodeDefinition.value
        });

        this.addKeyRenderDefinition(renderTemplate, options.nodeDefinition);
        renderTemplate.setRelativeLocation(options.nodeDefinition.relLoc);
    }

    addKeyRenderDefinition(renderTemplate, nodeDefinition) {
        if(nodeDefinition.computed) {
            renderTemplate.defineRender({
                name: 'key',
                renderDefinition: this.renderContainer.get(computedExpression).build(nodeDefinition.value)
            });
        } else {
            renderTemplate.defineRenderNode({
                name: 'key',
                nodeDefinition: nodeDefinition.value
            });
        }
    }

    addShortFunctionRenderTemplate(options) {
        let renderTemplate = options.renderContainer.addRenderTemplate({
            template: context => context.functionDefinition,
            newLine: options.nodeDefinition.relLoc.line > 0
        });

        let functionDefineOptions = {
            id: options.nodeDefinition.key,
            computed: options.nodeDefinition.computed,
            kind: options.nodeDefinition.kind,
            method: options.nodeDefinition.method
        };

        renderTemplate.define({
            name: 'functionDefinition',
            renderDefinition: this.renderContainer.get(functionExpression).build(options.nodeDefinition.value, functionDefineOptions)
        });

        renderTemplate.setRelativeLocation(options.nodeDefinition.relLoc);
    }

    addShorthandRenderTemplate(options) {
        //note: shorthand cannot be computed, so this one is easy.
        let renderTemplate = options.renderContext.addRenderTemplate({
            template: context => context.expression,
            newLine: options.nodeDefinition.relLoc.line > 0
        });

        renderTemplate.defineRenderNode({
            name: 'expression',
            nodeDefinition: options.nodeDefinition
        });

        renderTemplate.setRelativeLocation(options.nodeDefinition.relLoc);
    }
}

module.exports =  PropertyRendererFactory;