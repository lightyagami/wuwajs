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
const FlowController_1 = require("../Plot/Flow/FlowController");
const TimeOfDayController_1 = require("../TimeOfDay/TimeOfDayController");
const TimeOfDayModel_1 = require("../TimeOfDay/TimeOfDayModel");
class ObservatoryModule {
  constructor() {
    this.BIf = false;
    this.kIf = undefined;
    this.$vn = undefined;
    this.qIf = 0;
    this.OIf = 0;
    this.QEr = undefined;
    this.tGf = undefined;
    this.GIf = () => {
      this.FIf(this.qIf);
    };
    this.Yht = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Weather", 79, "[天文台]监听到Sequence停止事件, 恢复正常时间流逝", ["AccelerationPassedTime", this.OIf], ["AccelerationDuration", this.qIf]);
      }
      this.NIf();
    };
    this.uwa = () => {
      this.QEr?.();
    };
  }
  AccelerateTime(e, t, i, o) {
    var r;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Weather", 79, "[天文台]加速时间流逝", ["AreaId", e]);
    }
    if (t <= 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Weather", 79, "[天文台]加速时间流逝时长不合法", ["Duration", t]);
      }
      return false;
    } else {
      return !this.BIf && ((r = ObservatoryByAreaId_1.configObservatoryByAreaId.GetConfig(e)) ? (this.BIf = true, this.qIf = t, this.OIf = 0, this.tGf = o, TimeOfDayController_1.TimeOfDayController.PauseTime(), EventSystem_1.EventSystem.Once(EventDefine_1.EEventName.PlotSequenceStarted, this.GIf), EventSystem_1.EventSystem.Once(EventDefine_1.EEventName.PlotSequenceEnd, this.Yht), FlowController_1.FlowController.StartFlowForCallback(r.FlowListName, r.FlowId, r.StateId, () => {
        this.BIf = false;
        TimeOfDayController_1.TimeOfDayController.ResumeTimeScale();
        this.PlayWeatherControlSequence(i);
      }), true) : (Log_1.Log.CheckError() && Log_1.Log.Error("Weather", 79, "[天文台]天气剧情配置不存在", ["AreaId", e]), false));
    }
  }
  PlayWeatherControlSequence(e) {
    this.QEr = e;
    this.lwr("/Game/Aki/Scene/InteractionLevel/Animation/3_0/TianQiKongZhiQi/TianQiKongZhiQi.TianQiKongZhiQi");
  }
  FIf(e) {
    if (this.BIf) {
      const r = ModelManager_1.ModelManager.TimeOfDayModel;
      var t = ModelManager_1.ModelManager.SequenceModel.CurLevelSeqActor.SequencePlayer;
      var o = t.GetFrameRate();
      var t = t.GetFrameDuration() / (o.Numerator / o.Denominator);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Weather", 79, "[天文台]计算Sequence播放时长(秒)", ["Duration", t]);
      }
      let i = 1;
      if (t != 0) {
        i = e / TimeOfDayModel_1.TodDayTime.ConvertFromRealTimeSecond(t);
      }
      if (this.kIf) {
        TimerSystem_1.TimerSystem.Remove(this.kIf);
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Weather", 79, "[天文台]加速时间", ["TODDuration", e], ["SequenceDuration", t], ["AccelerationFactor", i]);
      }
      this.VIf(i);
      this.kIf = TimerSystem_1.TimerSystem.Forever(e => {
        var e = TimeOfDayModel_1.TodDayTime.ConvertFromRealTimeSecond(e * TimeUtil_1.TimeUtil.Millisecond) * i;
        var t = r.GameTime.Second + e;
        r.GameTime.Second = t;
        UE.KuroRenderingRuntimeBPPluginBPLibrary.SetGlobalGITime(GlobalData_1.GlobalData.World, TimeOfDayModel_1.TodDayTime.ConvertToHour(t));
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Weather", 79, "[天文台]加速时间", ["TODCurSecond", r.GameTime.Second], ["PassedTime", this.OIf], ["AccelerationDuration", this.qIf], ["TODDeltaTime", e]);
        }
        this.OIf += e;
        if (this.OIf > this.qIf) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Weather", 79, "[天文台]加速时间流逝结束, 恢复正常时间流逝", ["TODCurSecond", r.GameTime.Second], ["PassedTime", this.OIf], ["AccelerationDuration", this.qIf]);
          }
          this.NIf();
        }
      }, 100);
    } else if (this.kIf) {
      TimerSystem_1.TimerSystem.Remove(this.kIf);
      this.kIf = undefined;
    }
  }
  NIf() {
    if (this.kIf) {
      TimerSystem_1.TimerSystem.Remove(this.kIf);
    }
    this.$vn?.Clear();
    this.$vn = undefined;
    this.kIf = undefined;
    this.BIf = false;
    this.qIf = 0;
    this.OIf = 0;
    this.VIf(1);
    this.tGf?.();
  }
  VIf(e) {
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