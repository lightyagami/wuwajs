"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionSkillReadyOptionHelper = undefined;
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition");
const FbESkillReady_1 = require("./FbESkillReady");
const FbUltimateSkillReady_1 = require("./FbUltimateSkillReady");
const FbVisionSkillReady_1 = require("./FbVisionSkillReady");
class UnionSkillReadyOptionHelper {
  static GetUnionSkillReadyOptionObject(i) {
    switch (i) {
      case fb_condition_1.UnionSkillReadyOption.ESkillReady:
        return new fb_condition_1.ESkillReady();
      case fb_condition_1.UnionSkillReadyOption.UltimateSkillReady:
        return new fb_condition_1.UltimateSkillReady();
      case fb_condition_1.UnionSkillReadyOption.VisionSkillReady:
        return new fb_condition_1.VisionSkillReady();
      default:
        return;
    }
  }
  static ReadUnionSkillReadyOption(i, e) {
    if (e !== undefined) {
      switch (i) {
        case fb_condition_1.UnionSkillReadyOption.ESkillReady:
          return FbESkillReady_1.FbESkillReady.Create(e);
        case fb_condition_1.UnionSkillReadyOption.UltimateSkillReady:
          return FbUltimateSkillReady_1.FbUltimateSkillReady.Create(e);
        case fb_condition_1.UnionSkillReadyOption.VisionSkillReady:
          return FbVisionSkillReady_1.FbVisionSkillReady.Create(e);
        default:
          return;
      }
    }
  }
}
exports.UnionSkillReadyOptionHelper = UnionSkillReadyOptionHelper;
//# sourceMappingURL=UnionSkillReadyOptionHelper.js.map