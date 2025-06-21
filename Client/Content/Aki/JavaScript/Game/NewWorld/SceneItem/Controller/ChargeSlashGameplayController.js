"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ChargeSlashGameplayController = void 0;
const UE = require("ue"),
  ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
  ControllerBase_1 = require("../../../../Core/Framework/ControllerBase"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ChargeSlashScanEffectData_1 = require("../ChargeSlash/ChargeSlashScanEffectData"),
  SMALLEST_RANDOM_TIME = .02,
  SCAN_EFFECT_CLASS_PATH = "/Game/Aki/Effect/BluePrint/BP_FX_Common/BP_DistortionWave.BP_DistortionWave_C";
class ChargeSlashGameplayController extends ControllerBase_1.ControllerBase {
  static StartChargeSlash(a) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("ChargeSlash", 31, "[ChargeSlashGameplayController] StartChargeSlash");
    a = a.GetHookInteractConfig();
    if (a) {
      var e = a.MaxRandomDelayTime ?? 1;
      for (const r of a.TargetEntityIds) {
        var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r);
        if (t && t.Entity)
          if (t.IsInit && t.Entity.IsInit) {
            const s = t.Entity.GetComponent(288);
            if (s) {
              const o = Math.max(Math.random() * e, SMALLEST_RANDOM_TIME);
              t = TimerSystem_1.TimerSystem.Delay(() => {
                this.q61.delete(r), ChargeSlashGameplayController.jT1(s, o)
              }, o * MathUtils_1.MathUtils.SecondToMillisecond);
              Log_1.Log.CheckDebug() && Log_1.Log.Debug("ChargeSlash", 31, "StartChargeSlash", ["pbDataId", r], ["randomTime", o]), t ? this.q61.set(r, t) : Log_1.Log.CheckError() && Log_1.Log.Error("ChargeSlash", 31, "[StartChargeSlash] timerHandle is null", ["pbDataId", r])
            } else Log_1.Log.CheckError() && Log_1.Log.Error("ChargeSlash", 31, "[StartChargeSlash] Entity has no curveControlComp", ["pbDataId", r])
          } else Log_1.Log.CheckError() && Log_1.Log.Error("ChargeSlash", 31, "[StartChargeSlash] entity is not init", ["pbDataId", r]);
        else Log_1.Log.CheckError() && Log_1.Log.Error("ChargeSlash", 31, "[StartChargeSlash] cannont find entity", ["pbDataId", r])
      }
    } else Log_1.Log.CheckError() && Log_1.Log.Error("ChargeSlash", 31, "[StartChargeSlash] interactConfig is null")
  }
  static StopChargeSlash(a) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("ChargeSlash", 31, "[ChargeSlashGameplayController] StopChargeSlash");
    a = a.GetHookInteractConfig();
    if (a)
      for (const t of a.TargetEntityIds) {
        var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
        e && e.Entity ? e.IsInit && e.Entity.IsInit ? (e = e.Entity.GetComponent(288)) ? (Log_1.Log.CheckDebug() && Log_1.Log.Debug("ChargeSlash", 31, "StopChargeSlash", ["pbDataId", t]), this.q61.has(t) ? (TimerSystem_1.TimerSystem.Remove(this.q61.get(t)), this.q61.delete(t)) : e.StopPerformance()) : Log_1.Log.CheckError() && Log_1.Log.Error("ChargeSlash", 31, "[StopChargeSlash] Entity has no curveControlComp", ["pbDataId", t]) : Log_1.Log.CheckError() && Log_1.Log.Error("ChargeSlash", 31, "[StopChargeSlash] entity is not init", ["pbDataId", t]) : Log_1.Log.CheckError() && Log_1.Log.Error("ChargeSlash", 31, "[StopChargeSlash] cannont find entity", ["pbDataId", t])
      } else Log_1.Log.CheckError() && Log_1.Log.Error("ChargeSlash", 31, "[StopChargeSlash] interactConfig is null")
  }
  static jT1(a, e) {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("ChargeSlash", 31, "SceneItemStartPerformance", ["pbDataId", a.Entity.GetComponent(0)?.GetPbDataId()]), a.StartPerformance(e)
  }
  static $T1() {
    for (var [, a] of this.q61) TimerSystem_1.TimerSystem.Remove(a);
    this.q61.clear()
  }
  static OnLeaveLevel() {
    return this.$T1(), !0
  }
  static OnClear() {
    return this.$T1(), !0
  }
  static OnTick(a) {
    if (0 !== this.LW1.size) {
      var e, t, r = [];
      for ([e, t] of this.LW1) t.Update(a) || r.push(e);
      for (const s of r) this.StopChargeSlashScanEffect(s)
    }
  }
  static StartChargeSlashScanEffect(e) {
    return Log_1.Log.CheckInfo() && Log_1.Log.Info("ChargeSlash", 31, "[ChargeSlashGameplayController] StartChargeSlashScanEffect"), this._A++, ResourceSystem_1.ResourceSystem.LoadAsync(SCAN_EFFECT_CLASS_PATH, UE.Class, a => {
      a ? ((a = ActorSystem_1.ActorSystem.Spawn(a, e, void 0)).StartScanEffect(), this.LW1.set(this._A, new ChargeSlashScanEffectData_1.ChargeSlashScanEffectData(this._A, a, e.GetLocation()))) : Log_1.Log.CheckError() && Log_1.Log.Error("LevelEvent", 31, "加载ChargeSlash扫描特效失败", ["path", SCAN_EFFECT_CLASS_PATH])
    }), this._A
  }
  static StopChargeSlashScanEffect(a) {
    var e = this.LW1.get(a);
    e ? (ActorSystem_1.ActorSystem.Put("StopChargeSlashScanEffect", e.EffectActor), this.LW1.delete(a)) : Log_1.Log.CheckError() && Log_1.Log.Error("ChargeSlash", 31, "[StopChargeSlashScanEffect] data is null", ["id", a])
  }
  static StopAllChargeSlashScanEffect() {
    for (var [, a] of this.LW1) ActorSystem_1.ActorSystem.Put("StopAllChargeSlashScanEffect", a.EffectActor);
    this.LW1.clear()
  }
  static get MaxScanDistance() {
    return void 0 === this.wW1 && (this.wW1 = ConfigManager_1.ConfigManager.LevelGamePlayConfig?.ScanMaxDistance ?? 0, this.wW1 *= 100), this.wW1
  }
  static get MaxScanInteractionEffectDistance() {
    return void 0 === this.AW1 && (this.AW1 = ConfigManager_1.ConfigManager.LevelGamePlayConfig?.ScanShowInteractionEffectMaxDistance ?? 0, this.AW1 *= 100), this.AW1
  }
  static GetScanMaxDistance() {
    return Math.max(this.MaxScanDistance, this.MaxScanInteractionEffectDistance)
  }
}(exports.ChargeSlashGameplayController = ChargeSlashGameplayController).q61 = new Map, ChargeSlashGameplayController._A = -1, ChargeSlashGameplayController.LW1 = new Map, ChargeSlashGameplayController.wW1 = void 0, ChargeSlashGameplayController.AW1 = void 0;
//# sourceMappingURL=ChargeSlashGameplayController.js.map