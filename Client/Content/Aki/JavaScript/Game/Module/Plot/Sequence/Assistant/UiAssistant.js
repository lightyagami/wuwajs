"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiAssistant = exports.ESequenceEventName = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const LanguageSystem_1 = require("../../../../../Core/Common/LanguageSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const Queue_1 = require("../../../../../Core/Container/Queue");
const Event_1 = require("../../../../../Core/Event/Event");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const GlobalData_1 = require("../../../../GlobalData");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const PlotSubtitleView_1 = require("../../../Sequence/Subtitle/PlotSubtitleView");
const PlotController_1 = require("../../PlotController");
const SequenceController_1 = require("../SequenceController");
const SequenceDefine_1 = require("../SequenceDefine");
const SeqBaseAssistant_1 = require("./SeqBaseAssistant");
const SUBTITLE_ACTION_PAUSE = "Action";
const OPTION_ACTION_PAUSE = "Option";
const EVENT_SUCCESS = "plot_seq_qte_success";
const EVENT_FAIL = "plot_seq_qte_timeout";
var ESequenceEventName;
(function (e) {
  e[e.UpdateSeqSubtitle = 0] = "UpdateSeqSubtitle";
  e[e.HandlePlotOptionSelected = 1] = "HandlePlotOptionSelected";
  e[e.HandleSeqSubtitleEnd = 2] = "HandleSeqSubtitleEnd";
  e[e.HandleSubSequenceStop = 3] = "HandleSubSequenceStop";
  e[e.HandleIndependentSeqAudio = 4] = "HandleIndependentSeqAudio";
})(ESequenceEventName = exports.ESequenceEventName ||= {});
class CacheDialogueData {
  constructor(e, t, o, r, l, i, n) {
    this.Show = e;
    this.DialogueId = t;
    this.GuardTime = o;
    this.AudioDelay = r;
    this.AudioTransitionDuration = l;
    this.LanguageAudio = i;
    this.AutoPlayDelay = n;
  }
}
class QteManger {
  constructor() {
    this.fkl = new Map();
    this.$El = e => {
      ControllerHolder_1.ControllerHolder.FlowController.FlowSequence.OnQteExecute(this.fkl.get(e.HandleId), true);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[FlowSequence][PlotQte] Sequence Qte 结束：成功", ["handleId", e.HandleId]);
      }
      AudioSystem_1.AudioSystem.PostEvent(EVENT_SUCCESS);
      this.Ut1(e);
    };
    this.XEl = e => {
      ControllerHolder_1.ControllerHolder.FlowController.FlowSequence.OnQteExecute(this.fkl.get(e.HandleId), false);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[FlowSequence][PlotQte] Sequence Qte 结束：失败", ["handleId", e.HandleId]);
      }
      AudioSystem_1.AudioSystem.PostEvent(EVENT_FAIL);
      this.Ut1(e);
    };
  }
  HandlePlotQte(e) {
    if (this.fkl.size > 0) {
      for (const l of this.fkl.keys()) {
        ControllerHolder_1.ControllerHolder.CommonQteController.StopQte(l);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "[FlowSequence][PlotQte] sequence qte 重叠", ["fail handle id", l]);
        }
      }
      this.fkl.clear();
    }
    var t;
    var o;
    var r = ControllerHolder_1.ControllerHolder.FlowController.FlowSequence.OnQteStart(e.Id);
    if (ModelManager_1.ModelManager.SequenceModel.IsMuteAllQte || ModelManager_1.ModelManager.SequenceModel.MuteQteList.has(r)) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[FlowSequence][PlotQte] GM跳过QTE", ["QteId", r]);
      }
      ControllerHolder_1.ControllerHolder.FlowController.FlowSequence.OnQteExecute(e.Id, true);
    } else if (t = ControllerHolder_1.ControllerHolder.CommonQteController.StartQte(r, this.$El, this.XEl, 2)) {
      o = t.Config?.BaseConfig.TimeDilation ?? 1;
      ModelManager_1.ModelManager.SequenceModel.CurLevelSeqActor?.SequencePlayer?.SetPlayRate(o);
      ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(false);
      this.fkl.set(t.HandleId, e.Id);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[FlowSequence][PlotQte] Sequence Qte 开始", ["talkId", e.Id], ["QteId", r], ["handleId", t.HandleId]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Plot", 26, "[FlowSequence][PlotQte] Sequence Qte 失败", ["QteId", r]);
    }
  }
  HandlePlotQteEnd(e) {
    ControllerHolder_1.ControllerHolder.FlowController.FlowSequence.OnQteEnd(e);
  }
  StopQte() {
    for (const e of this.fkl.keys()) {
      ControllerHolder_1.ControllerHolder.CommonQteController.StopQte(e);
    }
    this.fkl.clear();
  }
  Ut1(e) {
    ModelManager_1.ModelManager.SequenceModel.CurLevelSeqActor?.SequencePlayer?.SetPlayRate(1);
    AudioSystem_1.AudioSystem.SetRtpcValue("plot_seq_qte_time_scale", 1);
    ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(true);
    this.fkl.delete(e.HandleId);
  }
}
class UiAssistant extends SeqBaseAssistant_1.SeqBaseAssistant {
  constructor() {
    super(...arguments);
    this.Event = new Event_1.Event(ESequenceEventName, 8);
    this.qio = new Queue_1.Queue();
    this.Gio = false;
    this.vkl = new QteManger();
    this.bZe = e => {
      this.Promise?.SetResult(e);
      this.Promise = undefined;
    };
    this.OnShowDialogue = (e, t, o, r, l, i, n) => {
      if (this.Model.State === 3) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "字幕事件触发", ["bShow", e], ["id", t], ["language", i]);
        }
        o = o / SequenceDefine_1.FRAME_PER_MILLISECOND;
        this.qio.Push(new CacheDialogueData(e, t, o, r, l, i, n));
      }
    };
  }
  async LoadPromise() {
    this.Promise = new CustomPromise_1.CustomPromise();
    ControllerHolder_1.ControllerHolder.PlotController.WaitViewCallback(this.bZe);
    await this.svc();
    if (this.Promise) {
      await this.Promise.Promise;
    }
    return UiManager_1.UiManager.IsViewShow("PlotSubtitleView");
  }
  PreAllPlay() {
    if (this.Model.IsSubtitleUiUse) {
      this.Nio();
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotDoingTextShow, this.Model.SequenceData.标识为演出制作中);
    if (this.Model.GetType() === 0) {
      switch (LanguageSystem_1.LanguageSystem.PackageAudio) {
        case "zh":
          this.Model.CurLanguageAudio = 1;
          break;
        case "ja":
          this.Model.CurLanguageAudio = 3;
          break;
        case "ko":
          this.Model.CurLanguageAudio = 4;
          break;
        case "en":
          this.Model.CurLanguageAudio = 2;
          break;
        default:
          this.Model.CurLanguageAudio = 0;
      }
    } else {
      this.Model.CurLanguageAudio = 0;
    }
  }
  EachStop() {
    this.Event.Emit(ESequenceEventName.HandleSubSequenceStop);
  }
  AllStop() {
    if (this.Model.GetLastFadeEnd()) {
      ModelManager_1.ModelManager.PlotModel.IsFadeIn = true;
      ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(0, 3, undefined, 0, ControllerHolder_1.ControllerHolder.LevelLoadingController.CameraFade.ColorSearch());
    }
  }
  End() {
    if (this.Model.IsSubtitleUiUse) {
      this.Oio();
    }
    ControllerHolder_1.ControllerHolder.PlotController.RemoveViewCallback(this.bZe);
    this.vkl.StopQte();
    if (this.Promise) {
      this.Promise.SetResult(false);
      this.Promise = undefined;
    }
    ControllerHolder_1.ControllerHolder.CommonQteController.ClearPreloadQteRes();
  }
  Nio() {
    var e;
    if (!this.Gio && (this.Gio = true, e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.MovieSceneDialogueSubsystem.StaticClass()))) {
      e.OnShowDialogue.Add(this.OnShowDialogue);
    }
  }
  Oio() {
    var e;
    if (this.Gio && (this.Gio = false, e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.MovieSceneDialogueSubsystem.StaticClass()))) {
      e.OnShowDialogue.Remove(this.OnShowDialogue);
    }
  }
  TriggerAllSubtitle() {
    if (!this.Model.IsPaused) {
      while (this.qio.Size > 0) {
        var e = this.qio.Pop();
        if (e) {
          this.kio(e?.Show, e?.DialogueId, e?.GuardTime, e?.AudioDelay, e?.AudioTransitionDuration, e?.LanguageAudio, e?.AutoPlayDelay);
        }
      }
    }
  }
  kio(e, t, o, r, l, i, n) {
    if (i === 0 || i === this.Model.CurLanguageAudio) {
      if (e) {
        this.Fio(t, o, r, l, n);
      } else {
        this.Vio(t);
      }
    }
  }
  Fio(e, t, o, r, l) {
    if (e !== "None") {
      var e = parseInt(e);
      var i = ControllerHolder_1.ControllerHolder.FlowController.FlowSequence.CreateSubtitleFromTalkItem(e);
      if (i) {
        switch (i.Type) {
          case "QTE":
            this.vkl.HandlePlotQte(i);
            break;
          case "NoTextItem":
            this.Skl(i);
            break;
          default:
            this.HandlePlotSubtitle(i, t, o, r, l);
        }
      }
    }
  }
  Vio(e) {
    if (e !== "None") {
      var t = parseInt(e);
      var e = ControllerHolder_1.ControllerHolder.FlowController.FlowSequence.CreateSubtitleFromTalkItem(t);
      if (e) {
        switch (e.Type) {
          case "QTE":
            this.vkl.HandlePlotQteEnd(t);
            break;
          case "NoTextItem":
            this.Mkl(t);
            break;
          default:
            this.HandlePlotSubtitleEnd(t);
        }
      }
    }
  }
  Hio() {
    this.Model.DefaultGuardTime = ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.GuardTime;
    this.Model.DefaultAudioDelay = ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.AudioDelay;
    this.Model.DefaultAudioTransitionDuration = ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.AudioTransitionDuration;
    this.Model.IsSubtitleConfigInit = true;
  }
  HandlePlotSubtitle(e, t, o, r, l) {
    if (!this.Model.IsSubtitleConfigInit) {
      this.Hio();
    }
    this.Model.CurSubtitle.Subtitles = e;
    this.Model.CurSubtitle.GuardTime = t < 0 ? 0 : t === 0 ? this.Model.DefaultGuardTime * TimeUtil_1.TimeUtil.InverseMillisecond : t;
    this.Model.CurSubtitle.AudioDelay = o < 0 ? 0 : o === 0 ? this.Model.DefaultAudioDelay * TimeUtil_1.TimeUtil.InverseMillisecond : o;
    this.Model.CurSubtitle.AudioTransitionDuration = r < 0 ? 0 : r === 0 ? this.Model.DefaultAudioTransitionDuration * TimeUtil_1.TimeUtil.InverseMillisecond : r;
    this.Model.CurSubtitle.AutoPlayDelay = l <= 0 ? 0 : l * TimeUtil_1.TimeUtil.InverseMillisecond;
    e = this.Model.CurSubtitle;
    ControllerHolder_1.ControllerHolder.PlotController.PlotViewManager.OnUpdateSubtitle(e.Subtitles);
    ControllerHolder_1.ControllerHolder.FlowController.FlowSequence.OnSubtitleStart(e.Subtitles.Id);
    this.Event.Emit(ESequenceEventName.UpdateSeqSubtitle, e);
    if (e.Subtitles?.PlayVoice && (t = e.Subtitles).Style?.Type !== "InnerVoice" && !t.NoMouthAnim) {
      SequenceController_1.SequenceController.TryApplyMouthAnim(e.Subtitles.PlotLineKey, e.Subtitles.WhoId);
    }
  }
  async HandlePlotSubtitleEnd(e, t = false) {
    var o;
    if (ControllerHolder_1.ControllerHolder.FlowController.FlowSequence.OnSubtitleEnd(e)) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "结束字幕");
      }
      ControllerHolder_1.ControllerHolder.PlotController.PlotViewManager.OnSubmitSubtitle();
      if (o = ControllerHolder_1.ControllerHolder.FlowController.FlowSequence.SubtitleActionPromise?.Promise) {
        ControllerHolder_1.ControllerHolder.SequenceController.PauseSequence(SUBTITLE_ACTION_PAUSE);
        this.Event.Emit(ESequenceEventName.HandleSeqSubtitleEnd, e, t);
        await o;
        if (this.Model.IsPlaying) {
          ControllerHolder_1.ControllerHolder.SequenceController.ResumeSequence(SUBTITLE_ACTION_PAUSE);
        }
      } else {
        this.Event.Emit(ESequenceEventName.HandleSeqSubtitleEnd, e, t);
      }
    }
  }
  async HandleSelectedOption(e, t) {
    this.HandlePlotSubtitleEnd(t, true);
    ControllerHolder_1.ControllerHolder.SequenceController.PauseSequence(OPTION_ACTION_PAUSE);
    this.Event.Emit(ESequenceEventName.HandlePlotOptionSelected, e);
    var t = ControllerHolder_1.ControllerHolder.FlowController.FlowSequence.SubtitleActionPromise?.Promise;
    if (t) {
      await t;
    }
    if (this.Model.IsPlaying && (ControllerHolder_1.ControllerHolder.FlowController.FlowSequence.OnSelectOption(e), (t = ControllerHolder_1.ControllerHolder.FlowController.FlowSequence.OptionActionPromise?.Promise) && (await t), this.Model.IsPlaying)) {
      ControllerHolder_1.ControllerHolder.SequenceController.ResumeSequence(OPTION_ACTION_PAUSE);
    }
  }
  Skl(e) {
    ControllerHolder_1.ControllerHolder.FlowController.FlowSequence.OnSubtitleStart(e.Id);
  }
  Mkl(e) {
    ControllerHolder_1.ControllerHolder.FlowController.FlowSequence.OnSubtitleEnd(e);
  }
  async svc() {
    await ControllerHolder_1.ControllerHolder.CommonQteController.PreloadQteRes(ControllerHolder_1.ControllerHolder.FlowController.FlowSequence.GetAllQte());
  }
  PreloadUi(e) {
    var t = PlotController_1.PlotController.GetCurrentViewName();
    if (t && this.Model.SequenceData?.GeneratedData?.PreloadUiArray && !(this.Model.SequenceData?.GeneratedData?.PreloadUiArray?.Num() <= 0) && (t = UiManager_1.UiManager.GetViewByName(t)) && t instanceof PlotSubtitleView_1.PlotSubtitleView) {
      t.PreloadOpenBackgroundUi(this.Model.SequenceData?.GeneratedData?.PreloadUiArray).finally(() => {
        e.SetResult(true);
      });
    } else {
      e.SetResult(true);
    }
  }
}
exports.UiAssistant = UiAssistant;
//# sourceMappingURL=UiAssistant.js.map