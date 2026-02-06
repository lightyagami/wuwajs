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
    this.d5u = undefined;
    this.Uai = false;
    this.m5u = undefined;
    this.Rnn = () => {
      this.Uai = true;
    };
    this.f5u = t => {
      if (this.Uai) {
        this.g5u(t);
      }
    };
    this.H0n = (t, e) => {
      if (this.Uai) {
        this.C5u(t, e);
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
      this.m5u = t.PerformanceOptimizationList;
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 57, "[OptimizationStrategyComponent] 初始化数据失败");
      }
      return false;
    }
  }
  OnStart() {
    this.vtn = this.Entity.GetComponent(91);
    if (this.vtn) {
      this.d5u = new Array();
      this.p5u();
      this.v5u();
      if (!EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.f5u)) {
        EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.f5u);
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
  p5u() {
    if (this.m5u && this.m5u.length !== 0) {
      this.m5u.forEach(t => {
        this.AddOptimizationStrategy(t.Type);
      });
    }
  }
  AddOptimizationStrategy(t) {
    var e = OptimizationStragyHelper_1.EPerformanceOptimizationMap[t];
    if (e) {
      e = new e();
      this.d5u.push(e);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Optimization", 57, "[OptimizationStrategyComponent] AddOptimizationStrategy", ["type", t]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Optimization", 57, "[OptimizationStrategyComponent] 未找到对应的Profile", ["type", t]);
    }
  }
  v5u() {
    for (const t of this.d5u) {
      t.Enable();
    }
  }
  g5u(t) {
    for (const e of this.d5u) {
      e.MyPlayerEntityInOutRange(t);
    }
  }
  C5u(t, e) {
    for (const i of this.d5u) {
      i.EntityInOutRange(t, e);
    }
  }
  y5u() {
    for (const t of this.d5u) {
      t.Disable();
    }
  }
  OnEnd() {
    this.y5u();
    this.d5u = undefined;
    this.Uai = false;
    if (!EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.f5u)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.f5u);
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
OptimizationStrategyComponent = OptimizationStrategyComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(231)], OptimizationStrategyComponent);
exports.OptimizationStrategyComponent = OptimizationStrategyComponent; //# sourceMappingURL=OptimizationStrategyComponent.js.map