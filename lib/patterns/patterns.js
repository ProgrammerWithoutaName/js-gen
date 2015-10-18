'use strict';

const ArrayPatternRendererFactory = require('./arrayPattern');
const AssignmentPatternRendererFactory = require('./assignmentPattern');
const IdentifierRendererFactory = require('./IdentifierRendererFactory');
const ObjectPatternRendererFactory = require('./objectPattern');
const RestElementRendererFactory = require('./restElement');


function define(renderContainer) {
    renderContainer.register(ArrayPatternRendererFactory);
    renderContainer.register(AssignmentPatternRendererFactory);
    renderContainer.register(IdentifierRendererFactory);
    renderContainer.register(ObjectPatternRendererFactory);
    renderContainer.register(RestElementRendererFactory);
}

module.exports = { define };