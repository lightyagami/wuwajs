"use strict";
var __decorate = this && this.__decorate || function(t, e, o, a) {
  var n, i = arguments.length,
    h = i < 3 ? e : null === a ? a = Object.getOwnPropertyDescriptor(e, o) : a;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) h = Reflect.decorate(t, e, o, a);
  else
    for (var s = t.length - 1; 0 <= s; s--)(n = t[s]) && (h = (i < 3 ? n(h) : 3 < i ? n(e, o, h) : n(e, o)) || h);
  return 3 < i && h && Object.defineProperty(e, o, h), h
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BaseDeathComponent = void 0;
const Log_1 = require("../../../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  CombatLog_1 = require("../../../../../Utils/CombatLog"),
  deathMontagePathMap = new Map([
    [0, "AM_Death"],
    [1, "AM_Death_InWater"],
    [2, "AM_Death_InAir"],
    [3, "AM_Death_Falling"]
  ]);
let BaseDeathComponent = class BaseDeathComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), this.IsDeadInternal = !1, this.MontageComponent = void 0, this.c2c = new Map, this.AOr = 0, this.u2c = new Map
  }
  OnStart() {
    return this.MontageComponent = this.Entity.CheckGetComponent(24), this.d2c(), !0
  }
  IsDead() {
    return this.IsDeadInternal
  }
  ExecuteDeath(t) {
    return this.IsDeadInternal ? (Log_1.Log.CheckError() && Log_1.Log.Error("Character", 19, "实体重复死亡", ["entityId", this.Entity.Id]), !1) : (Log_1.Log.CheckInfo() && Log_1.Log.Info("Battle", 19, "[DeathComponent]执行角色死亡逻辑", ["Entity", this.Entity.toString()], ["PbDataId", this.Entity?.GetComponent(0)?.GetPbDataId()]), this.IsDeadInternal = !0)
  }
  HasDeathMontage(t) {
    return this.c2c.has(t) || this.u2c.has(t)
  }
  GetDeathMontage(t) {
    return this.c2c.get(t)
  }
  GetDeathMontageName(t) {
    return deathMontagePathMap.get(t)
  }
  PlayDeathMontageWithType(t, e, o) {
    let a = void 0;
    var n = this.u2c.get(t);
    if (n && 0 < n.size) {
      let t = void 0;
      for (t of n.values());
      t && (a = this.MontageComponent.CreateTaskWithName(t, void 0, e))
    } else {
      var n = this.GetDeathMontage(t);
      n && (a = this.MontageComponent.CreateTaskWithMontage(n, void 0, e))
    }
    void 0 === a ? (n = deathMontagePathMap.get(t), CombatLog_1.CombatLog.Warn("Animation", this.Entity, "蒙太奇播放失败", ["montageType", t], ["path", n]), e?.(!0)) : this.MontageComponent.PlayMontageTaskWhenReady(a, 0, o)
  }
  ReplaceDeathMontage(t, e) {
    let o = this.u2c.get(t);
    return o || this.u2c.set(t, o = new Map), o.set(++this.AOr, e), this.AOr
  }
  ResetDeathMontage(t) {
    for (const e of this.u2c.values()) e?.delete(t)
  }
  d2c() {
    for (var [t, e] of deathMontagePathMap.entries()) {
      e = this.MontageComponent.GetMontageByName(e);
      e && this.c2c.set(t, e)
    }
  }
};
BaseDeathComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(15)], BaseDeathComponent), exports.BaseDeathComponent = BaseDeathComponent;
//# sourceMappingURL=BaseDeathComponent.js.map