"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionSetAlertValueTypeHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbAddOrSubAlertValue_1 = require("./FbAddOrSubAlertValue");
const FbCustomAlertValue_1 = require("./FbCustomAlertValue");
const FbMaxAlertValue_1 = require("./FbMaxAlertValue");
const FbMinAlertValue_1 = require("./FbMinAlertValue");
class UnionSetAlertValueTypeHelper {
  static GetUnionSetAlertValueTypeObject(e) {
    switch (e) {
      case fb_action_1.UnionSetAlertValueType.AddOrSubAlertValue:
        return new fb_action_1.AddOrSubAlertValue();
      case fb_action_1.UnionSetAlertValueType.CustomAlertValue:
        return new fb_action_1.CustomAlertValue();
      case fb_action_1.UnionSetAlertValueType.MaxAlertValue:
        return new fb_action_1.MaxAlertValue();
      case fb_action_1.UnionSetAlertValueType.MinAlertValue:
        return new fb_action_1.MinAlertValue();
      default:
        return;
    }
  }
  static ReadUnionSetAlertValueType(e, t) {
    if (t !== undefined) {
      switch (e) {
        case fb_action_1.UnionSetAlertValueType.AddOrSubAlertValue:
          return FbAddOrSubAlertValue_1.FbAddOrSubAlertValue.Create(t);
        case fb_action_1.UnionSetAlertValueType.CustomAlertValue:
          return FbCustomAlertValue_1.FbCustomAlertValue.Create(t);
        case fb_action_1.UnionSetAlertValueType.MaxAlertValue:
          return FbMaxAlertValue_1.FbMaxAlertValue.Create(t);
        case fb_action_1.UnionSetAlertValueType.MinAlertValue:
          return FbMinAlertValue_1.FbMinAlertValue.Create(t);
        default:
          return;
      }
    }
  }
}
exports.UnionSetAlertValueTypeHelper = UnionSetAlertValueTypeHelper;
//# sourceMappingURL=UnionSetAlertValueTypeHelper.js.map