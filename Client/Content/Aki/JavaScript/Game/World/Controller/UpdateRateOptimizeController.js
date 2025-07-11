"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateRateOptimizeController = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine");
const GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const RAYTRACING_URO_CHECK_DISTANCE = 120000;
const DELAY_ENABLE_URO_TIME = 3000;
class UpdateRateOptimizeController extends ControllerBase_1.ControllerBase {
  static get CurFrameValidEntityHandles() {
    return this.EntityHandlesCache[this.CurIndex];
  }
  static get LastFrameValidEntityHandles() {
    return this.EntityHandlesCache[1 - this.CurIndex];
  }
  static OnInit() {
    this.IsEnableRayTraceReflection = !!GameSettingsManager_1.GameSettingsManager.GetCurrentValueSafely(GameSettingsDefine_1.EFunction.RayTracedReflection, 0);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpdateRayTraceReflection, this.UpdateRayTraceReflection);
    return super.OnInit();
  }
  static OnTick(t) {
    if (this.IsEnableRayTraceReflection) {
      this.TempEntities.length = 0;
      if (UE.KuroRenderingRuntimeBPPluginBPLibrary.GetDisableNPCOptAsRayTracing(GlobalData_1.GlobalData.World)) {
        ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(RAYTRACING_URO_CHECK_DISTANCE, 62, this.TempEntities, true, false);
      }
      this.EnableUpdateRateOptimizationForArray(false, this.TempEntities, t => {
        this.CurFrameValidEntityHandles.add(t);
        this.LastFrameValidEntityHandles.delete(t);
        this.PendingEnableEntityHandles.delete(t);
      });
      for (const a of this.LastFrameValidEntityHandles) {
        this.PendingEnableEntityHandles.set(a, 0);
      }
      this.LastFrameValidEntityHandles.clear();
      this.TempEntities.length = 0;
      for (var [e, i] of this.PendingEnableEntityHandles) {
        if (e?.Valid && i < DELAY_ENABLE_URO_TIME) {
          this.PendingEnableEntityHandles.set(e, i + t);
        } else {
          this.TempEntities.push(e);
          this.PendingEnableEntityHandles.delete(e);
        }
      }
      this.EnableUpdateRateOptimizationForArray(true, this.TempEntities);
      this.CurIndex = 1 - this.CurIndex;
    } else {
      this.EnableUpdateRateOptimizationForSet(true, this.LastFrameValidEntityHandles);
      this.EnableUpdateRateOptimizationForMap(true, this.PendingEnableEntityHandles);
      this.ResetState();
    }
  }
  static OnClear() {
    this.ResetState();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdateRayTraceReflection, this.UpdateRayTraceReflection);
    return true;
  }
  static OnLeaveLevel() {
    this.ResetState();
    return true;
  }
  static ResetState() {
    this.TempEntities.length = 0;
    this.CurFrameValidEntityHandles.clear();
    this.LastFrameValidEntityHandles.clear();
    this.PendingEnableEntityHandles.clear();
  }
  static EnableUpdateRateOptimizationForArray(t, e, i) {
    if (e.length !== 0) {
      for (const r of e) {
        var a = r.EntityType !== Protocol_1.Aki.Protocol.kks.HI_ ? r.Entity?.GetComponent(44) : r.Entity?.GetComponent(235);
        if (a) {
          if (t) {
            a.CancelForceDisableAnimOptimization(5);
          } else {
            a.StartForceDisableAnimOptimization2(5);
          }
          i?.call(this, r);
        }
      }
    }
  }
  static EnableUpdateRateOptimizationForSet(t, e, i) {
    if (e.size !== 0) {
      for (const r of e) {
        var a = r.EntityType !== Protocol_1.Aki.Protocol.kks.HI_ ? r.Entity?.GetComponent(44) : r.Entity?.GetComponent(235);
        if (a) {
          if (t) {
            a.CancelForceDisableAnimOptimization(5);
          } else {
            a.StartForceDisableAnimOptimization2(5);
          }
          i?.call(this, r);
        }
      }
    }
  }
  static EnableUpdateRateOptimizationForMap(t, e, i) {
    if (e.size !== 0) {
      for (const r of e.keys()) {
        var a = r.EntityType !== Protocol_1.Aki.Protocol.kks.HI_ ? r.Entity?.GetComponent(44) : r.Entity?.GetComponent(235);
        if (a) {
          if (t) {
            a.CancelForceDisableAnimOptimization(5);
          } else {
            a.StartForceDisableAnimOptimization2(5);
          }
          i?.call(this, r);
        }
      }
    }
  }
}
exports.UpdateRateOptimizeController = UpdateRateOptimizeController;
(_a = UpdateRateOptimizeController).IsEnableRayTraceReflection = false;
UpdateRateOptimizeController.CurIndex = 0;
UpdateRateOptimizeController.EntityHandlesCache = [new Set(), new Set()];
UpdateRateOptimizeController.PendingEnableEntityHandles = new Map();
UpdateRateOptimizeController.TempEntities = new Array();
UpdateRateOptimizeController.UpdateRayTraceReflection = t => {
  if (_a.IsEnableRayTraceReflection !== t) {
    _a.IsEnableRayTraceReflection = t;
  }
}; //# sourceMappingURL=UpdateRateOptimizeController.js.map