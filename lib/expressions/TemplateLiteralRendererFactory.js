'use strict';
const expressionTypes = require('./expressionTypes');
const comments = require('../renderHelpers/renderHelperTypes').nodeTypes.comments;

/*
 Yo dogg:
 it's quasi's + expressions interleaved
 quasi + "${" + expression + "}", but expression wont exist if "tail" is true.
 */
class TemplateLiteralRendererFactory {
    constructor(renderContainer) {
        this.nodeType = expressionTypes.nodeTypes.templateLiteral;
        this.classification = expressionTypes.classification;
        this.renderContainer = renderContainer;
    }

    build(nodeDefinition) {
        let templateLiteralRender = {
            defineRender: renderContext => {
                this.addBacktickTemplate({
                    newLine : nodeDefinition.relLoc.line > 0,
                    relLoc: nodeDefinition.relLoc
                });

                nodeDefinition.quasis.forEach( quasi => {
                    this.addQuasiTemplate({
                        renderContext,
                        quasi,
                        expression: nodeDefinition.expressions[index],
                        nodeDefinition: nodeDefinition
                    });
                });

                this.addBacktickTemplate();
            }
        };


        return this.renderContainer.get(comments).build(templateLiteralRender);
    }

    addBacktickTemplate(options) {
        let renderTemplate = options.renderContext.addRenderTemplate({
            template: context => '`',
            newLine: options.newLine
        });

        if(options.relLoc) {
            renderTemplate.setRelativeLocation(options.relLoc)
        }
    }

    addQuasiTemplate(options) {
        let renderTemplateOptions = buildQuasiTemplateOptions(options);
        let renderTemplate = options.renderContext.addRenderTemplate(renderTemplateOptions);
        configureRenderTemplate({
            renderTemplate,
            expression: options.expression,
            nodeDefinition: options.nodeDefinitions
        });
    }

    configureRenderTemplate(options) {
        let renderNodeOptions = buildRenderNodeOptions(options.expression);

        if(options.expression) {
            options.renderTemplate.defineRenderNode(renderNodeOptions);
        }
    }

    buildRenderNodeOptions(expression) {
        return {
            name: 'expression',
            nodeDefinition: expression
        };
    }

    buildQuasiTemplateOptions(options) {
        return {
            newLine: false,
            template: options.quasi.tail ?
                context => `${options.quasi.raw}${context.expression}` :
                context => options.quasi.raw
        };
    }
}

module.exports =  TemplateLiteralRendererFactory;