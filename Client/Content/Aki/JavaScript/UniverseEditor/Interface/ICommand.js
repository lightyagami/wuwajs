"use strict";

function parseGameCommand(e) {
  try {
    return JSON.parse(e);
  } catch (e) {}
}
function parseEditorCommand(e) {
  try {
    return JSON.parse(e);
  } catch (e) {}
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseEditorCommand = exports.parseGameCommand = undefined;
exports.parseGameCommand = parseGameCommand;
exports.parseEditorCommand = parseEditorCommand; //# sourceMappingURL=ICommand.js.map