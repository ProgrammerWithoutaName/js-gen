'use strict';
/* note: could pull in sequence and use non standard??*/

const renderHelperTypes = require('./renderHelperTypes');
const sequence = renderHelperTypes.nodeTypes.sequence;

class ParameterRendererFactory {
    constructor(renderContainer) {
        this.nodeType = renderHelperTypes.nodeTypes.parameters;
        this.classification = renderHelperTypes.classification;
        this.renderContainer = renderContainer;
    }

    build(nodeDefinitions, useNewLines, defaults) {
        let sequenceRenderer = this.renderContainer.get(sequence);
        if(!defaults.any()) {
            return sequenceRenderer.build(nodeDefinitions, multiline);
        }

        return {
            defineRender: renderContext => {
                let renderOptions = {nodeDefinition, renderContext};
                renderOptions.prependCallback = sequenceRenderer.getPrependCallback(useNewLines, index === 0);
                renderOptions.appendCallback = sequenceRenderer.getAppendCallback(useNewLines, index >= nodeDefinitions.length - 1);

                // parameters and Defaults should always align.
                nodeDefinitions.forEach((nodeDefinition, index) => {
                    if(!defaults[index]) {
                        sequenceRenderer.addExpressionTemplateToRenderContext(renderOptions);
                    } else {
                        renderOptions.defaultValueDefinition = defaults[index];
                        this.addAssignmentTemplateToRenderContext(renderOptions);
                    }
                });
            }
        };
    }

    addAssignmentTemplateToRenderContext(options) {
        let renderTemplate = options.renderContext.addRenderTemplate({
            template: context => `${context.expression} = ${context.expressionValue}`
        });
        renderTemplate.define({
            name: 'expression',
            renderDefinition: this.renderContainer.get(options.nodeDefinition.type).build(options.nodeDefinition),
            prependCallback: options.prependCallback,
            appendCallback: options.appendCallback
        });

        renderTemplate.define({
            name: 'expressionValue',
            renderDefinition: this.renderContainer.get(options.defaultValueDefinition.type).build(options.defaultValueDefinition),
            prependCallback: options.prependCallback,
            appendCallback: options.appendCallback
        });

        renderTemplate.setRelativeLocation(options.nodeDefinition.relLoc);
    }
}

module.exports = ParameterRendererFactory;