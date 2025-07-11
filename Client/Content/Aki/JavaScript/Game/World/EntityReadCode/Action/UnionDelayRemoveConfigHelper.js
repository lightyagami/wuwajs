"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionDelayRemoveConfigHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbDelayRemoveAfterSkillFinish_1 = require("./FbDelayRemoveAfterSkillFinish");
class UnionDelayRemoveConfigHelper {
  static GetUnionDelayRemoveConfigObject(e) {
    if (e === fb_action_1.UnionDelayRemoveConfig.DelayRemoveAfterSkillFinish) {
      return new fb_action_1.DelayRemoveAfterSkillFinish();
    }
  }
  static ReadUnionDelayRemoveConfig(e, i) {
    if (i !== undefined && e === fb_action_1.UnionDelayRemoveConfig.DelayRemoveAfterSkillFinish) {
      return FbDelayRemoveAfterSkillFinish_1.FbDelayRemoveAfterSkillFinish.Create(i);
    } else {
      return undefined;
    }
  }
}
exports.UnionDelayRemoveConfigHelper = UnionDelayRemoveConfigHelper;
//# sourceMappingURL=UnionDelayRemoveConfigHelper.js.map