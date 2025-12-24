"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var o;
  var n = arguments.length;
  var h = n < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, i, s);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (o = t[r]) {
        h = (n < 3 ? o(h) : n > 3 ? o(e, i, h) : o(e, i)) || h;
      }
    }
  }
  if (n > 3 && h) {
    Object.defineProperty(e, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseFrozenComponent = undefined;
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
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
        this.ActorComponent?.Actor.StopAnimMontage();
      }
    };
    this.Dbr = new Map();
    this.mdu = new Map();
    this.DBu = 0;
    this.BBu = 0;
    this.FrozenLockSet = new Set();
  }
  OnStart() {
    this.ActorComponent = this.Entity.GetComponent(2);
    this.$br = this.Entity.GetComponent(64);
    this.ybr = this.Entity.CheckGetComponent(131);
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
    var t = this.Entity.CheckGetComponent(215);
    this.Ibr = t.ListenForTagAddOrRemove(2118071836, this.Lbr);
  }
  AddTimeScaleByBuff(t, e, i, s, o) {
    if (!this.Dbr.has(t) && !this.$br?.IsImmuneTimeScaleEffect()) {
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
    let s = i + this.DBu;
    if (s < 0) {
      CombatLog_1.CombatLog.Warn("Buff", this.Entity, "buff额外效果83设置时间碰撞系数小于0,强制设置为0", ["BuffHandleId", t], ["timeDilation", i], ["BaseBuffForeverTimeScale", this.DBu]);
      s = 0;
    }
    i = this.ybr.SetForeverTimeScale(6, s, e);
    this.mdu.set(t, i);
  }
  RemoveForeverTimeScale(t) {
    var e = this.mdu.get(t);
    if (e) {
      this.ybr.RemoveForeverTimeScale(e);
      this.mdu.delete(t);
    }
  }
  SetBuffBaseForeverTimeScale(t) {
    if (this.DBu !== t && (this.DBu = t, this.BBu && (this.ybr.RemoveForeverTimeScale(this.BBu), this.BBu = 0), t > 0)) {
      this.BBu = this.ybr.SetForeverTimeScale(6, t);
    }
  }
  IsFrozen() {
    return false;
  }
  SetFrozen(t) {}
  RefreshFrozen() {
    var t = this.FrozenLockSet.size > 0;
    this.SetFrozen(t);
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharAfterFrozenChange, t);
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