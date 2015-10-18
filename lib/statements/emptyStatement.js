'use strict';
// yes, even empty statements can have comments...
// example:
// /*empty statement comment*/;
const comments = require('../renderHelpers/comments');

function buildRender(emtpyStatementDefinition) {
    // I feel like I'm doing a whole bunch of work to say nothing.
    // perhaps I should call this the politicianStatement
    let emptyStatementRender = {
        defineRender: renderContext => {
            let renderTemplate = renderContext.addRenderTemplate({
                template: context => ';',
                newLine: emtpyStatementDefinition.relLoc.line > 0
            });
            renderTemplate.setRelativeLocation(emtpyStatementDefinition.relLoc);
        }
    };
    return comments.buildRender(emtpyStatementDefinition, emptyStatementRender);
}

module.exports = { buildRender };