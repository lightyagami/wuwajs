"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionExecBattleOptionHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbSetBattleTags_1 = require("./FbSetBattleTags");
const FbSetMonsterMoveTarget_1 = require("./FbSetMonsterMoveTarget");
class UnionExecBattleOptionHelper {
  static GetUnionExecBattleOptionObject(t) {
    switch (t) {
      case fb_action_1.UnionExecBattleOption.SetBattleTags:
        return new fb_action_1.SetBattleTags();
      case fb_action_1.UnionExecBattleOption.SetMonsterMoveTarget:
        return new fb_action_1.SetMonsterMoveTarget();
      default:
        return;
    }
  }
  static ReadUnionExecBattleOption(t, e) {
    if (e !== undefined) {
      switch (t) {
        case fb_action_1.UnionExecBattleOption.SetBattleTags:
          return FbSetBattleTags_1.FbSetBattleTags.Create(e);
        case fb_action_1.UnionExecBattleOption.SetMonsterMoveTarget:
          return FbSetMonsterMoveTarget_1.FbSetMonsterMoveTarget.Create(e);
        default:
          return;
      }
    }
  }
}
exports.UnionExecBattleOptionHelper = UnionExecBattleOptionHelper;
//# sourceMappingURL=UnionExecBattleOptionHelper.js.map