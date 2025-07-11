"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletActionAfterInit = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../Module/CombatMessage/CombatMessage");
const BulletConstant_1 = require("../BulletConstant");
const BulletActionBase_1 = require("./BulletActionBase");
class BulletActionAfterInit extends BulletActionBase_1.BulletActionBase {
  OnExecute() {
    var e;
    var t;
    var o;
    var l;
    var r;
    var a = this.BulletInfo;
    var n = a.BulletDataMain;
    var i = a.Attacker;
    var n = n.Execution.SendGameplayEventTagToAttackerOnStart;
    if (n && n.TagName !== StringUtils_1.NONE_STRING && (e = a.AttackerActorComp?.Actor)?.IsValid()) {
      (t = new UE.GameplayEventData()).OptionalObject = a.Actor;
      UE.AbilitySystemBlueprintLibrary.SendGameplayEventToActor(e, n, t);
    }
    if (Info_1.Info.IsBuildDevelopmentOrDebug) {
      EventSystem_1.EventSystem.EmitWithTarget(i, EventDefine_1.EEventName.BulletCreate, a);
    }
    a.IsInit = true;
    a.ActionLogicComponent.OnAfterInit();
    if (a.BulletInitParams.FromRemote) {
      if (BulletConstant_1.BulletConstant.OpenCreateLog && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Bullet", 17, "创建被同步子弹", ["bulletRowName", a.BulletRowName]);
      }
    } else {
      e = {
        cVn: a.BulletEntityId,
        W5n: ModelManager_1.ModelManager.CreatureModel.GetPlayerId()
      };
      ModelManager_1.ModelManager.BulletModel.RegisterBullet(e, a.BulletEntityId);
      n = a.BulletInitParams.SyncType !== 1;
      t = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(a.TargetId);
      o = a.GetActorLocation();
      l = a.MoveInfo.BeginSpeedRotator;
      (r = Protocol_1.Aki.Protocol.ee_.create()).uVn = e;
      r.Mjn = MathUtils_1.MathUtils.NumberToLong(Number(a.BulletRowName));
      r.r5n = a.BulletInitParams.SkillId;
      r.P5n = o;
      r.g8n = l;
      r.Sjn = ModelManager_1.ModelManager.BulletModel.GetBulletHandleById(a.BulletInitParams.ParentId);
      r.Ejn = MathUtils_1.MathUtils.NumberToLong(ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(a.BulletInitParams.BaseTransformId));
      r.yjn = MathUtils_1.MathUtils.NumberToLong(ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(a.BulletInitParams.BaseVelocityId));
      r.CVn = MathUtils_1.MathUtils.NumberToLong(t);
      r.Ijn = n;
      r.Tjn = a.BulletInitParams.DtType;
      r.Ljn = a.RandomPosOffset;
      r.Djn = a.RandomInitSpeedOffset;
      this.lra(r);
      CombatMessage_1.CombatNet.Send(22299, i, r, a.PreContextId, a.ContextId);
      if (BulletConstant_1.BulletConstant.OpenCreateLog) {
        if (n) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Bullet", 17, "创建本地子弹", ["bulletRowName", a.BulletRowName]);
          }
        } else if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Bullet", 17, "创建同步子弹", ["bulletRowName", a.BulletRowName], ["skillId", a.BulletInitParams.SkillId], ["handleId", e.cVn], ["playerId", e.W5n], ["Location", o], ["Rotation", l], ["TargetId", t]);
        }
      }
    }
  }
  lra(e) {
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      e.P5n = undefined;
      e.g8n = undefined;
      e.Sjn = undefined;
      e.yjn = 0;
      e.Tjn = 0;
      e.Ljn = undefined;
      e.Djn = undefined;
    }
  }
}
exports.BulletActionAfterInit = BulletActionAfterInit;
//# sourceMappingURL=BulletActionAfterInit.js.map