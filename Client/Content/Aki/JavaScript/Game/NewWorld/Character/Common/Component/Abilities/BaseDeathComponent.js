"use strict";

var __decorate = this && this.__decorate || function (t, e, o, a) {
  var n;
  var i = arguments.length;
  var h = i < 3 ? e : a === null ? a = Object.getOwnPropertyDescriptor(e, o) : a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, o, a);
  } else {
    for (var s = t.length - 1; s >= 0; s--) {
      if (n = t[s]) {
        h = (i < 3 ? n(h) : i > 3 ? n(e, o, h) : n(e, o)) || h;
      }
    }
  }
  if (i > 3 && h) {
    Object.defineProperty(e, o, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseDeathComponent = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const CombatLog_1 = require("../../../../../Utils/CombatLog");
const deathMontagePathMap = new Map([[0, "AM_Death"], [1, "AM_Death_InWater"], [2, "AM_Death_InAir"], [3, "AM_Death_Falling"]]);
let BaseDeathComponent = class BaseDeathComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.IsDeadInternal = false;
    this.MontageComponent = undefined;
    this.c2c = new Map();
    this.AOr = 0;
    this.u2c = new Map();
  }
  OnStart() {
    this.MontageComponent = this.Entity.CheckGetComponent(24);
    this.d2c();
    return true;
  }
  IsDead() {
    return this.IsDeadInternal;
  }
  ExecuteDeath(t) {
    if (this.IsDeadInternal) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 19, "实体重复死亡", ["entityId", this.Entity.Id]);
      }
      return false;
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Battle", 19, "[DeathComponent]执行角色死亡逻辑", ["Entity", this.Entity.toString()], ["PbDataId", this.Entity?.GetComponent(0)?.GetPbDataId()]);
      }
      return this.IsDeadInternal = true;
    }
  }
  HasDeathMontage(t) {
    return this.c2c.has(t) || this.u2c.has(t);
  }
  GetDeathMontage(t) {
    return this.c2c.get(t);
  }
  GetDeathMontageName(t) {
    return deathMontagePathMap.get(t);
  }
  PlayDeathMontageWithType(t, e, o) {
    let a = undefined;
    var n = this.u2c.get(t);
    if (n && n.size > 0) {
      let t = undefined;
      for (t of n.values());
      if (t) {
        a = this.MontageComponent.CreateTaskWithName(t, undefined, e);
      }
    } else {
      var n = this.GetDeathMontage(t);
      if (n) {
        a = this.MontageComponent.CreateTaskWithMontage(n, undefined, e);
      }
    }
    if (a === undefined) {
      n = deathMontagePathMap.get(t);
      CombatLog_1.CombatLog.Warn("Animation", this.Entity, "蒙太奇播放失败", ["montageType", t], ["path", n]);
      e?.(true);
    } else {
      this.MontageComponent.PlayMontageTaskWhenReady(a, 0, o);
    }
  }
  ReplaceDeathMontage(t, e) {
    let o = this.u2c.get(t);
    if (!o) {
      this.u2c.set(t, o = new Map());
    }
    o.set(++this.AOr, e);
    return this.AOr;
  }
  ResetDeathMontage(t) {
    for (const e of this.u2c.values()) {
      e?.delete(t);
    }
  }
  d2c() {
    for (var [t, e] of deathMontagePathMap.entries()) {
      e = this.MontageComponent.GetMontageByName(e);
      if (e) {
        this.c2c.set(t, e);
      }
    }
  }
};
BaseDeathComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(15)], BaseDeathComponent);
exports.BaseDeathComponent = BaseDeathComponent; //# sourceMappingURL=BaseDeathComponent.js.map