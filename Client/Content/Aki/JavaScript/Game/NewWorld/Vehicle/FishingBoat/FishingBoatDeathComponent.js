"use strict";

var __decorate = this && this.__decorate || function (t, e, o, i) {
  var s;
  var n = arguments.length;
  var r = n < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, o) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, o, i);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (s = t[h]) {
        r = (n < 3 ? s(r) : n > 3 ? s(e, o, r) : s(e, o)) || r;
      }
    }
  }
  if (n > 3 && r) {
    Object.defineProperty(e, o, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingBoatDeathComponent = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const BaseDeathComponent_1 = require("../../Character/Common/Component/Abilities/BaseDeathComponent");
let FishingBoatDeathComponent = class FishingBoatDeathComponent extends BaseDeathComponent_1.BaseDeathComponent {
  constructor() {
    super(...arguments);
    this.u1t = undefined;
    this.Xte = undefined;
    this.tRr = undefined;
    this.m1t = undefined;
    this.$te = undefined;
  }
  OnInit() {
    this.u1t = this.Entity.CheckGetComponent(0);
    this.Xte = this.Entity.GetComponent(215);
    this.tRr = this.Entity.GetComponent(40);
    this.m1t = this.Entity.GetComponent(183);
    this.$te = this.Entity.GetComponent(182);
    return true;
  }
  OnStart() {
    return !!super.OnStart() && (this.u1t.GetLivingStatus() === Protocol_1.Aki.Protocol.JEs.Proto_Dead && this.ExecuteDeath(undefined), true);
  }
  ExecuteDeath(t) {
    return !!super.ExecuteDeath(t) && (this.Xte?.AddTag(1008164187), this.tRr?.StopAllSkills("RoleDeathComponent.ExecuteDeath"), this.m1t?.RemoveAllDurationBuffs("实体死亡清理持续型buff"), this.$te?.ClearSpecialEnergy(), this.PlayDeathMontageWithType(0, undefined, t), true);
  }
  ExecuteRevive() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Battle", 48, "执行捕鱼船复活");
    }
    this.IsDeadInternal = false;
    this.Xte?.RemoveTag(1008164187);
  }
};
FishingBoatDeathComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(303)], FishingBoatDeathComponent);
exports.FishingBoatDeathComponent = FishingBoatDeathComponent; //# sourceMappingURL=FishingBoatDeathComponent.js.map