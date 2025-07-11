"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionCheckDangoCultivationProgressConfigHelper = undefined;
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition");
const FbCountDangoOverTargetLevel_1 = require("./FbCountDangoOverTargetLevel");
class UnionCheckDangoCultivationProgressConfigHelper {
  static GetUnionCheckDangoCultivationProgressConfigObject(o) {
    if (o === fb_condition_1.UnionCheckDangoCultivationProgressConfig.CountDangoOverTargetLevel) {
      return new fb_condition_1.CountDangoOverTargetLevel();
    }
  }
  static ReadUnionCheckDangoCultivationProgressConfig(o, e) {
    if (e !== undefined && o === fb_condition_1.UnionCheckDangoCultivationProgressConfig.CountDangoOverTargetLevel) {
      return FbCountDangoOverTargetLevel_1.FbCountDangoOverTargetLevel.Create(e);
    } else {
      return undefined;
    }
  }
}
exports.UnionCheckDangoCultivationProgressConfigHelper = UnionCheckDangoCultivationProgressConfigHelper;
//# sourceMappingURL=UnionCheckDangoCultivationProgressConfigHelper.js.map