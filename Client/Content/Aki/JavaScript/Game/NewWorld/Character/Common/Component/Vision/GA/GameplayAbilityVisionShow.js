"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayAbilityVisionShow = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol");
const CollisionUtils_1 = require("../../../../../../../Core/Utils/CollisionUtils");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil");
const GameplayAbilityVisionBase_1 = require("./GameplayAbilityVisionBase");
const GameplayAbilityVisionMisc_1 = require("./GameplayAbilityVisionMisc");
class GameplayAbilityVisionShow extends GameplayAbilityVisionBase_1.GameplayAbilityVisionBase {
  constructor() {
    super(...arguments);
    this.MZo = undefined;
    this.OZo = undefined;
    this.kZo = undefined;
    this.FZo = i => {
      if (this.MZo && i.BulletDataMain.Execution.SendGameplayEventTagToAttackerOnEnd.TagId === -1140906579 && !this.GameplayTagComponent.HasTag(GameplayAbilityVisionMisc_1.morphTag)) {
        this.VZo(i.MoveInfo.LastFramePosition.ToUeVector());
      }
    };
  }
  OnCreate() {
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.BulletDestroy, this.FZo);
  }
  OnDestroy() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.BulletDestroy, this.FZo);
  }
  OnActivateAbility() {
    return !!this.HZo() && (this.SkillComponent.PlaySkillMontage(0, "", 0, () => {
      this.SkillComponent.EndSkill(this.SkillComponent.CurrentSkill?.SkillId ?? 0, "GameplayAbilityVisionShow.OnActivateAbility");
    }), true);
  }
  HZo() {
    this.MZo = PhantomUtil_1.PhantomUtil.GetSummonedEntity(this.VisionComponent.Entity, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision);
    return !this.MZo.Entity.Active && (this.OZo = this.MZo.Entity.GetComponent(3), this.kZo = this.MZo.Entity.GetComponent(41), true);
  }
  VZo(i) {
    let t = 1;
    var e = this.OZo.Actor;
    if (e.IsA(UE.BP_BaseVision_C.StaticClass())) {
      t = e.显像放大比例.Z;
    }
    var e = new UE.VectorDouble(0, 0, this.OZo.ScaledHalfHeight * t);
    this.OZo.SetActorLocationAndRotation(i.op_Addition(e), this.ActorComponent.ActorRotation, "召唤展示生成位置");
    ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(this.MZo.Entity, true, "GameplayAbilityVisionShow.SetVisionEnable", true);
    this.aZo(true);
    this.kZo.BeginSkillAsync(GameplayAbilityVisionMisc_1.EXPLORE_SKILL_ID, {
      Reason: "GameplayAbilityVisionShow.PostSummon"
    });
  }
  aZo(i) {
    CollisionUtils_1.CollisionUtils.SetCollisionResponseToPawn(this.OZo.Actor.CapsuleComponent, 2, i ? 2 : 0);
    this.OZo.Actor.CapsuleComponent.IgnoreActorWhenMoving(this.ActorComponent.Actor, !i);
    this.ActorComponent.Actor.CapsuleComponent.IgnoreActorWhenMoving(this.OZo.Actor, !i);
  }
}
exports.GameplayAbilityVisionShow = GameplayAbilityVisionShow;
//# sourceMappingURL=GameplayAbilityVisionShow.js.map