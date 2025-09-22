"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotTipsViewBase = undefined;
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
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiLayerType_1 = require("../../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../../Ui/UiLayer");
const UiManager_1 = require("../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const PlotAudioModel_1 = require("../PlotAudioModel");
const BREAK_TIME = 1000;
class PlotTipsViewBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Nqd = undefined;
    this.Ebn = undefined;
    this.ybn = undefined;
    this.vto = false;
    this.lZi = AudioSystem_1.INVALID_AUDIO_EVENT_VALUE;
    this.Ybn = 0;
    this.Lbn = new Map();
    this.$bn = "";
    this.ResourceId = "";
    this.IconItem = undefined;
    this.SubtitleItem = undefined;
    this.NameItem = undefined;
    this.OverrideAudioEventName = undefined;
    this.OverrideAudioSrcName = undefined;
    this.SPe = undefined;
    this.FirstShow = false;
    this.LastHide = false;
    this.Mto = e => {
      var t;
      var i;
      if (this.ybn) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "[PlotTips] 语音完成或没有语音，恢复提交字幕定时");
        }
        this.ybn.Resume();
      } else {
        if (this.Ebn !== e && (this.Ebn = e, this.MZi(), t = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(this.Ebn.TidTalk), t = ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(t, true) ?? "", this.SubtitleItem?.SetText(t), (i = this.Lbn.get(this.Ebn.WhoId)) ? this.IconItem?.SetTexture(i) : ControllerHolder_1.ControllerHolder.FlowController.LogError("[PlotTips] 没有头像"), i = PublicUtil_1.PublicUtil.GetConfigTextByTable(0, e.WhoId ?? ""), StringUtils_1.StringUtils.IsEmpty(i) ? ControllerHolder_1.ControllerHolder.FlowController.LogError("[PlotTips] 没有对话人") : this.NameItem?.SetText(i), Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("Plot", 26, "[PlotTips] 字幕:", ["Text", t]);
        }
        if (this.$bn !== LanguageSystem_1.LanguageSystem.PackageAudio) {
          if (this.lZi !== AudioSystem_1.INVALID_AUDIO_EVENT_VALUE) {
            this.Ybn++;
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
    this.rto = () => {
      this.ybn?.Remove();
      this.ybn = undefined;
      this.Ebn = undefined;
      this.Ybn++;
    };
  }
  async OpenAsync(e) {
    if (!(this.Nqd = e)?.ViewName) {
      return false;
    }
    this.FirstShow = true;
    await this.CreateThenShowByResourceIdAsync(this.ResourceId, this.GetParentItem(), true);
    if (this.Nqd?.ViewName) {
      var t = UiManager_1.UiManager.GetViewByName(e.ViewName);
      if (!t) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Plot", 26, "[PlotViewHud] 父界面已经不在，子界面直接关闭", ["parent", e.ViewName]);
        }
        this.CloseAsync();
        return false;
      }
      t.AddChild(this);
      if (t.IsHideOrHiding) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "[PlotViewHud] 父界面已经隐藏，attach时子界面主动隐藏");
        }
        this.Hide();
      }
    }
    return true;
  }
  GetParentItem() {
    return UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.HUD);
  }
  async CloseAsync() {
    this.LastHide = true;
    await this.HideAsync();
    await this.DestroyAsync();
  }
  OnInit() {}
  Vqd() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpdatePlotSubtitle, this.Mto);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.HidePlotUi, this.Qzi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.HangPlotViewHud, this.Eto);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ClearPlotSubtitle, this.rto);
  }
  jqd() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdatePlotSubtitle, this.Mto);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.HidePlotUi, this.Qzi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.HangPlotViewHud, this.Eto);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ClearPlotSubtitle, this.rto);
  }
  async OnCreateAsync() {
    var e = new Array();
    if (this.Nqd?.TipsTalkTexturePaths) {
      for (const t of this.Nqd.TipsTalkTexturePaths) {
        const i = new CustomPromise_1.CustomPromise();
        e.push(i.Promise);
        ResourceSystem_1.ResourceSystem.LoadAsync(t[1], UE.Texture, e => {
          if (ObjectUtils_1.ObjectUtils.IsValid(e)) {
            this.Lbn.set(t[0], e);
          }
          i.SetResult();
        });
      }
      await Promise.all(e);
    }
  }
  OnStart() {
    this.OnInit();
    if (ModelManager_1.ModelManager.PlotModel.CurTalkItem) {
      this.Mto(ModelManager_1.ModelManager.PlotModel.CurTalkItem);
    }
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetOriginalItem());
    this.$bn = LanguageSystem_1.LanguageSystem.PackageAudio;
  }
  OnAfterShow() {
    this.Vqd();
    this.Eto(ModelManager_1.ModelManager.PlotModel.HangViewHud, false);
  }
  OnBeforeHide() {
    this.jqd();
    this.Eto(true, false);
  }
  OnBeforeDestroy() {
    this.Lbn.clear();
    this.rto();
    this.SPe?.Clear();
    ControllerHolder_1.ControllerHolder.FlowController.CountDownSkip(false);
  }
  async OnShowAsyncImplementImplement() {
    if (this.FirstShow) {
      this.FirstShow = false;
      await this.PlaySequenceAsync("Start");
    }
  }
  async OnHideAsyncImplementImplement() {
    if (this.LastHide) {
      this.LastHide = false;
      await this.PlaySequenceAsync("Close");
    }
  }
  async PlaySequenceAsync(e, t = false, i = false, s = undefined) {
    var o = new CustomPromise_1.CustomPromise();
    await this.SPe.PlaySequenceAsync(e, o, t, i, s);
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
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 26, "[PlotTips] 暂停字幕");
    }
    this.ybn?.Pause();
    if (this.lZi !== AudioSystem_1.INVALID_AUDIO_EVENT_VALUE) {
      AudioSystem_1.AudioSystem.ExecuteAction(this.lZi, 1, {
        TransitionDuration: BREAK_TIME
      });
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
      this.Ybn++;
      const s = this.Ybn;
      this.lZi = AudioSystem_1.AudioSystem.PostEvent(this.OverrideAudioEventName ?? e, this.Nqd?.AudioAttachActor, {
        ExternalSourceName: this.OverrideAudioSrcName ?? t.SubtitleSrc,
        ExternalSourceMediaName: i,
        CallbackMask: 1,
        CallbackHandler: (e, t) => {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 26, "[PlotTips] 语音播放完成回调", ["mediaName", i]);
          }
          if (e === 0 && s === this.Ybn) {
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
    const s = (0, AudioSystem_1.parseAudioEventPath)(i.AkEvent);
    if (this.lZi === AudioSystem_1.INVALID_AUDIO_EVENT_VALUE) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[PlotTips] 语气播放", ["event", s]);
      }
      this.Ybn++;
      const o = this.Ybn;
      this.lZi = AudioSystem_1.AudioSystem.PostEvent(s, undefined, {
        CallbackMask: 1,
        CallbackHandler: (e, t) => {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 26, "[PlotTips] 语气播放完成回调", ["event", s]);
          }
          if (e === 0 && o === this.Ybn) {
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
        if (t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i)) {
          if ((t = t.Entity.GetComponent(1)?.Owner)?.IsValid()) {
            AudioSystem_1.AudioSystem.PostEvent(e, t);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Event", 26, "未能获取到该实体对应的有效Actor", ["entityId", i]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Event", 26, "实体不存在", ["entityId", i]);
        }
      }
    }
  }
}
exports.PlotTipsViewBase = PlotTipsViewBase;
//# sourceMappingURL=PlotTipsViewBase.js.map