"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SunSpiritFlyingEffectState = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Quat_1 = require("../../../../Core/Utils/Math/Quat");
const Transform_1 = require("../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const SunSpiritEffectPerform_1 = require("../SunSpiritPerform/SunSpiritEffectPerform");
const SunSpiritNonePerform_1 = require("../SunSpiritPerform/SunSpiritNonePerform");
const SunSpiritBaseState_1 = require("./SunSpiritBaseState");
const DEBUG_KEY = "SunSpirit";
class SunSpiritFlyingEffectState extends SunSpiritBaseState_1.SunSpiritBaseState {
  constructor(t, i, s, r) {
    super(t, i);
    this.WaitBeforeFlyDuration = s;
    this.FlyingDuration = r;
    this.cz = Vector_1.Vector.Create();
    this.e7o = Quat_1.Quat.Create();
    this.M8f = 0;
    this.E8f = 0;
    this.V$m = 0;
    this.I8f = 0;
    this.T8f = 0;
    this.F9f = 0;
    this.N9f = 0;
    this.V9f = 0;
    this.H9f = 0;
    this.j9f = 0;
    this.IsInterrupt = false;
    this.KeepEffect = false;
    this.FlyingTargetGetter = undefined;
    this.FlyingFinishCallback = undefined;
    this.FlyingInterruptCallback = undefined;
  }
  OnEnter() {
    var t = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritConfig();
    return !!t && (this.cz.Reset(), this.e7o.Reset(), this.F9f = t.FlyingEffectMaxDist * t.FlyingEffectMaxDist, this.H9f = t.FlyingEffectMinDist * t.FlyingEffectMinDist, this.V9f = t.FlyingEffectUpdateFailMaxCount, this.N9f = t.FlyingEffectUpdateFailMaxTimeSec, this.j9f = t.FlyingEffectMaxFlyingDuration, true);
  }
  OnExit() {
    if (!this.KeepEffect) {
      EffectSystem_1.EffectSystem.StopEffectById(this.V$m, "SunSpiritFlyToTargetEnd", false);
      this.V$m = 0;
    }
    if (this.IsInterrupt) {
      this.FlyingInterruptCallback?.();
    } else {
      this.FlyingFinishCallback?.();
    }
  }
  Csm(t) {
    this.M8f += t;
    if (this.M8f > this.N9f) {
      if (++this.E8f > this.V9f) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SunSpirit", 39, "日灵: 飞行中错误累积超时，直接结束", ["SunSpiritId", this.SunSpiritData.SunSpiritId], ["SunSpiritConfigId", this.SunSpiritData.ConfigId]);
        }
        this.OnSunSpiritFlyToTargetEnd(false, true);
      } else {
        this.M8f = 0;
      }
    }
  }
  OnTick(t) {
    var i;
    var s;
    var r;
    var e;
    var h;
    if (this.I8f < this.WaitBeforeFlyDuration) {
      this.I8f = MathUtils_1.MathUtils.Clamp(this.I8f + t, 0, this.WaitBeforeFlyDuration);
      if (!(this.SunSpiritData.GetSunSpiritPerform() instanceof SunSpiritNonePerform_1.SunSpiritNonePerform)) {
        i = Transform_1.Transform.Create();
        this.SunSpiritData.GetSunSpiritPerform().GetTransform(i);
        this.SunSpiritData.ChangeSunSpiritPerform(new SunSpiritNonePerform_1.SunSpiritNonePerform(this.SunSpiritData, i));
      }
    } else {
      this.T8f = MathUtils_1.MathUtils.Clamp(this.T8f + t, 0, this.FlyingDuration);
      if (!(this.SunSpiritData.GetSunSpiritPerform() instanceof SunSpiritEffectPerform_1.SunSpiritEffectPerform)) {
        i = Transform_1.Transform.Create();
        this.SunSpiritData.GetSunSpiritPerform().GetTransform(i);
        this.SunSpiritData.ChangeSunSpiritPerform(new SunSpiritEffectPerform_1.SunSpiritEffectPerform(this.SunSpiritData, i));
      }
      i = this.cz;
      s = this.e7o;
      if (this.FlyingTargetGetter?.(i, s) && (r = this.SunSpiritData.Location, e = this.SunSpiritData.Quaternion, r) && e) {
        this.M8f = 0;
        this.E8f = 0;
        if (this.T8f > this.j9f) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("SunSpirit", 39, "日灵: 飞行时间过长，直接完成", ["SunSpiritId", this.SunSpiritData.SunSpiritId], ["SunSpiritConfigId", this.SunSpiritData.ConfigId], ["Pos", i], ["Rot", s]);
          }
          this.SunSpiritData.SetLocationAndRotation(i, s);
          this.OnSunSpiritFlyToTargetEnd(false, false);
        } else if ((h = Vector_1.Vector.DistSquared(r, i)) > this.F9f || h < this.H9f) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("SunSpirit", 39, "日灵: 飞行距离过长或过短，直接完成", ["SunSpiritId", this.SunSpiritData.SunSpiritId], ["SunSpiritConfigId", this.SunSpiritData.ConfigId], ["Pos", i], ["Rot", s]);
          }
          this.SunSpiritData.SetLocationAndRotation(i, s);
          this.OnSunSpiritFlyToTargetEnd(false, false);
        } else {
          h = this.FlyingDuration - this.T8f;
          h = MathUtils_1.MathUtils.Clamp(t / h, 0, 1);
          Vector_1.Vector.Lerp(r, i, h, i);
          Quat_1.Quat.Slerp(e, s, h, s);
          this.SunSpiritData.SetLocationAndRotation(i, s);
          if ((ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(DEBUG_KEY) ?? 0) >= 2 && Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SunSpirit", 39, "日灵: 飞行中信息", ["SunSpiritId", this.SunSpiritData.SunSpiritId], ["SunSpiritConfigId", this.SunSpiritData.ConfigId], ["Pos", i], ["Rot", s]);
          }
        }
      } else {
        this.Csm(t);
      }
    }
  }
  IsSameState(t) {
    return super.IsSameState(t) && t instanceof SunSpiritFlyingEffectState && this.FlyingTargetGetter === t.FlyingTargetGetter && this.FlyingFinishCallback === t.FlyingFinishCallback && this.FlyingInterruptCallback === t.FlyingInterruptCallback;
  }
  OnSunSpiritFlyToTargetEnd(t = false, i = false) {
    this.KeepEffect = t;
    this.IsInterrupt = i;
    this.IsFinished = true;
  }
}
exports.SunSpiritFlyingEffectState = SunSpiritFlyingEffectState;
//# sourceMappingURL=SunSpiritFlyingEffectState.js.map