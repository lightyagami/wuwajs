"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionSkillOperationHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbDisableSectionalSkillOperation_1 = require("./FbDisableSectionalSkillOperation");
const FbDisableSkillOperation_1 = require("./FbDisableSkillOperation");
const FbEnableSkillOperation_1 = require("./FbEnableSkillOperation");
class UnionSkillOperationHelper {
  static GetUnionSkillOperationObject(e) {
    switch (e) {
      case fb_action_1.UnionSkillOperation.DisableSectionalSkillOperation:
        return new fb_action_1.DisableSectionalSkillOperation();
      case fb_action_1.UnionSkillOperation.DisableSkillOperation:
        return new fb_action_1.DisableSkillOperation();
      case fb_action_1.UnionSkillOperation.EnableSkillOperation:
        return new fb_action_1.EnableSkillOperation();
      default:
        return;
    }
  }
  static ReadUnionSkillOperation(e, i) {
    if (i !== undefined) {
      switch (e) {
        case fb_action_1.UnionSkillOperation.DisableSectionalSkillOperation:
          return FbDisableSectionalSkillOperation_1.FbDisableSectionalSkillOperation.Create(i);
        case fb_action_1.UnionSkillOperation.DisableSkillOperation:
          return FbDisableSkillOperation_1.FbDisableSkillOperation.Create(i);
        case fb_action_1.UnionSkillOperation.EnableSkillOperation:
          return FbEnableSkillOperation_1.FbEnableSkillOperation.Create(i);
        default:
          return;
      }
    }
  }
}
exports.UnionSkillOperationHelper = UnionSkillOperationHelper;
//# sourceMappingURL=UnionSkillOperationHelper.js.map