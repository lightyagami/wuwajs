"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionDetectBattleTagTypeHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbDetectBattleMonsterOnGround_1 = require("./FbDetectBattleMonsterOnGround");
class UnionDetectBattleTagTypeHelper {
  static GetUnionDetectBattleTagTypeObject(t) {
    if (t === fb_action_1.UnionDetectBattleTagType.DetectBattleMonsterOnGround) {
      return new fb_action_1.DetectBattleMonsterOnGround();
    }
  }
  static ReadUnionDetectBattleTagType(t, e) {
    if (e !== undefined && t === fb_action_1.UnionDetectBattleTagType.DetectBattleMonsterOnGround) {
      return FbDetectBattleMonsterOnGround_1.FbDetectBattleMonsterOnGround.Create(e);
    } else {
      return undefined;
    }
  }
}
exports.UnionDetectBattleTagTypeHelper = UnionDetectBattleTagTypeHelper;
//# sourceMappingURL=UnionDetectBattleTagTypeHelper.js.map