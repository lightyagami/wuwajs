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
const BulletLog_1 = require("../BulletStaticMethod/BulletLog");
const BulletActionBase_1 = require("./BulletActionBase");
class BulletActionAfterInit extends BulletActionBase_1.BulletActionBase {
  OnExecute() {
    var e;
    var t;
    var o;
    var l;
    var r;
    var n = this.BulletInfo;
    var a = n.BulletDataMain;
    var i = n.Attacker;
    var a = a.Execution.SendGameplayEventTagToAttackerOnStart;
    if (a && a.TagName !== StringUtils_1.NONE_STRING && (e = n.AttackerActorComp?.Actor)?.IsValid()) {
      (t = new UE.GameplayEventData()).OptionalObject = n.Actor;
      UE.AbilitySystemBlueprintLibrary.SendGameplayEventToActor(e, a, t);
    }
    if (Info_1.Info.IsBuildDevelopmentOrDebug) {
      EventSystem_1.EventSystem.EmitWithTarget(i, EventDefine_1.EEventName.BulletCreate, n);
    }
    n.IsInit = true;
    n.ActionLogicComponent.OnAfterInit();
    if (n.BulletInitParams.FromRemote) {
      if (BulletConstant_1.BulletConstant.OpenCreateLog && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Bullet", 17, "创建被同步子弹", ...BulletLog_1.BulletLog.ToPairs(n));
      }
    } else {
      e = {
        cVn: n.BulletEntityId,
        W5n: ModelManager_1.ModelManager.CreatureModel.GetPlayerId()
      };
      ModelManager_1.ModelManager.BulletModel.RegisterBullet(e, n.BulletEntityId);
      a = n.BulletInitParams.SyncType !== 1;
      t = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(n.TargetId);
      o = n.GetActorLocation();
      l = n.MoveInfo.BeginSpeedRotator;
      (r = Protocol_1.Aki.Protocol.ee_.create()).uVn = e;
      r.Mjn = MathUtils_1.MathUtils.NumberToLong(Number(n.BulletRowName));
      r.r5n = n.BulletInitParams.SkillId;
      r.P5n = o;
      r.g8n = l;
      r.Sjn = ModelManager_1.ModelManager.BulletModel.GetBulletHandleById(n.BulletInitParams.ParentId);
      r.Ejn = MathUtils_1.MathUtils.NumberToLong(ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(n.BulletInitParams.BaseTransformId));
      r.yjn = MathUtils_1.MathUtils.NumberToLong(ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(n.BulletInitParams.BaseVelocityId));
      r.CVn = MathUtils_1.MathUtils.NumberToLong(t);
      r.Ijn = a;
      r.Tjn = n.BulletInitParams.DtType;
      r.Ljn = n.RandomPosOffset;
      r.Djn = n.RandomInitSpeedOffset;
      this.lra(r);
      CombatMessage_1.CombatNet.Send(17591, i, r, n.PreContextId, n.ContextId);
      if (BulletConstant_1.BulletConstant.OpenCreateLog) {
        if (a) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Bullet", 17, "创建本地子弹", ...BulletLog_1.BulletLog.ToPairs(n));
          }
        } else if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Bullet", 17, "创建同步子弹", ["skillId", n.BulletInitParams.SkillId], ["Location", o], ["Rotation", l], ["TargetId", t], ...BulletLog_1.BulletLog.ToPairs(n));
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