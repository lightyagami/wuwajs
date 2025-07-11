"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionSpecialNpcPerformTypeHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbBaseRoleNpcPerform_1 = require("./FbBaseRoleNpcPerform");
class UnionSpecialNpcPerformTypeHelper {
  static GetUnionSpecialNpcPerformTypeObject(e) {
    if (e === fb_component_1.UnionSpecialNpcPerformType.BaseRoleNpcPerform) {
      return new fb_component_1.BaseRoleNpcPerform();
    }
  }
  static ReadUnionSpecialNpcPerformType(e, o) {
    if (o !== undefined && e === fb_component_1.UnionSpecialNpcPerformType.BaseRoleNpcPerform) {
      return FbBaseRoleNpcPerform_1.FbBaseRoleNpcPerform.Create(o);
    } else {
      return undefined;
    }
  }
}
exports.UnionSpecialNpcPerformTypeHelper = UnionSpecialNpcPerformTypeHelper;
//# sourceMappingURL=UnionSpecialNpcPerformTypeHelper.js.map