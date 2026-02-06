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
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const SunSpiritEffectPerform_1 = require("../SunSpiritPerform/SunSpiritEffectPerform");
const SunSpiritNonePerform_1 = require("../SunSpiritPerform/SunSpiritNonePerform");
const SunSpiritBaseState_1 = require("./SunSpiritBaseState");
const DEBUG_KEY = "SunSpirit";
class SunSpiritFlyingEffectState extends SunSpiritBaseState_1.SunSpiritBaseState {
  constructor(t, i, e, s) {
    super(t, i);
    this.WaitBeforeFlyDuration = e;
    this.FlyingDuration = s;
    this.cz = Vector_1.Vector.Create();
    this.e7o = Quat_1.Quat.Create();
    this.DYf = 0;
    this.UYf = 0;
    this.GQm = 0;
    this.xYf = 0;
    this.BYf = 0;
    this.aeg = 0;
    this.heg = 0;
    this._eg = 0;
    this.ueg = 0;
    this.ceg = 0;
    this.IsInterrupt = false;
    this.KeepEffect = false;
    this.FlyingTargetGetter = undefined;
    this.FlyingFinishCallback = undefined;
    this.FlyingInterruptCallback = undefined;
    this.UDg = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SunSpirit", 39, "日灵: 飞行中遇到传送或切场景，直接尝试设置到终点并结束", ["SunSpiritId", this.SunSpiritData.SunSpiritId], ["SunSpiritConfigId", this.SunSpiritData.ConfigId]);
      }
      var t = this.cz;
      var i = this.e7o;
      if (this.FlyingTargetGetter?.(t, i)) {
        this.SunSpiritData.SetLocationAndRotation(t, i);
      }
      this.OnSunSpiritFlyToTargetEnd(false, true);
    };
  }
  OnEnter() {
    var t = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritConfig();
    return !!t && (this.cz.Reset(), this.e7o.Reset(), this.aeg = t.FlyingEffectMaxDist * t.FlyingEffectMaxDist, this.ueg = t.FlyingEffectMinDist * t.FlyingEffectMinDist, this._eg = t.FlyingEffectUpdateFailMaxCount, this.heg = t.FlyingEffectUpdateFailMaxTimeSec, this.ceg = t.FlyingEffectMaxFlyingDuration, EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.TeleportStart, this.UDg) || EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportStart, this.UDg), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.LeaveInstanceDungeon, this.UDg) || EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LeaveInstanceDungeon, this.UDg), true);
  }
  OnExit() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.TeleportStart, this.UDg)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportStart, this.UDg);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.LeaveInstanceDungeon, this.UDg)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LeaveInstanceDungeon, this.UDg);
    }
    if (!this.KeepEffect) {
      EffectSystem_1.EffectSystem.StopEffectById(this.GQm, "SunSpiritFlyToTargetEnd", false);
      this.GQm = 0;
    }
    if (this.IsInterrupt) {
      this.FlyingInterruptCallback?.();
    } else {
      this.FlyingFinishCallback?.();
    }
  }
  Csm(t) {
    this.DYf += t;
    if (this.DYf > this.heg) {
      if (++this.UYf > this._eg) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("SunSpirit", 39, "日灵: 飞行中错误累积超时，直接结束", ["SunSpiritId", this.SunSpiritData.SunSpiritId], ["SunSpiritConfigId", this.SunSpiritData.ConfigId]);
        }
        this.OnSunSpiritFlyToTargetEnd(false, true);
      } else {
        this.DYf = 0;
      }
    }
  }
  OnTick(t) {
    var i;
    var e;
    var s;
    var r;
    var n;
    if (ModelManager_1.ModelManager.TeleportModel?.IsTeleport || !ModelManager_1.ModelManager.GameModeModel?.WorldDoneAndLoadingClosed) {
      this.UDg();
    } else if (this.xYf < this.WaitBeforeFlyDuration) {
      this.xYf = MathUtils_1.MathUtils.Clamp(this.xYf + t, 0, this.WaitBeforeFlyDuration);
      if (!(this.SunSpiritData.GetSunSpiritPerform() instanceof SunSpiritNonePerform_1.SunSpiritNonePerform)) {
        i = Transform_1.Transform.Create();
        this.SunSpiritData.GetSunSpiritPerform().GetTransform(i);
        this.SunSpiritData.ChangeSunSpiritPerform(new SunSpiritNonePerform_1.SunSpiritNonePerform(this.SunSpiritData, i));
      }
    } else {
      this.BYf = MathUtils_1.MathUtils.Clamp(this.BYf + t, 0, this.FlyingDuration);
      if (!(this.SunSpiritData.GetSunSpiritPerform() instanceof SunSpiritEffectPerform_1.SunSpiritEffectPerform)) {
        i = Transform_1.Transform.Create();
        this.SunSpiritData.GetSunSpiritPerform().GetTransform(i);
        this.SunSpiritData.ChangeSunSpiritPerform(new SunSpiritEffectPerform_1.SunSpiritEffectPerform(this.SunSpiritData, i));
      }
      i = this.cz;
      e = this.e7o;
      if (this.FlyingTargetGetter?.(i, e) && (s = this.SunSpiritData.Location, r = this.SunSpiritData.Quaternion, s) && r) {
        this.DYf = 0;
        this.UYf = 0;
        if (this.BYf > this.ceg) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("SunSpirit", 39, "日灵: 飞行时间过长，直接完成", ["SunSpiritId", this.SunSpiritData.SunSpiritId], ["SunSpiritConfigId", this.SunSpiritData.ConfigId], ["Pos", i], ["Rot", e]);
          }
          this.SunSpiritData.SetLocationAndRotation(i, e);
          this.OnSunSpiritFlyToTargetEnd(false, false);
        } else if ((n = Vector_1.Vector.DistSquared(s, i)) > this.aeg || n < this.ueg) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("SunSpirit", 39, "日灵: 飞行距离过长或过短，直接完成", ["SunSpiritId", this.SunSpiritData.SunSpiritId], ["SunSpiritConfigId", this.SunSpiritData.ConfigId], ["Pos", i], ["Rot", e]);
          }
          this.SunSpiritData.SetLocationAndRotation(i, e);
          this.OnSunSpiritFlyToTargetEnd(false, false);
        } else {
          n = this.FlyingDuration - this.BYf;
          n = MathUtils_1.MathUtils.Clamp(t / n, 0, 1);
          Vector_1.Vector.Lerp(s, i, n, i);
          Quat_1.Quat.Slerp(r, e, n, e);
          this.SunSpiritData.SetLocationAndRotation(i, e);
          if ((ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(DEBUG_KEY) ?? 0) >= 2 && Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SunSpirit", 39, "日灵: 飞行中信息", ["SunSpiritId", this.SunSpiritData.SunSpiritId], ["SunSpiritConfigId", this.SunSpiritData.ConfigId], ["Pos", i], ["Rot", e]);
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