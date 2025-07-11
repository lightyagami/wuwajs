"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionCheckTargetTypeConfigHelper = undefined;
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition");
const FbAllPlayerType_1 = require("./FbAllPlayerType");
class UnionCheckTargetTypeConfigHelper {
  static GetUnionCheckTargetTypeConfigObject(e) {
    if (e === fb_condition_1.UnionCheckTargetTypeConfig.AllPlayerType) {
      return new fb_condition_1.AllPlayerType();
    }
  }
  static ReadUnionCheckTargetTypeConfig(e, i) {
    if (i !== undefined && e === fb_condition_1.UnionCheckTargetTypeConfig.AllPlayerType) {
      return FbAllPlayerType_1.FbAllPlayerType.Create(i);
    } else {
      return undefined;
    }
  }
}
exports.UnionCheckTargetTypeConfigHelper = UnionCheckTargetTypeConfigHelper;
//# sourceMappingURL=UnionCheckTargetTypeConfigHelper.js.map