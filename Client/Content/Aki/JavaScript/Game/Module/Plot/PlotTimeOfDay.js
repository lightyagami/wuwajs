"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotTimeOfDay = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ModelManager_1 = require("../../Manager/ModelManager");
const TimeOfDayController_1 = require("../TimeOfDay/TimeOfDayController");
const TimeOfDayDefine_1 = require("../TimeOfDay/TimeOfDayDefine");
const TimeOfDayModel_1 = require("../TimeOfDay/TimeOfDayModel");
class PlotTimeOfDay {
  constructor() {
    this._zi = false;
    this.uzi = false;
    this.Uk = false;
    this.czi = 0;
    this.mzi = 0;
    this.p51 = false;
    this.IRe = undefined;
  }
  OnPlotStart(e) {
    if (!this.uzi) {
      if (this.uzi = e) {
        this._zi = true;
        this.p51 = ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState;
        ModelManager_1.ModelManager.TimeOfDayModel.SetUseClientLockState(true);
        ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockStateClient = true;
        ModelManager_1.ModelManager.TimeOfDayModel.TimeSyncLockStateClient = true;
        this.czi = ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second;
      }
    }
  }
  OnSeqStart() {
    this.gzi();
    this.mzi = ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second;
    this.Uk = false;
  }
  OnSeqEnd() {
    this.gzi();
    ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockStateClient = this._zi;
    if (this.Uk && this.mzi !== 0 && this.mzi !== ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second) {
      TimeOfDayController_1.TimeOfDayController.AdjustTime(this.mzi, Protocol_1.Aki.Protocol.C4s.Proto_LevelPlayAuto);
    }
    this.Uk = false;
    this.mzi = 0;
  }
  OnPlotEnd() {
    if (this.uzi) {
      ModelManager_1.ModelManager.TimeOfDayModel.SetUseClientLockState(false);
      ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockStateClient = false;
      ModelManager_1.ModelManager.TimeOfDayModel.TimeSyncLockStateClient = false;
      if (this.p51 && this.czi !== ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second) {
        TimeOfDayController_1.TimeOfDayController.AdjustTime(this.czi, Protocol_1.Aki.Protocol.C4s.Proto_LevelPlayAuto);
      }
      this.czi = 0;
      this.uzi = false;
      this._zi = false;
    }
  }
  PauseTime() {
    if (!this._zi) {
      ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockStateClient = true;
      this._zi = true;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("TimeOfDay", 26, "[TimeRunLockState] 剧情行为锁定时间");
      }
    }
  }
  ResumeTime() {
    if (this._zi) {
      ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockStateClient = false;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("TimeOfDay", 26, "[TimeRunLockState] 剧情行为解锁时间");
      }
      this._zi = false;
    }
  }
  SetTime(e) {
    TimeOfDayController_1.TimeOfDayController.AdjustTime(e, Protocol_1.Aki.Protocol.C4s.Proto_LevelPlayAuto);
  }
  SetTimeDuration(o, e, t, r) {
    this.gzi();
    this.Uk = o;
    let a = e;
    if (a > TimeOfDayDefine_1.TOD_SECOND_PER_DAY) {
      a = 0;
    }
    if (r <= 0) {
      TimeOfDayController_1.TimeOfDayController.AdjustTime(a, Protocol_1.Aki.Protocol.C4s.Proto_LevelPlayAuto);
    } else {
      let e = t;
      if ((e = e > TimeOfDayDefine_1.TOD_SECOND_PER_DAY ? 0 : e) < a) {
        e += TimeOfDayDefine_1.TOD_SECOND_PER_DAY;
      }
      o = TimeOfDayModel_1.TodDayTime.ConvertFromRealTimeSecond(r);
      let i = 1;
      if (o > 0) {
        i = (e - a) / o;
      }
      ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockStateClient = false;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("TimeOfDay", 26, "[TimeRunLockState] Seq解锁时间");
      }
      TimeOfDayController_1.TimeOfDayController.AdjustTime(a, Protocol_1.Aki.Protocol.C4s.Proto_LevelPlayAuto);
      TimeOfDayController_1.TimeOfDayController.ChangeTimeScale(i);
      this.IRe = TimerSystem_1.TimerSystem.Delay(() => {
        TimeOfDayController_1.TimeOfDayController.AdjustTime(t, Protocol_1.Aki.Protocol.C4s.Proto_LevelPlayAuto);
        this.IRe = undefined;
        TimeOfDayController_1.TimeOfDayController.ResumeTimeScale();
        ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockStateClient = this._zi;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("TimeOfDay", 26, "[TimeRunLockState] Seq恢复时间锁定", ["IsPauseInPlot", this._zi]);
        }
      }, r * TimeUtil_1.TimeUtil.InverseMillisecond);
    }
  }
  gzi() {
    if (this.IRe) {
      if (TimerSystem_1.TimerSystem.Has(this.IRe)) {
        TimerSystem_1.TimerSystem.Remove(this.IRe);
      }
      TimeOfDayController_1.TimeOfDayController.ResumeTimeScale();
      this.IRe = undefined;
    }
  }
}
exports.PlotTimeOfDay = PlotTimeOfDay;
//# sourceMappingURL=PlotTimeOfDay.js.map