"use strict";
var _a;
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.UpdateRateOptimizeController = void 0;
const UE = require("ue"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine"),
  GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager"),
  GlobalData_1 = require("../../GlobalData"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  RAYTRACING_URO_CHECK_DISTANCE = 12e4,
  DELAY_ENABLE_URO_TIME = 3e3;
class UpdateRateOptimizeController extends ControllerBase_1.ControllerBase {
  static get CurFrameValidEntityHandles() {
    return this.EntityHandlesCache[this.CurIndex]
  }
  static get LastFrameValidEntityHandles() {
    return this.EntityHandlesCache[1 - this.CurIndex]
  }
  static OnInit() {
    return this.IsEnableRayTraceReflection = !!GameSettingsManager_1.GameSettingsManager.GetCurrentValueSafely(GameSettingsDefine_1.EFunction.RayTracedReflection, 0), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpdateRayTraceReflection, this.UpdateRayTraceReflection), super.OnInit()
  }
  static OnTick(t) {
    if (this.IsEnableRayTraceReflection) {
      this.TempEntities.length = 0, UE.KuroRenderingRuntimeBPPluginBPLibrary.GetDisableNPCOptAsRayTracing(GlobalData_1.GlobalData.World) && ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(RAYTRACING_URO_CHECK_DISTANCE, 62, this.TempEntities, !0, !1), this.EnableUpdateRateOptimizationForArray(!1, this.TempEntities, t => {
        this.CurFrameValidEntityHandles.add(t), this.LastFrameValidEntityHandles.delete(t), this.PendingEnableEntityHandles.delete(t)
      });
      for (const a of this.LastFrameValidEntityHandles) this.PendingEnableEntityHandles.set(a, 0);
      this.LastFrameValidEntityHandles.clear(), this.TempEntities.length = 0;
      for (var [e, i] of this.PendingEnableEntityHandles) e?.Valid && i < DELAY_ENABLE_URO_TIME ? this.PendingEnableEntityHandles.set(e, i + t) : (this.TempEntities.push(e), this.PendingEnableEntityHandles.delete(e));
      this.EnableUpdateRateOptimizationForArray(!0, this.TempEntities), this.CurIndex = 1 - this.CurIndex
    } else this.EnableUpdateRateOptimizationForSet(!0, this.LastFrameValidEntityHandles), this.EnableUpdateRateOptimizationForMap(!0, this.PendingEnableEntityHandles), this.ResetState()
  }
  static OnClear() {
    return this.ResetState(), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdateRayTraceReflection, this.UpdateRayTraceReflection), !0
  }
  static OnLeaveLevel() {
    return this.ResetState(), !0
  }
  static ResetState() {
    this.TempEntities.length = 0, this.CurFrameValidEntityHandles.clear(), this.LastFrameValidEntityHandles.clear(), this.PendingEnableEntityHandles.clear()
  }
  static EnableUpdateRateOptimizationForArray(t, e, i) {
    if (0 !== e.length)
      for (const r of e) {
        var a = r.EntityType !== Protocol_1.Aki.Protocol.kks.HI_ ? r.Entity?.GetComponent(44) : r.Entity?.GetComponent(235);
        a && (t ? a.CancelForceDisableAnimOptimization(5) : a.StartForceDisableAnimOptimization2(5), i?.call(this, r))
      }
  }
  static EnableUpdateRateOptimizationForSet(t, e, i) {
    if (0 !== e.size)
      for (const r of e) {
        var a = r.EntityType !== Protocol_1.Aki.Protocol.kks.HI_ ? r.Entity?.GetComponent(44) : r.Entity?.GetComponent(235);
        a && (t ? a.CancelForceDisableAnimOptimization(5) : a.StartForceDisableAnimOptimization2(5), i?.call(this, r))
      }
  }
  static EnableUpdateRateOptimizationForMap(t, e, i) {
    if (0 !== e.size)
      for (const r of e.keys()) {
        var a = r.EntityType !== Protocol_1.Aki.Protocol.kks.HI_ ? r.Entity?.GetComponent(44) : r.Entity?.GetComponent(235);
        a && (t ? a.CancelForceDisableAnimOptimization(5) : a.StartForceDisableAnimOptimization2(5), i?.call(this, r))
      }
  }
}
exports.UpdateRateOptimizeController = UpdateRateOptimizeController, (_a = UpdateRateOptimizeController).IsEnableRayTraceReflection = !1, UpdateRateOptimizeController.CurIndex = 0, UpdateRateOptimizeController.EntityHandlesCache = [new Set, new Set], UpdateRateOptimizeController.PendingEnableEntityHandles = new Map, UpdateRateOptimizeController.TempEntities = new Array, UpdateRateOptimizeController.UpdateRayTraceReflection = t => {
  _a.IsEnableRayTraceReflection !== t && (_a.IsEnableRayTraceReflection = t)
};
//# sourceMappingURL=UpdateRateOptimizeController.js.map