"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectLifeTime = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../Core/Common/Info");
const Log_1 = require("../../Core/Common/Log");
const Stats_1 = require("../../Core/Common/Stats");
const EffectEnvironment_1 = require("../../Core/Effect/EffectEnvironment");
const TickSystem_1 = require("../../Core/Tick/TickSystem");
const TimerSystem_1 = require("../../Core/Timer/TimerSystem");
const TimeUtil_1 = require("../Common/TimeUtil");
const NEAR_ZERO = 0.001;
const CHECK_CAN_STOP_INTERVAL = 1000;
class EffectLifeTime {
  constructor(i) {
    this.Rge = i;
    this.DefaultPassTime = 0;
    this.PassTime = 0;
    this.TotalPassTime = 0;
    this.StartTime = -1;
    this.LoopTime = 0;
    this.EndTime = 0;
    this.LoopTimeStamp = 0;
    this.LifeTimeStamp = 0;
    this.Uge = false;
    this.Age = false;
    this.gW = undefined;
    this.Pge = undefined;
    this.xge = undefined;
    this.wge = false;
    this.Bge = undefined;
    this.bge = 1;
    this.qge = undefined;
    this.Gge = () => {
      this.qge = undefined;
      this.Rge?.GetHandle()?.SetTimeScale(1);
      this.SetTimeScale(1);
      if (EffectEnvironment_1.EffectEnvironment.UseLog && Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("RenderEffect", 36, "特效框架：特效设置TimeScale为极小值，没有及时置回，造成泄漏", ["句柄Id", this.Rge?.GetHandle()?.Id], ["Path", this.Rge?.GetHandle()?.Path], ["CreateReason", this.Rge?.GetHandle()?.CreateReason]);
      }
    };
    this.Nge = () => {
      this.Pge?.Start();
      var i;
      var t = this.Rge;
      this.Bge = undefined;
      if (t.GetHandle().IsRoot()) {
        if (t.CanStop()) {
          if (Info_1.Info.IsGameRunning()) {
            if ((i = t.GetHandle().GetSureEffectActor()) && !t.GetHandle().IsExternalActor) {
              i.K2_DetachFromActor();
              t.GetHandle().SetHidden(true, "EffectLifeTime.PlayFinished");
            }
            this.Rge.GetHandle().UnregisterTick();
          }
          this.Rge.GetHandle()?.OnPlayFinished();
        } else {
          this.Bge = TimerSystem_1.TimerSystem.Delay(this.Nge, CHECK_CAN_STOP_INTERVAL);
        }
      } else {
        t.GetHandle().Stop("[EffectLifeTime.PlayFinished] 播放完成", true);
      }
      this.Pge?.Stop();
    };
    if (Stats_1.Stat.Enable && !EffectEnvironment_1.EffectEnvironment.CloseEffectSubStat) {
      this.gW = Stats_1.Stat.Create("[EffectLifeTime.Tick]");
      this.Pge = Stats_1.Stat.Create("[EffectLifeTime.PlayFinishStat]");
      this.xge = Stats_1.Stat.Create("[EffectLifeTime.SeekTo]");
    }
  }
  get IsLoop() {
    return this.Uge;
  }
  GetLifeTime() {
    return this.LifeTimeStamp;
  }
  get GetPassTime() {
    return this.PassTime;
  }
  get GetEndTime() {
    return this.EndTime;
  }
  GetTotalPassTime() {
    return this.TotalPassTime;
  }
  SetTotalPassTime(i) {
    this.TotalPassTime = i;
  }
  SetTime(i, t, e) {
    this.wge = true;
    this.StartTime = i;
    this.LoopTime = t;
    this.EndTime = e;
    this.LoopTimeStamp = i + t;
    this.LifeTimeStamp = i + t + e;
    this.Uge = this.StartTime < 0 || this.LoopTime > 0;
    this.Age = this.Uge || this.LifeTimeStamp <= 0;
    if (!this.IsLoop && !this.Bge) {
      this.SetLifeCycle(this.LifeTimeStamp);
    }
  }
  SetLifeCycle(i) {
    if (Info_1.Info.IsGameRunning() && (this.Bge && (this.IsLoop || Log_1.Log.CheckError() && Log_1.Log.Error("RenderEffect", 36, "特效框架：SetLifeCycle时非循环特效仍然存在上一次的生命周期计时器，可能之前已经泄漏，或者不正确使用多次设置生命周期", ["句柄Id", this.Rge?.GetHandle()?.Id], ["Path", this.Rge?.GetHandle()?.Path], ["TimerHandler", this.Bge.Id]), TimerSystem_1.TimerSystem.Remove(this.Bge), this.Bge = undefined), i = i * TimeUtil_1.TimeUtil.InverseMillisecond, this.Bge = this.Oge(i), EffectEnvironment_1.EffectEnvironment.UseLog) && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RenderEffect", 36, "特效框架：设置生命周期计时器", ["句柄Id", this.Rge?.GetHandle()?.Id], ["Path", this.Rge?.GetHandle()?.Path], ["TimerHandle", this.Bge?.Id], ["LifeTime", i]);
    }
  }
  WhenEnterStopping() {
    this.UpdateLifeCycle(this.LifeTimeStamp - this.PassTime);
  }
  UpdateLifeCycle(i) {
    var t;
    var e;
    if (Info_1.Info.IsGameRunning()) {
      if (this.Bge) {
        t = this.Bge.Id;
        TimerSystem_1.TimerSystem.Remove(this.Bge);
        this.Bge = undefined;
        e = i * TimeUtil_1.TimeUtil.InverseMillisecond;
        this.Bge = this.Oge(e);
        if (EffectEnvironment_1.EffectEnvironment.UseLog && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("RenderEffect", 36, "特效框架：更新生命周期计时器", ["句柄Id", this.Rge?.GetHandle()?.Id], ["Path", this.Rge?.GetHandle()?.Path], ["OldTimerHandle", t], ["TimerHandle", this.Bge?.Id], ["LifeTime", e]);
        }
      } else {
        this.SetLifeCycle(i);
      }
    }
  }
  SetTimeScale(i) {
    if (this.bge !== i && (this.bge = i, EffectEnvironment_1.EffectEnvironment.UseLog && Log_1.Log.CheckDebug() && Log_1.Log.Debug("RenderEffect", 36, "特效框架:LifeTime SetTimeScale", ["句柄Id", this.Rge.GetHandle()?.Id], ["Path", this.Rge.GetHandle()?.Path], ["timeScale", i]), this.Bge)) {
      if (i > 0) {
        if (TimerSystem_1.TimerSystem.IsPause(this.Bge)) {
          TimerSystem_1.TimerSystem.Resume(this.Bge);
        }
        TimerSystem_1.TimerSystem.ChangeDilation(this.Bge, i);
      } else if (!TimerSystem_1.TimerSystem.IsPause(this.Bge)) {
        TimerSystem_1.TimerSystem.Pause(this.Bge);
      }
    }
  }
  OnGlobalTimeScaleChange() {
    if (this.qge) {
      if (TickSystem_1.TickSystem.IsSetPaused) {
        if (!TimerSystem_1.TimerSystem.IsPause(this.qge)) {
          TimerSystem_1.TimerSystem.Pause(this.qge);
        }
      } else if (TimerSystem_1.TimerSystem.IsPause(this.qge)) {
        TimerSystem_1.TimerSystem.Resume(this.qge);
      }
    }
  }
  RegisterWaitMiniTimeScale(i) {
    if (!this.qge) {
      if (Info_1.Info.IsGameRunning() && (this.qge = TimerSystem_1.TimerSystem.Delay(this.Gge, i), TickSystem_1.TickSystem.IsSetPaused) && this.qge) {
        TimerSystem_1.TimerSystem.Pause(this.qge);
      }
    }
  }
  UnregisterWaitMiniTimeScale() {
    if (this.qge) {
      TimerSystem_1.TimerSystem.Remove(this.qge);
      this.qge = undefined;
    }
  }
  Tick(i) {
    if (!(i <= 0)) {
      this.gW?.Start();
      this.TotalPassTime += i;
      this.SeekTo(this.PassTime + i, true, true);
      this.gW?.Stop();
    }
  }
  SeekTo(i, t, e, s = true) {
    this.xge?.Start();
    if (!e) {
      if (!this.Uge && this.Bge) {
        this.UpdateLifeCycle(this.LifeTimeStamp - i);
      }
    }
    this.PassTime = i;
    if (!this.Rge.IsPlaying() || (this.Uge && !this.Rge.IsStopping() && this.PassTime >= this.LoopTimeStamp && s && this.Fge(), !t) || this.Age && !this.Rge.IsStopping() || (this.PassTime > this.LoopTimeStamp && this.Rge?.GetHandle()?.PreStop(), this.PassTime < this.LifeTimeStamp)) {
      this.xge?.Stop();
      return false;
    } else {
      if (!Info_1.Info.IsGameRunning()) {
        this.Nge();
      }
      this.xge?.Stop();
      return true;
    }
  }
  Fge() {
    var i;
    var t;
    if (this.LoopTime <= NEAR_ZERO) {
      this.PassTime = this.StartTime;
    } else if (this.PassTime >= this.LoopTimeStamp + this.LoopTime) {
      i = this.PassTime - this.StartTime;
      t = (0, puerts_1.$ref)(0);
      UE.KismetMathLibrary.FMod(i, this.LoopTime, t);
      this.PassTime = this.StartTime + (0, puerts_1.$unref)(t);
    } else {
      this.PassTime -= this.LoopTime;
    }
  }
  get IsAfterStart() {
    return this.wge && this.PassTime > this.StartTime - NEAR_ZERO;
  }
  OnReplay() {
    this.Clear();
    this.wge = false;
    this.bge = 1;
  }
  Clear() {
    this.PassTime = this.DefaultPassTime;
    this.TotalPassTime = 0;
    if (this.Bge) {
      TimerSystem_1.TimerSystem.Remove(this.Bge);
      this.Bge = undefined;
    }
  }
  Oge(i) {
    if (i > TimerSystem_1.MIN_TIME) {
      if ((i = TimerSystem_1.TimerSystem.Delay(this.Nge, i, undefined, "EffectLifeTime", false)) && this.bge !== 1) {
        if (this.bge > 0) {
          TimerSystem_1.TimerSystem.ChangeDilation(i, this.bge);
        } else {
          TimerSystem_1.TimerSystem.Pause(i);
        }
      }
      return i;
    }
    TimerSystem_1.TimerSystem.Next(() => {
      this.Nge();
    });
  }
}
exports.EffectLifeTime = EffectLifeTime;
//# sourceMappingURL=EffectLifeTime.js.map