"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionCharacterConnectorLogicHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbCharacterConnectorRange_1 = require("./FbCharacterConnectorRange");
class UnionCharacterConnectorLogicHelper {
  static GetUnionCharacterConnectorLogicObject(e) {
    if (e === fb_component_1.UnionCharacterConnectorLogic.CharacterConnectorRange) {
      return new fb_component_1.CharacterConnectorRange();
    }
  }
  static ReadUnionCharacterConnectorLogic(e, o) {
    if (o !== undefined && e === fb_component_1.UnionCharacterConnectorLogic.CharacterConnectorRange) {
      return FbCharacterConnectorRange_1.FbCharacterConnectorRange.Create(o);
    } else {
      return undefined;
    }
  }
}
exports.UnionCharacterConnectorLogicHelper = UnionCharacterConnectorLogicHelper;
//# sourceMappingURL=UnionCharacterConnectorLogicHelper.js.map