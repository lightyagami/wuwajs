"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletActionDestroyBullet = undefined;
const UE = require("ue");
const Stats_1 = require("../../../../Core/Common/Stats");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BulletController_1 = require("../BulletController");
const BulletCollisionUtil_1 = require("../BulletStaticMethod/BulletCollisionUtil");
const BulletHitCountUtil_1 = require("../BulletStaticMethod/BulletHitCountUtil");
const BulletStaticFunction_1 = require("../BulletStaticMethod/BulletStaticFunction");
const BulletUtil_1 = require("../BulletUtil");
const BulletActionBase_1 = require("./BulletActionBase");
class BulletActionDestroyBullet extends BulletActionBase_1.BulletActionBase {
  OnExecute() {
    var t = this.ActionInfo;
    if (t.SummonChild) {
      this.BulletInfo.ChildInfo?.SetIsActiveSummonChildBullet(true);
    }
    if (t.DestroyReason === 1) {
      this.U5o();
    }
    if (this.BulletInfo.AttackerHandle?.Valid && this.BulletInfo.AttackerActorComp?.Actor) {
      BulletActionDestroyBullet.A5o.Start();
      this.P5o();
      BulletActionDestroyBullet.A5o.Stop();
      this.x5o();
    }
    BulletActionDestroyBullet.w5o.Start();
    this.B5o();
    BulletActionDestroyBullet.w5o.Stop();
    this.b5o();
    if (this.BulletInfo.NeedNotifyChildrenWhenDestroy && this.BulletInfo.ChildEntityIds) {
      for (const o of this.BulletInfo.ChildEntityIds) {
        BulletController_1.BulletController.DestroyBullet(o, false, 1);
      }
    }
    var e;
    var l;
    var t = this.BulletInfo.CollisionInfo;
    for ([e, l] of t.HitTimeScaleEntityMap.entries()) {
      var i = ModelManager_1.ModelManager.CharacterModel?.GetHandle(e);
      if (i?.Valid) {
        i.Entity.GetComponent(126)?.RemoveTimeScale(l);
      }
    }
    t.HitTimeScaleEntityMap.clear();
    for (const s of t.LastArrayHitActorData) {
      if (s.IsValidHit) {
        BulletCollisionUtil_1.BulletCollisionUtil.EntityLeave(this.BulletInfo, s);
      }
    }
  }
  U5o() {
    if (BulletHitCountUtil_1.BulletHitCountUtil.CheckHitCountTotal(this.BulletInfo)) {
      BulletStaticFunction_1.BulletStaticFunction.SpawnHitEffect(this.BulletInfo, 8, "[BulletActionDestroyBullet.OnParentDestroy]");
      this.BulletInfo.ChildInfo?.SetIsNumberNotEnough(true);
    }
  }
  x5o() {
    var t;
    var e;
    if (this.BulletInfo.AttackerActorComp?.Actor?.IsValid() && (t = this.BulletInfo.BulletDataMain.Execution.SendGameplayEventTagToAttackerOnEnd, EventSystem_1.EventSystem.EmitWithTarget(this.BulletInfo.Attacker, EventDefine_1.EEventName.BulletDestroy, this.BulletInfo), t) && t.TagName !== StringUtils_1.NONE_STRING) {
      (e = new UE.GameplayEventData()).OptionalObject = this.BulletInfo.Actor;
      UE.AbilitySystemBlueprintLibrary.SendGameplayEventToActor(this.BulletInfo.AttackerActorComp.Actor, t, e);
    }
  }
  b5o() {
    var t = this.BulletInfo.BulletDataMain;
    if (this.BulletInfo.SummonServerEntityId !== 0 && !(t.Summon.EntityId <= 0) && !!t.Summon.DestroyEntityOnBulletEnd) {
      ControllerHolder_1.ControllerHolder.CreatureController.RemoveSummonEntityByServerIdRequest(this.BulletInfo.BulletInitParams.SkillId, this.BulletInfo.SummonAttackerId, this.BulletInfo.SummonServerEntityId);
    }
  }
  P5o() {
    var e = this.BulletInfo.ChildInfo;
    var l = this.BulletInfo.BulletDataMain.Children;
    var i = l.length;
    for (let t = 0; t < i; ++t) {
      var o;
      var s = l[t];
      if (s.Condition === 4 && this.BulletInfo.IsTimeNotEnough || s.Condition === 3 && e.IsNumberNotEnough || s.Condition === 0 && e.IsActiveSummonChildBullet) {
        o = Number(s.RowName);
        if (!isNaN(o) && !!o && !(s.Num < 1)) {
          if (o = BulletController_1.BulletController.CreateBulletCustomTarget(this.BulletInfo.AttackerActorComp.Actor, s.RowName.toString(), this.BulletInfo.ActorComponent.ActorTransform, {
            SkillId: this.BulletInfo.BulletInitParams.SkillId,
            SkillContextId: this.BulletInfo.BulletInitParams.SkillContextId,
            ParentTargetId: this.BulletInfo.Target?.Id,
            ParentId: this.BulletInfo.Entity.Id,
            DtType: this.BulletInfo.BulletInitParams.DtType,
            BattleFlags: this.BulletInfo.BulletInitParams.BattleFlags,
            ParentIds: undefined
          }, this.BulletInfo.ContextId)) {
            BulletUtil_1.BulletUtil.ProcessHandOverEffectToSon(this.BulletInfo, o);
          }
        }
      }
    }
  }
  B5o() {
    if (this.BulletInfo.IsDestroyByCharSkillEnd) {
      BulletActionDestroyBullet.q5o.Start();
      BulletStaticFunction_1.BulletStaticFunction.SpawnHitEffect(this.BulletInfo, 1, "[BulletActionDestroyBullet.BulletEffectOnDestroy] 1");
      BulletActionDestroyBullet.q5o.Stop();
    }
    if (this.BulletInfo.IsTimeNotEnough) {
      BulletActionDestroyBullet.G5o.Start();
      BulletStaticFunction_1.BulletStaticFunction.SpawnHitEffect(this.BulletInfo, 0, "[BulletActionDestroyBullet.BulletEffectOnDestroy] 2");
      BulletActionDestroyBullet.G5o.Stop();
    }
    BulletActionDestroyBullet.N5o.Start();
    this.BulletInfo.ActionLogicComponent.ActionDestroy();
    BulletActionDestroyBullet.N5o.Stop();
    if (this.ActionInfo.DestroyEffectImmediately) {
      this.BulletInfo.EffectInfo.IsFinishAuto = false;
    }
    BulletStaticFunction_1.BulletStaticFunction.DestroyEffect(this.BulletInfo);
  }
}
(exports.BulletActionDestroyBullet = BulletActionDestroyBullet).A5o = Stats_1.Stat.Create("BulletDataComp.ChildOnDestroy");
BulletActionDestroyBullet.w5o = Stats_1.Stat.Create("BulletDataComp.EffectOnDestroy");
BulletActionDestroyBullet.G5o = Stats_1.Stat.Create("SpawnHitEffect");
BulletActionDestroyBullet.N5o = Stats_1.Stat.Create("ActionDestroy");
BulletActionDestroyBullet.q5o = Stats_1.Stat.Create("ActionBreakEffect"); //# sourceMappingURL=BulletActionDestroyBullet.js.map