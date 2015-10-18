'use strict';
const renderHelperTypes = require('./renderHelperTypes');

class CommentRendererFactory {
    constructor(renderContainer) {
        this.nodeType = renderHelperTypes.nodeTypes.comments;
        this.classification = renderHelperTypes.classification;
        this.renderContainer = renderContainer;
    }

    build(expressionDefinition, expressionRenderer) {
        //don't need to render comments, just use the expressionRenderer
        if(!expressionDefinition.leadingComments && !expressionDefinition.trailingComments) {
            return expressionRenderer;
        }
        return {
            defineRender: renderContext => {
                addComments(expressionDefinition.leadingComments, renderContext);
                expressionRenderer.defineRender(renderContext);
                addComments(expressionDefinition.trailingComments, renderContext);
            }
        };
    }

    addComments(comments, renderContext) {
        if(comments) {
            comments.forEach(commentDefinition => addComment(commentDefinition, renderContext));
        }
    }

    addComment(commentDefinition, renderContext) {
        if(commentDefinition.type === 'Line') {
            addLineComment(commentDefinition, renderContext);
        } else {
            addBlockComment(commentDefinition, renderContext);
        }
    }

    //todo: figure out how to correctly indent the comment body.
    //todo: this also doesn't cover the scenerio where there is a block comment before the item in a leadingComment
    // comments aren't figured into relative positions.
    addBlockComment(commentDefinition, renderContext) {
        //Note: something else needs to set the relative positions. this would be a leaf node, effectively.
        let renderTemplate = renderContext.addRenderTemplate({
            template: context => `/*${commentDefinition.value}*/`,
            newLine: commentDefinition.relLoc.line > 0
        });
        renderTemplate.setRelativeLocation(commentDefinition.relLoc);
    }

    addLineComment(commentDefinition, renderContext) {
        //Note: something else needs to set the relative positions. this would be a leaf node, effectively.
        let renderTemplate = renderContext.addRenderTemplate({
            template: context => `//${commentDefinition.value}`,
            newLine: commentDefinition.relLoc.line > 0
        });
        renderTemplate.setRelativeLocation(commentDefinition.relLoc);
    }
}

module.exports = CommentRendererFactory;