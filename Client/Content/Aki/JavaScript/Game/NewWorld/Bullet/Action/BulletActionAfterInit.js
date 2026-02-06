"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletActionAfterInit = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
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
    var r = this.BulletInfo;
    var i = r.BulletDataMain;
    var n = r.Attacker;
    var i = i.Execution.SendGameplayEventTagToAttackerOnStart;
    if (i && i.TagName !== StringUtils_1.NONE_STRING && (l = r.AttackerActorComp?.Owner)?.IsValid()) {
      (e = new UE.GameplayEventData()).OptionalObject = r.Actor;
      UE.AbilitySystemBlueprintLibrary.SendGameplayEventToActor(l, i, e);
    }
    if (Info_1.Info.IsBuildDevelopmentOrDebug) {
      EventSystem_1.EventSystem.EmitWithTarget(n, EventDefine_1.EEventName.BulletCreate, r);
    }
    r.IsInit = true;
    r.ActionLogicComponent.OnAfterInit();
    if (r.BulletInitParams.FromRemote) {
      if (BulletConstant_1.BulletConstant.OpenCreateLog) {
        BulletLog_1.BulletLog.Debug(n, "创建被同步子弹", ...BulletLog_1.BulletLog.ToPairs(r));
      }
    } else {
      l = {
        cVn: r.BulletEntityId,
        W5n: ModelManager_1.ModelManager.CreatureModel.GetPlayerId()
      };
      ModelManager_1.ModelManager.BulletModel.RegisterBullet(l, r.BulletEntityId);
      i = r.BulletInitParams.SyncType !== 1;
      e = r.GetActorLocation();
      t = r.MoveInfo.BeginSpeedRotator;
      (o = Protocol_1.Aki.Protocol.ee_.create()).uVn = l;
      o.Mjn = MathUtils_1.MathUtils.NumberToLong(Number(r.BulletRowName));
      o.r5n = r.BulletInitParams.SkillId;
      o.P5n = e;
      o.g8n = t;
      o.Sjn = ModelManager_1.ModelManager.BulletModel.GetBulletHandleById(r.BulletInitParams.ParentId);
      o.Ejn = MathUtils_1.MathUtils.NumberToLong(ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(r.BulletInitParams.BaseTransformId));
      o.yjn = MathUtils_1.MathUtils.NumberToLong(ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(r.BulletInitParams.BaseVelocityId));
      l = EntitySystem_1.EntitySystem.GetComponent(r.TargetId, 0)?.GetCreatureDataId() ?? 0;
      o.CVn = MathUtils_1.MathUtils.NumberToLong(l);
      o.Ijn = i;
      o.Tjn = r.BulletInitParams.DtType;
      o.Ljn = r.RandomPosOffset;
      o.Djn = r.RandomInitSpeedOffset;
      this.lra(o);
      CombatMessage_1.CombatNet.Send(18137, n, o, r.PreContextId, r.ContextId);
      if (BulletConstant_1.BulletConstant.OpenCreateLog) {
        if (i) {
          BulletLog_1.BulletLog.Debug(n, "创建本地子弹", ...BulletLog_1.BulletLog.ToPairs(r));
        } else {
          BulletLog_1.BulletLog.Debug(n, "创建同步子弹", ["skillId", r.BulletInitParams.SkillId], ["Location", e], ["Rotation", t], ["TargetId", l], ...BulletLog_1.BulletLog.ToPairs(r));
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