"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChargeSlashGameplayController = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../../Core/Common/Log");
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
const SpecificScanEffectData_1 = require("../SpecificScanEffect/SpecificScanEffectData");
const SMALLEST_RANDOM_TIME = 0.02;
const SCAN_EFFECT_CLASS_PATH = "/Game/Aki/Effect/BluePrint/BP_FX_Common/BP_DistortionWave.BP_DistortionWave_C";
class ChargeSlashGameplayController extends ControllerBase_1.ControllerBase {
  static StartChargeSlash(a) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("ChargeSlash", 31, "[ChargeSlashGameplayController] StartChargeSlash");
    }
    a = a.GetHookInteractConfig();
    if (a) {
      var e = a.MaxRandomDelayTime ?? 1;
      for (const r of a.TargetEntityIds) {
        var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r);
        if (t && t.Entity) {
          if (t.IsInit && t.Entity.IsInit) {
            const o = t.Entity.GetComponent(299);
            if (o) {
              const s = Math.max(Math.random() * e, SMALLEST_RANDOM_TIME);
              t = TimerSystem_1.TimerSystem.Delay(() => {
                this.v51.delete(r);
                ChargeSlashGameplayController.fb1(o, s);
              }, s * MathUtils_1.MathUtils.SecondToMillisecond);
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("ChargeSlash", 31, "StartChargeSlash", ["pbDataId", r], ["randomTime", s]);
              }
              if (t) {
                this.v51.set(r, t);
              } else if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("ChargeSlash", 31, "[StartChargeSlash] timerHandle is null", ["pbDataId", r]);
              }
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("ChargeSlash", 31, "[StartChargeSlash] Entity has no curveControlComp", ["pbDataId", r]);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("ChargeSlash", 31, "[StartChargeSlash] entity is not init", ["pbDataId", r]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("ChargeSlash", 31, "[StartChargeSlash] cannont find entity", ["pbDataId", r]);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("ChargeSlash", 31, "[StartChargeSlash] interactConfig is null");
    }
  }
  static StopChargeSlash(a) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("ChargeSlash", 31, "[ChargeSlashGameplayController] StopChargeSlash");
    }
    a = a.GetHookInteractConfig();
    if (a) {
      for (const t of a.TargetEntityIds) {
        var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
        if (e && e.Entity) {
          if (e.IsInit && e.Entity.IsInit) {
            if (e = e.Entity.GetComponent(299)) {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("ChargeSlash", 31, "StopChargeSlash", ["pbDataId", t]);
              }
              if (this.v51.has(t)) {
                TimerSystem_1.TimerSystem.Remove(this.v51.get(t));
                this.v51.delete(t);
              } else {
                e.StopPerformance();
              }
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("ChargeSlash", 31, "[StopChargeSlash] Entity has no curveControlComp", ["pbDataId", t]);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("ChargeSlash", 31, "[StopChargeSlash] entity is not init", ["pbDataId", t]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("ChargeSlash", 31, "[StopChargeSlash] cannont find entity", ["pbDataId", t]);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("ChargeSlash", 31, "[StopChargeSlash] interactConfig is null");
    }
  }
  static fb1(a, e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ChargeSlash", 31, "SceneItemStartPerformance", ["pbDataId", a.Entity.GetComponent(0)?.GetPbDataId()]);
    }
    a.StartPerformance(e);
  }
  static Cb1() {
    for (var [, a] of this.v51) {
      TimerSystem_1.TimerSystem.Remove(a);
    }
    this.v51.clear();
  }
  static OnLeaveLevel() {
    this.Cb1();
    return true;
  }
  static OnClear() {
    this.Cb1();
    return true;
  }
  static OnTick(a) {
    if (this.uQ1.size !== 0) {
      var e;
      var t;
      var r = [];
      for ([e, t] of this.uQ1) {
        if (!t.Update(a)) {
          r.push(e);
        }
      }
      for (const o of r) {
        this.StopChargeSlashScanEffect(o);
      }
    }
  }
  static StartChargeSlashScanEffect(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("ChargeSlash", 31, "[ChargeSlashGameplayController] StartChargeSlashScanEffect");
    }
    this._A++;
    ResourceSystem_1.ResourceSystem.LoadAsync(SCAN_EFFECT_CLASS_PATH, UE.Class, a => {
      if (a) {
        (a = ActorSystem_1.ActorSystem.Spawn(a, e, undefined)).StartScanEffect();
        this.uQ1.set(this._A, new SpecificScanEffectData_1.SpecificScanEffectData(this._A, a, e.GetLocation()));
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 31, "加载ChargeSlash扫描特效失败", ["path", SCAN_EFFECT_CLASS_PATH]);
      }
    });
    return this._A;
  }
  static StopChargeSlashScanEffect(a) {
    var e = this.uQ1.get(a);
    if (e) {
      ActorSystem_1.ActorSystem.Put("StopChargeSlashScanEffect", e.EffectActor);
      this.uQ1.delete(a);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("ChargeSlash", 31, "[StopChargeSlashScanEffect] data is null", ["id", a]);
    }
  }
  static StopAllChargeSlashScanEffect() {
    for (var [, a] of this.uQ1) {
      ActorSystem_1.ActorSystem.Put("StopAllChargeSlashScanEffect", a.EffectActor);
    }
    this.uQ1.clear();
  }
}
(exports.ChargeSlashGameplayController = ChargeSlashGameplayController).v51 = new Map();
ChargeSlashGameplayController._A = -1;
ChargeSlashGameplayController.uQ1 = new Map(); //# sourceMappingURL=ChargeSlashGameplayController.js.map