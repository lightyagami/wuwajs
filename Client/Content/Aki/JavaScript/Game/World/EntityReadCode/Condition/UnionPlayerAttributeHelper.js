"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionPlayerAttributeHelper = undefined;
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition");
const FbHealthAttribute_1 = require("./FbHealthAttribute");
class UnionPlayerAttributeHelper {
  static GetUnionPlayerAttributeObject(t) {
    if (t === fb_condition_1.UnionPlayerAttribute.HealthAttribute) {
      return new fb_condition_1.HealthAttribute();
    }
  }
  static ReadUnionPlayerAttribute(t, e) {
    if (e !== undefined && t === fb_condition_1.UnionPlayerAttribute.HealthAttribute) {
      return FbHealthAttribute_1.FbHealthAttribute.Create(e);
    } else {
      return undefined;
    }
  }
}
exports.UnionPlayerAttributeHelper = UnionPlayerAttributeHelper;
//# sourceMappingURL=UnionPlayerAttributeHelper.js.map