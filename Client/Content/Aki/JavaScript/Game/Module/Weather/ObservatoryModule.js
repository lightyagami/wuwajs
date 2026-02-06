"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObservatoryModule = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ObservatoryByAreaId_1 = require("../../../Core/Define/ConfigQuery/ObservatoryByAreaId");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const GlobalData_1 = require("../../GlobalData");
const SimpleLevelSequenceActor_1 = require("../../LevelGamePlay/StaticScene/SimpleLevelSequenceActor");
const ModelManager_1 = require("../../Manager/ModelManager");
const RefCompDefine_1 = require("../../NewWorld/SceneItem/RefCompController/RefCompDefine");
const TimeOfDayController_1 = require("../TimeOfDay/TimeOfDayController");
const TimeOfDayModel_1 = require("../TimeOfDay/TimeOfDayModel");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
class ObservatoryModule {
  constructor() {
    this.TRf = false;
    this.bRf = undefined;
    this.$vn = undefined;
    this.wRf = 0;
    this.RRf = 0;
    this.QEr = undefined;
    this._6f = undefined;
    this.LRf = () => {
      this.PRf(this.wRf);
    };
    this.Yht = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Weather", 79, "[天文台]监听到Sequence停止事件, 恢复正常时间流逝", ["AccelerationPassedTime", this.RRf], ["AccelerationDuration", this.wRf]);
      }
      this.ARf();
    };
    this.uwa = () => {
      this.QEr?.();
    };
  }
  AccelerateTime(e, t, i, r) {
    var o;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Weather", 79, "[天文台]加速时间流逝", ["AreaId", e]);
    }
    if (t <= 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Weather", 79, "[天文台]加速时间流逝时长不合法", ["Duration", t]);
      }
      return false;
    } else {
      return !this.TRf && ((o = ObservatoryByAreaId_1.configObservatoryByAreaId.GetConfig(e)) ? (this.TRf = true, this.wRf = t, this.RRf = 0, this._6f = r, TimeOfDayController_1.TimeOfDayController.PauseTime(), EventSystem_1.EventSystem.Once(EventDefine_1.EEventName.PlotSequenceStarted, this.LRf), EventSystem_1.EventSystem.Once(EventDefine_1.EEventName.PlotSequenceEnd, this.Yht), ControllerHolder_1.ControllerHolder.FlowController.StartFlowForCallback(o.FlowListName, o.FlowId, o.StateId, () => {
        this.TRf = false;
        TimeOfDayController_1.TimeOfDayController.ResumeTimeScale();
        this.PlayWeatherControlSequence(i);
      }), true) : (Log_1.Log.CheckError() && Log_1.Log.Error("Weather", 79, "[天文台]天气剧情配置不存在", ["AreaId", e]), false));
    }
  }
  PlayWeatherControlSequence(e) {
    this.QEr = e;
    this.lwr("/Game/Aki/Scene/InteractionLevel/Animation/3_0/TianQiKongZhiQi/TianQiKongZhiQi.TianQiKongZhiQi");
  }
  PRf(e) {
    if (this.TRf) {
      const o = ModelManager_1.ModelManager.TimeOfDayModel;
      var t = ModelManager_1.ModelManager.SequenceModel.CurLevelSeqActor.SequencePlayer;
      var r = t.GetFrameRate();
      var t = t.GetFrameDuration() / (r.Numerator / r.Denominator);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Weather", 79, "[天文台]计算Sequence播放时长(秒)", ["Duration", t]);
      }
      let i = 1;
      if (t != 0) {
        i = e / TimeOfDayModel_1.TodDayTime.ConvertFromRealTimeSecond(t);
      }
      if (this.bRf) {
        TimerSystem_1.TimerSystem.Remove(this.bRf);
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Weather", 79, "[天文台]加速时间", ["TODDuration", e], ["SequenceDuration", t], ["AccelerationFactor", i]);
      }
      this.DRf(i);
      this.bRf = TimerSystem_1.TimerSystem.Forever(e => {
        var e = TimeOfDayModel_1.TodDayTime.ConvertFromRealTimeSecond(e * TimeUtil_1.TimeUtil.Millisecond) * i;
        var t = o.GameTime.Second + e;
        o.GameTime.Second = t;
        UE.KuroRenderingRuntimeBPPluginBPLibrary.SetGlobalGITime(GlobalData_1.GlobalData.World, TimeOfDayModel_1.TodDayTime.ConvertToHour(t));
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Weather", 79, "[天文台]加速时间", ["TODCurSecond", o.GameTime.Second], ["PassedTime", this.RRf], ["AccelerationDuration", this.wRf], ["TODDeltaTime", e]);
        }
        this.RRf += e;
        if (this.RRf > this.wRf) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Weather", 79, "[天文台]加速时间流逝结束, 恢复正常时间流逝", ["TODCurSecond", o.GameTime.Second], ["PassedTime", this.RRf], ["AccelerationDuration", this.wRf]);
          }
          this.ARf();
        }
      }, 100);
    } else if (this.bRf) {
      TimerSystem_1.TimerSystem.Remove(this.bRf);
      this.bRf = undefined;
    }
  }
  ARf() {
    if (this.bRf) {
      TimerSystem_1.TimerSystem.Remove(this.bRf);
    }
    this.$vn?.Clear();
    this.$vn = undefined;
    this.bRf = undefined;
    this.TRf = false;
    this.wRf = 0;
    this.RRf = 0;
    this.DRf(1);
    this._6f?.();
  }
  DRf(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Weather", 79, "[天文台]尝试设置体积云流速", ["Speed", e]);
    }
    var t = UE.KuroGISystem.GetKuroGISystem(GlobalData_1.GlobalData.World.GetWorld());
    if (t) {
      if (t = t.GetKuroGlobalGIActor()) {
        if (t = t.KuroVolumeCloudGlobal?.ChildActor) {
          t.VolumeCloudSpeedMulti = e;
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Weather", 79, "[天文台]设置体积云流速完成", ["Speed", t.VolumeCloudSpeedMulti]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Weather", 79, "[天文台]获取KuroVolumeCloud失败");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Weather", 79, "[天文台]获取GlobalGI Actor失败");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Weather", 79, "[天文台]获取KuroGISystem失败");
    }
  }
  lwr(e) {
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.LevelSequence, e => {
      if (e?.IsValid()) {
        if (this.$vn) {
          this.$vn.SetSequenceData(e);
        } else {
          this.$vn = new SimpleLevelSequenceActor_1.default(e);
          this.$vn.AddOnFinishedCallback(this.uwa);
        }
        this.$vn.PlayLoop(false, 0, undefined, undefined, new RefCompDefine_1.PlayRateStruct());
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Weather", 79, "[天文台]Sequence加载失败");
      }
    }, 100);
  }
}
exports.ObservatoryModule = ObservatoryModule;
//# sourceMappingURL=ObservatoryModule.js.map