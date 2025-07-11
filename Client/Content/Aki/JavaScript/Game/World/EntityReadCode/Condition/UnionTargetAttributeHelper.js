"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionTargetAttributeHelper = undefined;
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition");
const FbPlayerAttribute_1 = require("./FbPlayerAttribute");
class UnionTargetAttributeHelper {
  static GetUnionTargetAttributeObject(t) {
    if (t === fb_condition_1.UnionTargetAttribute.PlayerAttribute) {
      return new fb_condition_1.PlayerAttribute();
    }
  }
  static ReadUnionTargetAttribute(t, e) {
    if (e !== undefined && t === fb_condition_1.UnionTargetAttribute.PlayerAttribute) {
      return FbPlayerAttribute_1.FbPlayerAttribute.Create(e);
    } else {
      return undefined;
    }
  }
}
exports.UnionTargetAttributeHelper = UnionTargetAttributeHelper;
//# sourceMappingURL=UnionTargetAttributeHelper.js.map