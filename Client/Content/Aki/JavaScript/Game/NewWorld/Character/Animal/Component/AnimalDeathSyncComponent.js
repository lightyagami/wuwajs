"use strict";

var __decorate = this && this.__decorate || function (e, t, i, n) {
  var o;
  var s = arguments.length;
  var r = s < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, i, n);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (o = e[h]) {
        r = (s < 3 ? o(r) : s > 3 ? o(t, i, r) : o(t, i)) || r;
      }
    }
  }
  if (s > 3 && r) {
    Object.defineProperty(t, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimalDeathSyncComponent = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const BaseDeathComponent_1 = require("../../Common/Component/Abilities/BaseDeathComponent");
const CharacterUnifiedStateTypes_1 = require("../../Common/Component/Abilities/CharacterUnifiedStateTypes");
const DISAPPEAR_REMOVE_DELAY = 1600;
let AnimalDeathSyncComponent = class AnimalDeathSyncComponent extends BaseDeathComponent_1.BaseDeathComponent {
  constructor() {
    super(...arguments);
    this.Xte = undefined;
    this.HBr = undefined;
    this.gne = e => {
      if (e.DamageId !== 0 && !this.Xte.HasTag(501201000) && !this.Xte.HasTag(1008164187)) {
        this.Entity.GetComponent(48)?.DisableAi("动物死亡");
        this.Xte?.AddTag(1008164187);
        ControllerHolder_1.ControllerHolder.CreatureController.AnimalDieRequest(this.Entity.GetComponent(0).GetCreatureDataId(), this.Entity.GetComponent(1).ActorLocationProxy);
      }
    };
    this.PlayDieAnimation = () => {
      if (this.Xte.HasTag(-1943786195) || !this.MontageComponent?.Valid) {
        this.OnDeathEnded();
      } else if (this.Xte.HasTag(1961456719)) {
        TimerSystem_1.TimerSystem.Delay(this.OnDeathEnded, DISAPPEAR_REMOVE_DELAY);
      } else if (this.HBr.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Water) {
        this.PlayDeathMontageWithType(1, this.OnDeathEnded, undefined, true);
      } else {
        this.PlayDeathMontageWithType(0, this.OnDeathEnded, undefined, true);
      }
    };
    this.OnDeathEnded = () => {
      this.Entity.Disable("[BaseAttributeComponent.DieAnimationFinished] 死亡动画播放完后隐藏");
      this.Entity.GetComponent(45)?.CancelForceDisableAnimOptimization(6);
      ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(this.Entity);
    };
  }
  OnStart() {
    return !!super.OnStart() && (this.Xte = this.Entity.CheckGetComponent(215), this.HBr = this.Entity.CheckGetComponent(109), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharBeHitLocal, this.gne), this.Entity.CheckGetComponent(0).GetLivingStatus() === Protocol_1.Aki.Protocol.JEs.Proto_Dead && TimerSystem_1.TimerSystem.Next(() => {
      this.ExecuteDeath(undefined);
    }), true);
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharBeHitLocal, this.gne);
    return true;
  }
  ExecuteDeath(e) {
    return !!super.ExecuteDeath(e) && (this.Xte?.AddTag(1008164187), this.HBr?.ResetCharState(), this.PlayDieAnimation(), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CharOnRoleDead, this.Entity.Id), EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf), true);
  }
};
AnimalDeathSyncComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(179)], AnimalDeathSyncComponent);
exports.AnimalDeathSyncComponent = AnimalDeathSyncComponent; //# sourceMappingURL=AnimalDeathSyncComponent.js.map