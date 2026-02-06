"use strict";

var __decorate = this && this.__decorate || function (e, t, o, r) {
  var n;
  var i = arguments.length;
  var a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, o) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(e, t, o, r);
  } else {
    for (var s = e.length - 1; s >= 0; s--) {
      if (n = e[s]) {
        a = (i < 3 ? n(a) : i > 3 ? n(t, o, a) : n(t, o)) || a;
      }
    }
  }
  if (i > 3 && a) {
    Object.defineProperty(t, o, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UeActorTickManageComponent = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const PerformanceController_1 = require("../../../../Core/Performance/PerformanceController");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
let UeActorTickManageComponent = class UeActorTickManageComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
  }
  static get Dependencies() {
    return [1];
  }
  OnInitData(e) {
    this.Hte = this.Entity.GetComponent(1);
    return true;
  }
  OnActivate() {
    this.Hte.Owner.SetKuroOnlyTickOutside(true);
  }
  OnTick(e) {
    let t = undefined;
    if (PerformanceController_1.PerformanceController.IsOpenCatchWorldEntity) {
      let e = `DeltaSeconds: ${this.Entity.GetDeltaSeconds().toFixed(2)}, TickInterval: ${this.Entity.GetTickInterval()}, Distance: ${this.Entity.DistanceWithCamera.toFixed(2)}`;
      var o = this.Entity.GetComponent(186);
      if (o) {
        o = o.IsInFighting;
        e += " IsInFight: " + o;
      }
      t = Stats_1.Stat.CreateNoFlameGraph(e);
    }
    t?.Start();
    this.Hte.Owner.KuroTickActorOutside(e * MathUtils_1.MathUtils.MillisecondToSecond);
    t?.Stop();
  }
  DisableTickWithLog(e) {
    var t = this.Disable(e);
    if (ControllerHolder_1.ControllerHolder.CreatureController.CheckEnableEntityLog(this.Hte.CreatureData?.GetEntityType()) && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Entity", 3, "DisableTick", ["CreatureDataId", this.Hte.CreatureData?.GetCreatureDataId()], ["PbDataId", this.Hte.CreatureData?.GetPbDataId()], ["Handle", t], ["Reason", e]);
    }
    return t;
  }
  EnableTickWithLog(e, t) {
    if (ControllerHolder_1.ControllerHolder.CreatureController.CheckEnableEntityLog(this.Hte.CreatureData?.GetEntityType()) && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Entity", 3, "EnableTick", ["CreatureDataId", this.Hte.CreatureData?.GetCreatureDataId()], ["PbDataId", this.Hte.CreatureData?.GetPbDataId()], ["Handle", e], ["Reason", t]);
    }
    return this.Enable(e, t);
  }
  DumpDisableTickInfo() {
    return this.DumpDisableInfo();
  }
};
UeActorTickManageComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(122)], UeActorTickManageComponent);
exports.UeActorTickManageComponent = UeActorTickManageComponent; //# sourceMappingURL=UeActorTickManageComponent.js.map