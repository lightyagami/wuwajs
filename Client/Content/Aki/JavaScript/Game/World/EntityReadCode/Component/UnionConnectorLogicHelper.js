"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionConnectorLogicHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbConnectorRange_1 = require("./FbConnectorRange");
class UnionConnectorLogicHelper {
  static GetUnionConnectorLogicObject(o) {
    if (o === fb_component_1.UnionConnectorLogic.ConnectorRange) {
      return new fb_component_1.ConnectorRange();
    }
  }
  static ReadUnionConnectorLogic(o, n) {
    if (n !== undefined && o === fb_component_1.UnionConnectorLogic.ConnectorRange) {
      return FbConnectorRange_1.FbConnectorRange.Create(n);
    } else {
      return undefined;
    }
  }
}
exports.UnionConnectorLogicHelper = UnionConnectorLogicHelper;
//# sourceMappingURL=UnionConnectorLogicHelper.js.map