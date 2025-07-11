"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionVarHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const fb_var_1 = require("../../../../Game/World/EntityFb/fb-var");
class UnionVarHelper {
  static GetUnionVarObject(e) {
    switch (e) {
      case fb_action_1.UnionVar.FbVar_IntValue:
        return new fb_var_1.IntValue();
      case fb_action_1.UnionVar.FbVar_StringValue:
        return new fb_var_1.StringValue();
      default:
        return;
    }
  }
  static ReadUnionVar(e, t) {
    if (t !== undefined) {
      switch (e) {
        case fb_action_1.UnionVar.FbVar_IntValue:
        case fb_action_1.UnionVar.FbVar_StringValue:
          return t?.v();
        default:
          return;
      }
    }
  }
}
exports.UnionVarHelper = UnionVarHelper;
//# sourceMappingURL=UnionVarHelper.js.map