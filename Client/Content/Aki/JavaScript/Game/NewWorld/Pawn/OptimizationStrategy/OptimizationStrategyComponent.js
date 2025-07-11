"use strict";

var OptimizationStrategyComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, n) {
  var o;
  var s = arguments.length;
  var r = s < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, i, n);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (o = t[a]) {
        r = (s < 3 ? o(r) : s > 3 ? o(e, i, r) : o(e, i)) || r;
      }
    }
  }
  if (s > 3 && r) {
    Object.defineProperty(e, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptimizationStrategyComponent = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const OptimizationStragyHelper_1 = require("./OptimizationStragyHelper");
let OptimizationStrategyComponent = OptimizationStrategyComponent_1 = class OptimizationStrategyComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.vtn = undefined;
    this.S7c = undefined;
    this.Uai = false;
    this.M7c = undefined;
    this.Rnn = () => {
      this.Uai = true;
    };
    this.E7c = t => {
      if (this.Uai) {
        this.I7c(t);
      }
    };
    this.H0n = (t, e) => {
      if (this.Uai) {
        this.T7c(t, e);
      }
    };
  }
  OnInitData(t) {
    var t = t.GetParam(OptimizationStrategyComponent_1);
    if (!t || t.length <= 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 57, "[OptimizationStrategyComponent] 初始化基础数据失败");
      }
      return false;
    } else if (t = t[0]) {
      this.M7c = t.PerformanceOptimizationList;
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 57, "[OptimizationStrategyComponent] 初始化数据失败");
      }
      return false;
    }
  }
  OnStart() {
    this.vtn = this.Entity.GetComponent(86);
    if (this.vtn) {
      this.S7c = new Array();
      this.b7c();
      this.R7c();
      if (!EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.E7c)) {
        EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.E7c);
      }
      if (!EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnEntityInOutRangeLocal, this.H0n)) {
        EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnEntityInOutRangeLocal, this.H0n);
      }
      this.Rnn();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Optimization", 57, "[OptimizationStrategyComponent] OnStart");
      }
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Optimization", 57, "[OptimizationStrategyComponent] 组件缺失", ["RangeComponent", !!this.vtn]);
      }
      return false;
    }
  }
  b7c() {
    if (this.M7c && this.M7c.length !== 0) {
      this.M7c.forEach(t => {
        this.AddOptimizationStrategy(t.Type);
      });
    }
  }
  AddOptimizationStrategy(t) {
    var e = OptimizationStragyHelper_1.EPerformanceOptimizationMap[t];
    if (e) {
      e = new e();
      this.S7c.push(e);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Optimization", 57, "[OptimizationStrategyComponent] AddOptimizationStrategy", ["type", t]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Optimization", 57, "[OptimizationStrategyComponent] 未找到对应的Profile", ["type", t]);
    }
  }
  R7c() {
    for (const t of this.S7c) {
      t.Enable();
    }
  }
  I7c(t) {
    for (const e of this.S7c) {
      e.MyPlayerEntityInOutRange(t);
    }
  }
  T7c(t, e) {
    for (const i of this.S7c) {
      i.EntityInOutRange(t, e);
    }
  }
  w7c() {
    for (const t of this.S7c) {
      t.Disable();
    }
  }
  OnEnd() {
    this.w7c();
    this.S7c = undefined;
    this.Uai = false;
    if (!EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.E7c)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.E7c);
    }
    if (!EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnEntityInOutRangeLocal, this.H0n)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnEntityInOutRangeLocal, this.H0n);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Optimization", 57, "[OptimizationStrategyComponent] OnEnd");
    }
    return true;
  }
};
OptimizationStrategyComponent = OptimizationStrategyComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(218)], OptimizationStrategyComponent);
exports.OptimizationStrategyComponent = OptimizationStrategyComponent; //# sourceMappingURL=OptimizationStrategyComponent.js.map