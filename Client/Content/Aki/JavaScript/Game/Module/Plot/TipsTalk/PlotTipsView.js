"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotTipsView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const LanguageSystem_1 = require("../../../../Core/Common/LanguageSystem");
const Log_1 = require("../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const ExternalSourceSettingById_1 = require("../../../../Core/Define/ConfigQuery/ExternalSourceSettingById");
const InterjectionByTimberIdAndUniversalToneId_1 = require("../../../../Core/Define/ConfigQuery/InterjectionByTimberIdAndUniversalToneId");
const PlotAudioById_1 = require("../../../../Core/Define/ConfigQuery/PlotAudioById");
const SpeakerById_1 = require("../../../../Core/Define/ConfigQuery/SpeakerById");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const PlotAudioModel_1 = require("../PlotAudioModel");
const BREAK_TIME = 1000;
class PlotTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Ebn = undefined;
    this.ybn = undefined;
    this.vto = false;
    this.lZi = AudioSystem_1.INVALID_AUDIO_EVENT_VALUE;
    this.Lbn = new Map();
    this.$bn = "";
    this.Mto = e => {
      this.Ebn = e;
      this.MZi();
      e = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(this.Ebn.TidTalk);
      e = ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(e, true) ?? "";
      this.GetText(1)?.SetText(e);
      e = this.Lbn.get(this.Ebn.WhoId);
      if (e) {
        this.GetTexture(0)?.SetTexture(e);
      }
      if (this.ybn) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "[PlotTips] 语音完成或没有语音，恢复提交字幕定时");
        }
        this.ybn.Resume();
      } else {
        if (this.$bn !== LanguageSystem_1.LanguageSystem.PackageAudio) {
          if (this.lZi !== AudioSystem_1.INVALID_AUDIO_EVENT_VALUE) {
            PlotTipsView.Ybn++;
            AudioSystem_1.AudioSystem.ExecuteAction(this.lZi, 0, {
              TransitionDuration: 0
            });
            this.lZi = AudioSystem_1.INVALID_AUDIO_EVENT_VALUE;
          }
          this.$bn = LanguageSystem_1.LanguageSystem.PackageAudio;
        }
        if (!this.EZi() && !this.pZi()) {
          this.Rbn(this.Ebn.CaptionParams?.TotalTime || ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.DefaultDurationPrompt);
        }
      }
    };
    this.Qzi = e => {
      this.SetUiActive(!e);
    };
    this.Eto = (e = false, t = true) => {
      if (this.vto !== e && (!!e || !this.IsHideOrHiding)) {
        if (this.vto = e) {
          if (t) {
            this.SetUiActive(false);
          }
          this.Abn();
          ControllerHolder_1.ControllerHolder.FlowController.CountDownSkip(true);
        } else {
          if (t) {
            this.SetUiActive(true);
          }
          if (ModelManager_1.ModelManager.PlotModel.CurTalkItem) {
            this.Mto(ModelManager_1.ModelManager.PlotModel.CurTalkItem);
          }
          ControllerHolder_1.ControllerHolder.FlowController.CountDownSkip(false);
        }
      }
    };
    this.Sto = e => {
      this.OpenParam = e;
      this.yto();
    };
    this.rto = () => {
      PlotTipsView.Ybn++;
      this.ybn?.Remove();
      this.ybn = undefined;
      this.Ebn = undefined;
      if (this.lZi !== AudioSystem_1.INVALID_AUDIO_EVENT_VALUE) {
        AudioSystem_1.AudioSystem.ExecuteAction(this.lZi, 0, {
          TransitionDuration: BREAK_TIME
        });
        this.lZi = AudioSystem_1.INVALID_AUDIO_EVENT_VALUE;
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpdatePlotSubtitle, this.Mto);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.HidePlotUi, this.Qzi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.HangPlotViewHud, this.Eto);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpdatePlotUiParam, this.Sto);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ClearPlotSubtitle, this.rto);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdatePlotSubtitle, this.Mto);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.HidePlotUi, this.Qzi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.HangPlotViewHud, this.Eto);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdatePlotUiParam, this.Sto);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ClearPlotSubtitle, this.rto);
  }
  async OnCreateAsync() {
    var e = new Array();
    var t = this.OpenParam;
    if (t.TipsTalkTexturePaths) {
      for (const i of t.TipsTalkTexturePaths) {
        const o = new CustomPromise_1.CustomPromise();
        e.push(o.Promise);
        ResourceSystem_1.ResourceSystem.LoadAsync(i[1], UE.Texture, e => {
          if (ObjectUtils_1.ObjectUtils.IsValid(e)) {
            this.Lbn.set(i[0], e);
          }
          o.SetResult();
        });
      }
      await Promise.all(e);
    }
  }
  OnStart() {
    if (ModelManager_1.ModelManager.PlotModel.CurTalkItem) {
      this.Mto(ModelManager_1.ModelManager.PlotModel.CurTalkItem);
    }
    this.$bn = LanguageSystem_1.LanguageSystem.PackageAudio;
  }
  OnAfterPlayStartSequence() {
    this.yto();
  }
  OnAfterShow() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotViewChange, this.Info.Name, true);
    this.Eto(ModelManager_1.ModelManager.PlotModel.HangViewHud, false);
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotViewChange, this.Info.Name, false);
    this.Eto(true, false);
  }
  OnBeforeDestroy() {
    this.Lbn.clear();
    this.rto();
    ControllerHolder_1.ControllerHolder.FlowController.CountDownSkip(false);
  }
  Rbn(e, t = false) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 26, "[PlotTips] 开始延迟完成字幕", ["delay", e], ["isPause", t]);
    }
    this.ybn = TimerSystem_1.TimerSystem.Delay(() => {
      var e = this.Ebn;
      this.rto();
      ControllerHolder_1.ControllerHolder.FlowController.FlowShowTalk.SubmitSubtitle(e);
    }, e * CommonDefine_1.MILLIONSECOND_PER_SECOND);
    if (t) {
      this.ybn.Pause();
    }
  }
  Abn() {
    this.ybn?.Pause();
    if (this.lZi !== AudioSystem_1.INVALID_AUDIO_EVENT_VALUE) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[PlotTips] 暂停语音");
      }
      AudioSystem_1.AudioSystem.ExecuteAction(this.lZi, 1, {
        TransitionDuration: BREAK_TIME
      });
    }
  }
  yto() {
    var e;
    var t = this.OpenParam;
    if (t?.ViewName) {
      if (e = UiManager_1.UiManager.GetViewByName(t.ViewName)) {
        e.AddChild(this);
        if (e.IsHideOrHiding) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 26, "[PlotTips] 父界面已经隐藏，attach时子界面主动隐藏");
          }
          this.Hide();
        }
      } else {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Plot", 26, "[PlotTips] 父界面已经不在，子界面直接关闭", ["parent", t.ViewName]);
        }
        this.CloseMe();
      }
    }
  }
  EZi() {
    var e = this.Ebn.PlayVoice ? PlotAudioById_1.configPlotAudioById.GetConfig(this.Ebn.TidTalk) : undefined;
    if (!e) {
      return false;
    }
    var t = ExternalSourceSettingById_1.configExternalSourceSettingById.GetConfig(e.ExternalSourceSetting);
    const i = PlotAudioModel_1.PlotAudioModel.GetExternalSourcesMediaName(e);
    e = (0, AudioSystem_1.parseAudioEventPath)(t.SubtitleEvent);
    if (this.lZi === AudioSystem_1.INVALID_AUDIO_EVENT_VALUE) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[PlotTips] 语音播放", ["mediaName", i]);
      }
      PlotTipsView.Ybn++;
      const o = PlotTipsView.Ybn;
      this.lZi = AudioSystem_1.AudioSystem.PostEvent(e, undefined, {
        ExternalSourceName: t.SubtitleSrc,
        ExternalSourceMediaName: i,
        CallbackMask: 1,
        CallbackHandler: (e, t) => {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 26, "[PlotTips] 语音播放完成回调", ["mediaName", i]);
          }
          if (e === 0 && o === PlotTipsView.Ybn) {
            this.lZi = AudioSystem_1.INVALID_AUDIO_EVENT_VALUE;
            this.Rbn(this.Ebn.CaptionParams?.IntervalTime || ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.AudioEndWaitTimePrompt, this.vto);
          }
        }
      });
    } else {
      AudioSystem_1.AudioSystem.ExecuteAction(this.lZi, 2, {
        TransitionDuration: BREAK_TIME
      });
    }
    return true;
  }
  pZi() {
    if (!this.Ebn?.UniversalTone) {
      return false;
    }
    var e = this.Ebn.UniversalTone.TimberId || SpeakerById_1.configSpeakerById.GetConfig(this.Ebn.WhoId)?.TimberId;
    var t = this.Ebn.UniversalTone.UniversalToneId;
    if (!e || !t) {
      ControllerHolder_1.ControllerHolder.FlowController.LogError("语气配置无效");
      return false;
    }
    var i = InterjectionByTimberIdAndUniversalToneId_1.configInterjectionByTimberIdAndUniversalToneId.GetConfig(e, t);
    if (!i) {
      ControllerHolder_1.ControllerHolder.FlowController.LogError("无法获取语气配置", ["timberId", e], ["tone", t]);
      return false;
    }
    const o = (0, AudioSystem_1.parseAudioEventPath)(i.AkEvent);
    if (this.lZi === AudioSystem_1.INVALID_AUDIO_EVENT_VALUE) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[PlotTips] 语气播放", ["event", o]);
      }
      PlotTipsView.Ybn++;
      const s = PlotTipsView.Ybn;
      this.lZi = AudioSystem_1.AudioSystem.PostEvent(o, undefined, {
        CallbackMask: 1,
        CallbackHandler: (e, t) => {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 26, "[PlotTips] 语气播放完成回调", ["event", o]);
          }
          if (e === 0 && s === PlotTipsView.Ybn) {
            this.lZi = AudioSystem_1.INVALID_AUDIO_EVENT_VALUE;
            this.Rbn(this.Ebn.CaptionParams?.IntervalTime || ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.AudioEndWaitTimePrompt, this.vto);
          }
        }
      });
    } else {
      AudioSystem_1.AudioSystem.ExecuteAction(this.lZi, 2, {
        TransitionDuration: BREAK_TIME
      });
    }
    return true;
  }
  MZi() {
    var e;
    var t;
    var i = this.Ebn.TalkAkEvent;
    if (i && (e = (0, AudioSystem_1.parseAudioEventPath)(i.AkEvent))) {
      if (i.Type === IAction_1.EPostAkEvent.Global) {
        AudioSystem_1.AudioSystem.PostEvent(e);
      } else if (i.Type === IAction_1.EPostAkEvent.Target) {
        i = i.EntityId;
        if (!(t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i))) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Event", 26, "实体不存在", ["entityId", i]);
          }
        }
        if ((t = t.Entity.GetComponent(1)?.Owner)?.IsValid()) {
          AudioSystem_1.AudioSystem.PostEvent(e, t);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Event", 26, "未能获取到该实体对应的有效Actor", ["entityId", i]);
        }
      }
    }
  }
}
(exports.PlotTipsView = PlotTipsView).Ybn = 0;
//# sourceMappingURL=PlotTipsView.js.map