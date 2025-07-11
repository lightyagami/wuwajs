"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionBattleStatePerceptionBehaviorHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbPerceptionNotifyGatherToEntity_1 = require("./FbPerceptionNotifyGatherToEntity");
const FbPerceptionNotifyGatherToPlayer_1 = require("./FbPerceptionNotifyGatherToPlayer");
class UnionBattleStatePerceptionBehaviorHelper {
  static GetUnionBattleStatePerceptionBehaviorObject(e) {
    switch (e) {
      case fb_action_1.UnionBattleStatePerceptionBehavior.PerceptionNotifyGatherToEntity:
        return new fb_action_1.PerceptionNotifyGatherToEntity();
      case fb_action_1.UnionBattleStatePerceptionBehavior.PerceptionNotifyGatherToPlayer:
        return new fb_action_1.PerceptionNotifyGatherToPlayer();
      default:
        return;
    }
  }
  static ReadUnionBattleStatePerceptionBehavior(e, t) {
    if (t !== undefined) {
      switch (e) {
        case fb_action_1.UnionBattleStatePerceptionBehavior.PerceptionNotifyGatherToEntity:
          return FbPerceptionNotifyGatherToEntity_1.FbPerceptionNotifyGatherToEntity.Create(t);
        case fb_action_1.UnionBattleStatePerceptionBehavior.PerceptionNotifyGatherToPlayer:
          return FbPerceptionNotifyGatherToPlayer_1.FbPerceptionNotifyGatherToPlayer.Create(t);
        default:
          return;
      }
    }
  }
}
exports.UnionBattleStatePerceptionBehaviorHelper = UnionBattleStatePerceptionBehaviorHelper;
//# sourceMappingURL=UnionBattleStatePerceptionBehaviorHelper.js.map