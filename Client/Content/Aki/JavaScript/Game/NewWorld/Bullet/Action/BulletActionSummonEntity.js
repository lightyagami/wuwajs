"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletActionSummonEntity = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BulletActionBase_1 = require("./BulletActionBase");
class BulletActionSummonEntity extends BulletActionBase_1.BulletActionBase {
  OnExecute() {
    var e = this.BulletInfo.Attacker;
    var o = this.BulletInfo.AttackerCreatureDataComp;
    let t = 0;
    var r = o.GetEntityType();
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      if ((r === Protocol_1.Aki.Protocol.kks.Proto_Player || r === Protocol_1.Aki.Protocol.kks.Proto_Vision) && !this.BulletInfo.AttackerActorComp.IsAutonomousProxy) {
        return;
      }
      if (r === Protocol_1.Aki.Protocol.kks.Proto_Monster && (t = o.GetSummonsVersion()) === 0) {
        t = o.ComponentDataMap.get("Pys")?.Pys?.K7n ?? 1;
      }
    }
    this.BulletInfo.SummonAttackerId = e.Id;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Bullet", 20, "子弹召唤", ["Version", t]);
    }
    this.BulletInfo.SummonServerEntityId = ControllerHolder_1.ControllerHolder.CreatureController.SummonRequest(this.BulletInfo.BulletInitParams.SkillId, true, this.BulletInfo.ActorComponent.ActorTransform, this.BulletInfo.SummonAttackerId, this.BulletInfo.BulletDataMain.Summon.EntityId, t);
    if (this.BulletInfo.SummonServerEntityId !== undefined) {
      ModelManager_1.ModelManager.BulletModel.SummonerSummon(e.Id, this.BulletInfo.SummonServerEntityId);
    }
    if (t > 0) {
      o.SetSummonsVersion(t + 1);
    }
  }
}
exports.BulletActionSummonEntity = BulletActionSummonEntity;
//# sourceMappingURL=BulletActionSummonEntity.js.map