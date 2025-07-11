"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var o;
  var h = arguments.length;
  var n = h < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, i, s);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (o = t[r]) {
        n = (h < 3 ? o(n) : h > 3 ? o(e, i, n) : o(e, i)) || n;
      }
    }
  }
  if (h > 3 && n) {
    Object.defineProperty(e, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseFrozenComponent = undefined;
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const CombatLog_1 = require("../../../../../Utils/CombatLog");
const ETERNAL_DURATION = 10000000;
let BaseFrozenComponent = class BaseFrozenComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ActorComponent = undefined;
    this.$br = undefined;
    this.ybr = undefined;
    this.Ibr = undefined;
    this.Tbr = undefined;
    this.Lbr = (t, e) => {
      if (e) {
        this.ActorComponent.Actor.StopAnimMontage();
      }
    };
    this.Dbr = new Map();
    this.Pcu = new Map();
    this.iBu = 0;
    this.rBu = 0;
    this.FrozenLockSet = new Set();
  }
  OnStart() {
    this.ActorComponent = this.Entity.CheckGetComponent(3);
    this.$br = this.Entity.CheckGetComponent(61);
    this.ybr = this.Entity.CheckGetComponent(122);
    this.Ubr();
    return true;
  }
  OnEnd() {
    if (this.Ibr) {
      this.Ibr.EndTask();
      this.Ibr = undefined;
    }
    if (this.Tbr) {
      this.Tbr.EndTask();
      this.Tbr = undefined;
    }
    return true;
  }
  Ubr() {
    var t = this.Entity.CheckGetComponent(205);
    this.Ibr = t.ListenForTagAddOrRemove(2118071836, this.Lbr);
  }
  AddTimeScaleByBuff(t, e, i, s, o) {
    if (!this.Dbr.has(t) && !this.$br.IsImmuneTimeScaleEffect()) {
      e = this.ybr.SetTimeScale(e, i, o, s ?? ETERNAL_DURATION, 6);
      this.Dbr.set(t, e);
    }
  }
  RemoveTimeScaleByBuff(t) {
    var e = this.Dbr.get(t);
    if (e) {
      this.ybr.RemoveTimeScale(e);
    }
    this.Dbr.delete(t);
  }
  SetForeverTimeScale(t, e, i) {
    this.RemoveForeverTimeScale(t);
    let s = i + this.iBu;
    if (s < 0) {
      CombatLog_1.CombatLog.Error("Buff", this.Entity, "buff额外效果83设置时间碰撞系数小于0,强制设置为0", ["BuffHandleId", t], ["timeDilation", i], ["BaseBuffForeverTimeScale", this.iBu]);
      s = 0;
    }
    i = this.ybr.SetForeverTimeScale(6, s, e);
    this.Pcu.set(t, i);
  }
  RemoveForeverTimeScale(t) {
    var e = this.Pcu.get(t);
    if (e) {
      this.ybr.RemoveForeverTimeScale(e);
      this.Pcu.delete(t);
    }
  }
  SetBuffBaseForeverTimeScale(t) {
    if (this.iBu !== t && (this.iBu = t, this.rBu && (this.ybr.RemoveForeverTimeScale(this.rBu), this.rBu = 0), t > 0)) {
      this.rBu = this.ybr.SetForeverTimeScale(6, t);
    }
  }
  IsFrozen() {
    return false;
  }
  SetFrozen(t) {}
  RefreshFrozen() {
    this.SetFrozen(this.FrozenLockSet.size > 0);
  }
  LockFrozen(t) {
    this.FrozenLockSet.add(t);
    this.RefreshFrozen();
  }
  UnlockFrozen(t) {
    this.FrozenLockSet.delete(t);
    this.RefreshFrozen();
  }
};
BaseFrozenComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(16)], BaseFrozenComponent);
exports.BaseFrozenComponent = BaseFrozenComponent; //# sourceMappingURL=BaseFrozenComponent.js.map