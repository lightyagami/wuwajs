"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unionListToUnionCharacterConnectorLogic = exports.unionToUnionCharacterConnectorLogic = exports.UnionCharacterConnectorLogic = undefined;
const character_connector_range_js_1 = require("../fb-component/character-connector-range.js");
var UnionCharacterConnectorLogic;
function unionToUnionCharacterConnectorLogic(n, r) {
  switch (UnionCharacterConnectorLogic[n]) {
    case "NONE":
      return;
    case "CharacterConnectorRange":
      return r(new character_connector_range_js_1.CharacterConnectorRange());
    default:
      return;
  }
}
function unionListToUnionCharacterConnectorLogic(n, r, o) {
  switch (UnionCharacterConnectorLogic[n]) {
    case "NONE":
      return;
    case "CharacterConnectorRange":
      return r(o, new character_connector_range_js_1.CharacterConnectorRange());
    default:
      return;
  }
}
(function (n) {
  n[n.NONE = 0] = "NONE";
  n[n.CharacterConnectorRange = 1] = "CharacterConnectorRange";
})(UnionCharacterConnectorLogic = exports.UnionCharacterConnectorLogic ||= {});
exports.unionToUnionCharacterConnectorLogic = unionToUnionCharacterConnectorLogic;
exports.unionListToUnionCharacterConnectorLogic = unionListToUnionCharacterConnectorLogic; //# sourceMappingURL=union-character-connector-logic.js.map