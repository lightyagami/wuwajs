"use strict";
var OptimizationStrategyComponent_1, __decorate = this && this.__decorate || function(t, e, i, n) {
  var o, s = arguments.length,
    r = s < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, i) : n;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(t, e, i, n);
  else
    for (var a = t.length - 1; 0 <= a; a--)(o = t[a]) && (r = (s < 3 ? o(r) : 3 < s ? o(e, i, r) : o(e, i)) || r);
  return 3 < s && r && Object.defineProperty(e, i, r), r
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.OptimizationStrategyComponent = void 0;
const Log_1 = require("../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  OptimizationStragyHelper_1 = require("./OptimizationStragyHelper");
let OptimizationStrategyComponent = OptimizationStrategyComponent_1 = class OptimizationStrategyComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), this.vtn = void 0, this.qgu = void 0, this.Uai = !1, this.Ggu = void 0, this.Rnn = () => {
      this.Uai = !0
    }, this.Fgu = t => {
      this.Uai && this.Ngu(t)
    }, this.H0n = (t, e) => {
      this.Uai && this.Vgu(t, e)
    }
  }
  OnInitData(t) {
    var t = t.GetParam(OptimizationStrategyComponent_1);
    return !t || t.length <= 0 ? (Log_1.Log.CheckError() && Log_1.Log.Error("SceneItem", 57, "[OptimizationStrategyComponent] 初始化基础数据失败"), !1) : (t = t[0]) ? (this.Ggu = t.PerformanceOptimizationList, !0) : (Log_1.Log.CheckError() && Log_1.Log.Error("SceneItem", 57, "[OptimizationStrategyComponent] 初始化数据失败"), !1)
  }
  OnStart() {
    return this.vtn = this.Entity.GetComponent(86), this.vtn ? (this.qgu = new Array, this.jgu(), this.Hgu(), EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.Fgu) || EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.Fgu), EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnEntityInOutRangeLocal, this.H0n) || EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnEntityInOutRangeLocal, this.H0n), this.Rnn(), Log_1.Log.CheckInfo() && Log_1.Log.Info("Optimization", 57, "[OptimizationStrategyComponent] OnStart"), !0) : (Log_1.Log.CheckError() && Log_1.Log.Error("Optimization", 57, "[OptimizationStrategyComponent] 组件缺失", ["RangeComponent", !!this.vtn]), !1)
  }
  jgu() {
    this.Ggu && 0 !== this.Ggu.length && this.Ggu.forEach(t => {
      this.AddOptimizationStrategy(t.Type)
    })
  }
  AddOptimizationStrategy(t) {
    var e = OptimizationStragyHelper_1.EPerformanceOptimizationMap[t];
    e ? (e = new e, this.qgu.push(e), Log_1.Log.CheckInfo() && Log_1.Log.Info("Optimization", 57, "[OptimizationStrategyComponent] AddOptimizationStrategy", ["type", t])) : Log_1.Log.CheckError() && Log_1.Log.Error("Optimization", 57, "[OptimizationStrategyComponent] 未找到对应的Profile", ["type", t])
  }
  Hgu() {
    for (const t of this.qgu) t.Enable()
  }
  Ngu(t) {
    for (const e of this.qgu) e.MyPlayerEntityInOutRange(t)
  }
  Vgu(t, e) {
    for (const i of this.qgu) i.EntityInOutRange(t, e)
  }
  $gu() {
    for (const t of this.qgu) t.Disable()
  }
  OnEnd() {
    return this.$gu(), this.qgu = void 0, this.Uai = !1, EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.Fgu) || EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.Fgu), EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnEntityInOutRangeLocal, this.H0n) || EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnEntityInOutRangeLocal, this.H0n), EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn) && EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn), Log_1.Log.CheckInfo() && Log_1.Log.Info("Optimization", 57, "[OptimizationStrategyComponent] OnEnd"), !0
  }
};
OptimizationStrategyComponent = OptimizationStrategyComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(218)], OptimizationStrategyComponent), exports.OptimizationStrategyComponent = OptimizationStrategyComponent;
//# sourceMappingURL=OptimizationStrategyComponent.js.map