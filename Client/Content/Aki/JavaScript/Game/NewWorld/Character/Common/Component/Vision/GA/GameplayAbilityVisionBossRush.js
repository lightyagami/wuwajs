"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayAbilityVisionBossRush = undefined;
const Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil");
const GameplayAbilityVisionMorph_1 = require("./GameplayAbilityVisionMorph");
class GameplayAbilityVisionBossRush extends GameplayAbilityVisionMorph_1.GameplayAbilityVisionMorph {
  PreInit() {
    var o = this.CreatureDataComponent.GetPlayerId();
    var o = ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(o);
    this.VisionEntity = o ? this.VisionEntity = PhantomUtil_1.PhantomUtil.GetSummonedEntity(o, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantWeakVision) : undefined;
    var o = this.VisionEntity?.Entity?.GetComponent(0);
    o?.SetSummonerId(this.CreatureDataComponent.GetCreatureDataId());
    var o = o?.ComponentDataMap.get("lys");
    var o = o?.lys?.mIs;
    if (o) {
      this.VisionData = PhantomUtil_1.PhantomUtil.GetVisionData(o);
    }
  }
  SetVisionEnable(o, i = this.VisionEntity) {
    ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(i.Entity, o, "GameplayAbilityVisionBossRush.SetVisionEnable", true);
    i = this.VisionEntity?.Entity?.GetComponent(59);
    if (o) {
      i?.SetRelationship(this.EntityHandle);
    } else {
      i?.DeleteFollowEntity();
    }
  }
}
exports.GameplayAbilityVisionBossRush = GameplayAbilityVisionBossRush;
//# sourceMappingURL=GameplayAbilityVisionBossRush.js.map