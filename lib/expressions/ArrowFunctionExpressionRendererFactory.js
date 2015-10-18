'use strict';
const expressionTypes = require('./expressionTypes');
const renderHelperNodeTypes = require('../renderHelpers/renderHelperTypes').nodeTypes;
const parameters = renderHelperNodeTypes.parameters;
const comments = renderHelperNodeTypes.comments;


// this matters because foo => {} means something different then foo => ({})
const objectExpression = expressionTypes.nodeTypes.objectExpression;

class ArrowFunctionExpressionRendererFactory {
    constructor(renderContainer) {
        this.nodeType = expressionTypes.nodeTypes.arrowFunctionExpression;
        this.classification = expressionTypes.classification;
        this.renderContainer = renderContainer;
    }

    build(nodeDefinition) {
        let arrowFunctionRender = {
            defineRender: (renderContext) => {
                let paramsUseNewLines = parametersUseMultipleLines(nodeDefinition);

                let renderTemplate = renderContext.addRenderTemplate({
                    template: this.buildArrowFunctionTemplate(nodeDefinition),
                    newLine: nodeDefinition.relLoc.line > 0
                });

                renderTemplate.define({
                    name: 'parameters',
                    renderDefinition: this.renderContainer.get(parameters).build(nodeDefinition.params, paramsUseNewLines)
                });

                renderTemplate.define({
                    name: 'body',
                    renderDefinition: buildBodyRenderDefinition(nodeDefinition.params)
                });

                renderTemplate.setRelativeLocation(nodeDefinition.relLoc);
            }
        };

        return this.renderContainer.get(comments).build(nodeDefinition, arrowFunctionRender);
    }

    parametersUseMultipleLines(nodeDefinition) {
        if(nodeDefinition.params.length < 2) { return false; }
        // we care about the starting points because the last item could be an object definition with multiple lines.
        let firstLine = nodeDefinition.params[0].loc.start.line;
        let lastLine = nodeDefinition.params[nodeDefinition.params.length - 1].loc.start.line;
        return (lastLine - firstLine) === 0
    }

    buildArrowFunctionTemplate(nodeDefinition) {
        if(nodeDefinition.loc.start.line != nodeDefinition.loc.end.line) {
            return context => `(${context.parameters}) =>
${context.newLineIndent}${context.body}`
        }
        return context => `(${context.parameters}) => ${context.body}`
    }

    buildBodyRenderDefinition(nodeDefinition) {
        let bodyType = nodeDefinition.body.type;
        return this.renderContainer.get(bodyType).build(nodeDefinition.body);
    }
}