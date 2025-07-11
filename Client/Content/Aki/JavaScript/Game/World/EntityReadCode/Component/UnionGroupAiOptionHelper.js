"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionGroupAiOptionHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbGroupAiPatrol_1 = require("./FbGroupAiPatrol");
class UnionGroupAiOptionHelper {
  static GetUnionGroupAiOptionObject(o) {
    if (o === fb_component_1.UnionGroupAiOption.GroupAiPatrol) {
      return new fb_component_1.GroupAiPatrol();
    }
  }
  static ReadUnionGroupAiOption(o, t) {
    if (t !== undefined && o === fb_component_1.UnionGroupAiOption.GroupAiPatrol) {
      return FbGroupAiPatrol_1.FbGroupAiPatrol.Create(t);
    } else {
      return undefined;
    }
  }
}
exports.UnionGroupAiOptionHelper = UnionGroupAiOptionHelper;
//# sourceMappingURL=UnionGroupAiOptionHelper.js.map