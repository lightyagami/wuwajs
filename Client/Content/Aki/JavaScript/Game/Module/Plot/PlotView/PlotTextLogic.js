"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotTextCommonLogic = exports.PlotAudioDelegate = exports.PLAY_FLAG = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const LanguageSystem_1 = require("../../../../Core/Common/LanguageSystem");
const Log_1 = require("../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const ExternalSourceSettingById_1 = require("../../../../Core/Define/ConfigQuery/ExternalSourceSettingById");
const InterjectionByTimberIdAndUniversalToneId_1 = require("../../../../Core/Define/ConfigQuery/InterjectionByTimberIdAndUniversalToneId");
const PlotAudioById_1 = require("../../../../Core/Define/ConfigQuery/PlotAudioById");
const SpeakerById_1 = require("../../../../Core/Define/ConfigQuery/SpeakerById");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiNavigationNewController_1 = require("../../UiNavigation/New/UiNavigationNewController");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const PlotAudioModel_1 = require("../PlotAudioModel");
const PlotOptionItem_1 = require("./PlotOptionItem");
const PlotPortraitItem_1 = require("./PlotPortraitItem");
const PlotView_1 = require("./PlotView");
const MAX_LOAD_AUDIO_TIME = 3000;
const BREAK_TIME = 1000;
const OPTIONHEIGHT_OFFSET = 265;
exports.PLAY_FLAG = 8;
class PlotAudioDelegate {
  constructor() {
    this.AudioDelegate = undefined;
    this.AudioDelegateEnable = false;
    this.Callback = undefined;
    this.sZi = (t, i) => {
      if (this.AudioDelegateEnable) {
        if (t === 3) {
          t = i;
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 21, "回调音频时长", ["", t.Duration]);
          }
          this.Callback(t.Duration);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Plot", 17, "回调没移除成功");
      }
    };
  }
  Init(t) {
    this.Callback = t;
  }
  Clear() {
    this.Disable();
    this.Callback = undefined;
  }
  Enable() {
    if (!this.AudioDelegateEnable) {
      this.AudioDelegate = (0, puerts_1.toManualReleaseDelegate)(this.sZi);
      this.AudioDelegateEnable = true;
    }
  }
  Disable() {
    if (this.AudioDelegate !== undefined) {
      (0, puerts_1.releaseManualReleaseDelegate)(this.sZi);
      this.AudioDelegate = undefined;
    }
    this.AudioDelegateEnable = false;
  }
}
exports.PlotAudioDelegate = PlotAudioDelegate;
class PlotTextCommonLogic {
  constructor(t, i, s, e, o, h, r, n, l, a, _, d, m) {
    this.PlotItem = t;
    this.NpcName = i;
    this.NpcTitle = s;
    this.PlotContent = e;
    this.LineItem = o;
    this.TextScrollView = h;
    this.Parent = r;
    this.LayOutBase = n;
    this.OptionItemBase = l;
    this.OptionLimitBar = a;
    this.UiViewSequence = _;
    this.BlockOption = d;
    this.OptionAdjustItem = m;
    this.CurrentContent = undefined;
    this.$bn = "";
    this.Nra = 0;
    this.znu = undefined;
    this.ceo = undefined;
    this.neo = undefined;
    this.meo = false;
    this.CurOption = new Array();
    this.QMa = undefined;
    this.WUm = 0;
    this.QUm = 0;
    this.KUm = -1;
    this.XUm = false;
    this.MuteTimeLimitedOption = false;
    this.YUm = false;
    this.TRn = () => {
      if (!this.meo) {
        this.ceo?.SetActive(false);
        this.OptionLimitBar?.GetRootComponent().SetUIActive(false);
      }
    };
    this.beo = () => {
      var t = new PlotOptionItem_1.PlotOptionItem(this.Parent);
      t.BindOnHover(this.qeo);
      t.BindOnUnHover(this.zUm);
      return t;
    };
    this.zUm = t => {
      if (!this.YUm) {
        t.SetSelectedDisplay(false);
      }
    };
    this.qeo = t => {
      this.neo?.SetSelectedDisplay(false);
      (this.neo = t).SetSelectedDisplay(true);
    };
    this.Geo = () => {
      if (this.YUm) {
        this.neo?.SetSelectedDisplay(false);
        var i = this.ceo.GetDisplayGridEndIndex();
        for (let t = 0; t <= i; t++) {
          var s = this.ceo.GetLayoutItemByIndex(t);
          if (s?.GetActive() && (!(t < i) || !s.CheckToggleGray())) {
            this.neo = s;
            this.neo?.SetSelectedDisplay(true);
            UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForView(this.neo.GetToggleItem().GetRootComponent(), true);
            return;
          }
        }
      }
    };
    this.JUm = () => {
      this.ZUm(false);
    };
    this.PlayDelayTime = undefined;
    this.K2n = undefined;
    this.lZi = AudioSystem_1.INVALID_AUDIO_EVENT_VALUE;
    this.uZi = undefined;
    this.Q2n = 1;
    this.X2n = false;
    this.y$t = false;
    this.$2n = false;
    this.Y2n = undefined;
    this.Fbn = 0;
    this.Vbn = 0;
    this.Hbn = undefined;
    this.jbn = undefined;
    this.Wbn = () => {
      this.Y2n = undefined;
      this.Kbn();
      if (this.TextScrollView) {
        var e = this.PlotContent.GetTextRenderSize().Y;
        var o = this.TextScrollView.GetRootComponent();
        if (e <= this.Nra) {
          o.SetHeight(this.Nra);
          this.OptionAdjustItem?.SetHeight(this.Nra + OPTIONHEIGHT_OFFSET);
        } else {
          var h = this.PlotContent.GetRenderLineNum();
          var r = this.PlotContent.GetFontSpaceFinal().Y;
          if (h <= 6) {
            o.SetHeight(e + r);
            this.OptionAdjustItem?.SetHeight(e + r + OPTIONHEIGHT_OFFSET);
          } else {
            let i = 0;
            for (let t = 1; t <= 6; t++) {
              i += this.PlotContent.GetRenderLineHeight(t) + r;
            }
            o.SetHeight(i);
            this.OptionAdjustItem?.SetHeight(i + OPTIONHEIGHT_OFFSET);
            e = this.Qbn();
            let t = CommonParamById_1.configCommonParamById.GetIntConfig("PlotAutoScrollDelayCharNum") ?? 25;
            var o = this.PlotContent.GetDisplayCharLength();
            var n = (t = o <= t ? this.PlotContent.GetRenderLineCharNum(0) : t) / e * 1000;
            var o = o - t;
            let s = o;
            if (h > 1) {
              s = o - this.PlotContent.GetRenderLineCharNum(0);
            }
            this.Fbn = s / e * 1000;
            this.jbn = TimerSystem_1.GameplayTimerSystem.Delay(this.Xbn, n);
          }
        }
      }
    };
    this.Xbn = () => {
      this.Vbn = 0;
      this.Hbn = TimerSystem_1.GameplayTimerSystem.Forever(() => {
        var t = this.Vbn / this.Fbn;
        this.TextScrollView?.SetScrollProgress(t);
        if (t >= 1 && TimerSystem_1.GameplayTimerSystem.Has(this.Hbn)) {
          TimerSystem_1.GameplayTimerSystem.Remove(this.Hbn);
        }
        this.Vbn += 100;
      }, 100);
    };
    this.cZi = undefined;
    this.mZi = undefined;
    this.SubtitleAnimationTimer = undefined;
    this.IsInteraction = false;
    this.IsTextAnimPlaying = false;
    this.dZi = undefined;
    this.CZi = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[PlotTextLogic] 打字机结束");
      }
      this.cZi.GetPlayTween().from = 1;
      this.gZi();
      this.IsTextAnimPlaying = false;
      this.y$t = true;
      this.dZi?.();
    };
    this.fZi = undefined;
    this.PlotItem.SetUIActive(false);
    this.LineItem.SetUIActive(false);
    this.cZi = this.PlotContent.GetOwner().GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass());
    this.mZi = this.PlotContent.GetOwner().GetComponentByClass(UE.UIEffectTextAnimation.StaticClass());
    this.$bn = LanguageSystem_1.LanguageSystem.PackageAudio;
    this.Nra = h?.GetRootComponent()?.GetHeight() ?? 174;
    this.meo = false;
    this.OptionLimitBar?.GetRootComponent().SetUIActive(false);
    this.BlockOption?.SetUIActive(false);
    if (this.LayOutBase && this.OptionItemBase) {
      this.OptionItemBase.SetUIActive(false);
      this.LayOutBase.RootUIComp.SetAlpha(1);
      this.ceo = new GenericLayout_1.GenericLayout(this.LayOutBase, this.beo, this.OptionItemBase.GetOwner());
      this.ceo.SetActive(false);
    }
    this.UiViewSequence?.AddSequenceFinishEvent("ChoiceClose", this.TRn);
    this.YUm = this.Parent instanceof PlotView_1.PlotView;
  }
  get Options() {
    return this.ceo?.GetLayoutItemList();
  }
  get HasOptions() {
    return !!this.CurrentContent && !!this.CurrentContent.Options && this.CurrentContent.Options.length !== 0;
  }
  get InteractController() {
    if (this.Parent instanceof PlotView_1.PlotView) {
      return this.Parent.InteractController;
    }
  }
  OnBeforeHide() {
    this.ClearPlotContent();
    this.QMa?.Remove();
    this.QMa = undefined;
    this.OptionLimitBar?.GetRootComponent().SetUIActive(false);
    this.ceo?.SetActive(false);
  }
  Clear() {
    this.gZi();
    this.ClearCurPlayAudio();
    if (ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon) {
      ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon = false;
      this.fZi?.Destroy();
      this.fZi = undefined;
    }
    this.Y2n?.Remove();
    this.Y2n = undefined;
    this.Kbn();
    this.b1u(false);
    this.znu = undefined;
  }
  ShowOptions() {
    if (this.HasOptions) {
      ModelManager_1.ModelManager.PlotModel.OptionEnable = true;
      this.SetOptionsShow(true);
      this.CurOption = this.jeo(this.CurrentContent.Options);
      this.ceo.RefreshByData(this.CurOption, this.Geo);
      this.exm();
    }
  }
  ClearOptions() {
    this.CurOption.length = 0;
    this.SetOptionsShow(false);
    this.neo = undefined;
  }
  SetOptionsShow(t) {
    if (t !== this.meo) {
      if (this.meo = t) {
        this.ceo.SetActive(true);
        this.UiViewSequence?.PlaySequence("ChoiceStart");
        if (this.BlockOption) {
          this.BlockOption.SetUIActive(true);
          this.QMa = TimerSystem_1.TimerSystem.Delay(() => {
            this.BlockOption.SetUIActive(false);
            this.QMa = undefined;
          }, ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.ProtectOptionTime);
        }
      } else {
        this.UiViewSequence?.PlaySequence("ChoiceClose");
        if (this.BlockOption) {
          this.BlockOption.SetUIActive(false);
          this.QMa?.Remove();
          this.QMa = undefined;
        }
      }
    }
  }
  jeo(i) {
    var s = new Array();
    for (let t = 0; t < i.length; t++) {
      var e = i[t];
      var o = ModelManager_1.ModelManager.PlotModel.CheckOptionCondition(e, t, this.CurrentContent);
      if (o || e.OptionLockTip) {
        s.push({
          Config: e,
          ConditionCheck: o,
          OnClick: () => {
            this.JUm();
          }
        });
      }
    }
    return s;
  }
  exm() {
    var t;
    if (this.CurOption && this.CurrentContent?.TimeLimitOptionGroup && this.CurrentContent.TimeLimitOptionGroup.Style.Type === "Default") {
      if ((t = this.CurrentContent.TimeLimitOptionGroup.Style).TimeLimit <= 0 || t.TimeoutOptionIndex >= this.CurrentContent.Options.length || t.TimeoutOptionIndex < 0) {
        ControllerHolder_1.ControllerHolder.FlowController.LogError("限时选项配置错误");
      } else {
        this.KUm = t.TimeoutOptionIndex;
        this.WUm = t.TimeLimit * CommonDefine_1.MILLIONSECOND_PER_SECOND;
        this.QUm = 0;
        this.OptionLimitBar?.GetRootComponent().SetUIActive(true);
        this.OptionLimitBar?.SetValue(1);
        this.XUm = true;
      }
    }
  }
  ZUm(t = false) {
    var i;
    if (this.XUm) {
      this.XUm = false;
      if (t) {
        if (i = this.Options.find(t => t.OptionIndex === this.KUm)) {
          i.OptionClick();
        } else {
          ModelManager_1.ModelManager.PlotModel.MarkGrayOption(this.CurrentContent.Id, this.KUm);
          i = this.CurrentContent.Options[this.KUm];
          ControllerHolder_1.ControllerHolder.FlowController.FlowShowTalk.SelectOption(this.KUm, i.Actions);
        }
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[Subtitle] 限时选项完成", ["id", this.CurrentContent.Id], ["bSelected", t]);
      }
      this.WUm = 0;
      this.QUm = 0;
      this.KUm = -1;
    }
  }
  InitInteractOptions() {
    var t;
    if (this.InteractController) {
      ModelManager_1.ModelManager.PlotModel.OptionEnable = true;
      this.SetOptionsShow(true);
      t = this.InteractController.ShowOptions;
      this.ceo.RefreshByData(t, this.Geo);
    }
  }
  UpdatePlotSubtitle(t) {
    let i = false;
    if (!(i = t.Type === "SystemOption" ? t.OptionConfig.KeepPreTalkItem ?? false : i)) {
      this.ClearPlotContent();
    }
    this.IsInteraction = false;
    this.PlaySubtitle(t);
  }
  ClearPlotContent() {
    this.b1u(false);
    this.uZi = undefined;
    this.X2n = false;
    this.y$t = false;
    this.$2n = false;
    this.Q2n = 1;
    this.gZi();
    this.ClearCurPlayAudio();
    this.Kbn();
    this.Y2n?.Remove();
    this.Y2n = undefined;
    this.CurrentContent = undefined;
  }
  pZi(t = true) {
    if (!this.$2n && this.CurrentContent.UniversalTone) {
      var i = this.CurrentContent.UniversalTone.TimberId || this.uZi?.TimberId;
      var s = this.CurrentContent.UniversalTone.UniversalToneId;
      if (i && s) {
        var e = InterjectionByTimberIdAndUniversalToneId_1.configInterjectionByTimberIdAndUniversalToneId.GetConfig(i, s);
        if (e) {
          this.vZi(e, t);
          return true;
        }
      }
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Plot", 26, "通用语气配置无法获取，策划检查配置", ["timberId", i], ["universalToneId", s]);
      }
    }
    return false;
  }
  b1u(t) {
    if (t) {
      this.MZi(this.CurrentContent.TalkAkEvent);
      this.znu = this.CurrentContent.TalkEndAkEvent;
    } else {
      this.MZi(this.znu);
      this.znu = undefined;
    }
  }
  MZi(t) {
    var i;
    var s;
    if (t && (i = (0, AudioSystem_1.parseAudioEventPath)(t.AkEvent))) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[PlotTextLogic] 播放音频事件", ["name", i]);
      }
      if (t.Type === IAction_1.EPostAkEvent.Global) {
        AudioSystem_1.AudioSystem.PostEvent(i);
      } else if (t.Type === IAction_1.EPostAkEvent.Target) {
        t = t.EntityId;
        if (s = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t)) {
          if ((s = s.Entity.GetComponent(1)?.Owner)?.IsValid()) {
            AudioSystem_1.AudioSystem.PostEvent(i, s);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Event", 26, "未能获取到该实体对应的有效Actor", ["entityId", t]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Event", 26, "实体不存在", ["entityId", t]);
        }
      }
    }
  }
  EZi() {
    if (this.$2n) {
      return false;
    }
    if (this.$bn !== LanguageSystem_1.LanguageSystem.PackageAudio) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[PlotTextLogic] 恢复时：音频切换了语言，重播");
      }
      this.$bn = LanguageSystem_1.LanguageSystem.PackageAudio;
      this.ClearCurPlayAudio();
    }
    if (this.lZi !== AudioSystem_1.INVALID_AUDIO_EVENT_VALUE) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[PlotTextLogic] 恢复时：恢复音频播放");
      }
      AudioSystem_1.AudioSystem.ExecuteAction(this.lZi, 2, {
        TransitionDuration: BREAK_TIME
      });
      this.hZi();
    } else if (this.K2n) {
      this.K2n.Resume();
    } else {
      var t = this.CurrentContent.PlayVoice ? PlotAudioById_1.configPlotAudioById.GetConfig(this.CurrentContent.TidTalk) : undefined;
      if (!t) {
        return false;
      }
      const s = t.TailTime < 0 ? ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.AudioEndDelay : t.TailTime;
      var i = ExternalSourceSettingById_1.configExternalSourceSettingById.GetConfig(t.ExternalSourceSetting);
      const e = PlotAudioModel_1.PlotAudioModel.GetExternalSourcesMediaName(t);
      t = (0, AudioSystem_1.parseAudioEventPath)(i.SubtitleEvent);
      PlotTextCommonLogic.Ybn++;
      const o = PlotTextCommonLogic.Ybn;
      this.lZi = AudioSystem_1.AudioSystem.PostEvent(t, undefined, {
        ExternalSourceName: i.SubtitleSrc,
        ExternalSourceMediaName: e,
        CallbackMask: 1048584,
        CallbackHandler: (t, i) => {
          if (o !== PlotTextCommonLogic.Ybn) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Plot", 26, "[PlotTextLogic] 废弃的音频回调", ["id", o], ["mediaName", e], ["type", t]);
            }
          } else if (t === 0) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Plot", 26, "[PlotTextLogic] 音频播放完毕", ["mediaName", e]);
            }
            this.$2n = true;
            this.lZi = AudioSystem_1.INVALID_AUDIO_EVENT_VALUE;
            PlotTextCommonLogic.Ybn++;
          } else if (t === 3) {
            this.PlayDelayTime = i.Duration + s;
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Plot", 26, "[PlotTextLogic] 音频播放开始", ["mediaName", e], ["duration", this.PlayDelayTime]);
            }
            this.aZi();
            ModelManager_1.ModelManager.PlotModel.PlotTemplate.HandleMouthAnim(this.CurrentContent);
            if (!this.X2n) {
              this.hZi();
            }
          }
        }
      });
      this.K2n = TimerSystem_1.GameplayTimerSystem.Delay(() => {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Plot", 26, "[PlotTextLogic] 加载剧情音频超时，直接显示剧情文本");
        }
        this.ClearCurPlayAudio();
        this.PlayDelayTime = undefined;
        this.hZi();
      }, MAX_LOAD_AUDIO_TIME);
    }
    return true;
  }
  vZi(t, s) {
    if (this.K2n) {
      this.K2n.Resume();
    } else {
      if (this.$bn !== LanguageSystem_1.LanguageSystem.PackageAudio) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "[PlotTextLogic] 恢复时：音频切换了语言，重播");
        }
        this.$bn = LanguageSystem_1.LanguageSystem.PackageAudio;
        this.ClearCurPlayAudio();
      }
      if (this.lZi !== AudioSystem_1.INVALID_AUDIO_EVENT_VALUE) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "[PlotTextLogic] 恢复时：恢复音频播放");
        }
        AudioSystem_1.AudioSystem.ExecuteAction(this.lZi, 2, {
          TransitionDuration: BREAK_TIME
        });
        if (s) {
          this.hZi();
        }
      } else {
        const e = (0, AudioSystem_1.parseAudioEventPath)(t.AkEvent);
        const o = PlotTextCommonLogic.Ybn;
        this.lZi = AudioSystem_1.AudioSystem.PostEvent(e, undefined, {
          CallbackMask: 1048584,
          CallbackHandler: (t, i) => {
            if (o !== PlotTextCommonLogic.Ybn) {
              if (Log_1.Log.CheckWarn()) {
                Log_1.Log.Warn("Plot", 26, "[PlotViewHud] 废弃的音频回调", ["id", o], ["eventName", e], ["type", t]);
              }
            } else if (t === 0) {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Plot", 26, "[PlotTextLogic] 音频播放完毕", ["eventName", e]);
              }
              this.$2n = true;
              this.lZi = AudioSystem_1.INVALID_AUDIO_EVENT_VALUE;
              PlotTextCommonLogic.Ybn++;
            } else if (t === 3 && (this.PlayDelayTime = i.Duration, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Plot", 26, "[PlotTextLogic] 音频播放开始", ["eventName", e], ["duration", this.PlayDelayTime]), this.aZi(), !this.X2n) && s) {
              this.hZi();
            }
          }
        });
        if (s) {
          this.K2n = TimerSystem_1.GameplayTimerSystem.Delay(() => {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Plot", 17, "加载通用语气音频超时，直接显示剧情文本");
            }
            this.ClearCurPlayAudio();
            this.PlayDelayTime = undefined;
            this.hZi();
          }, MAX_LOAD_AUDIO_TIME);
        }
      }
    }
  }
  ClearCurPlayAudio() {
    this.aZi();
    PlotTextCommonLogic.Ybn++;
    AudioSystem_1.AudioSystem.ExecuteAction(this.lZi, 0, {
      TransitionDuration: 0
    });
    this.lZi = AudioSystem_1.INVALID_AUDIO_EVENT_VALUE;
  }
  aZi() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.K2n)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.K2n);
    }
    this.K2n = undefined;
  }
  PlaySubtitle(t) {
    var i;
    this.CurrentContent = t;
    this.b1u(true);
    if (this.CurrentContent.Type === "Option" || this.CurrentContent.Type === "SystemOption") {
      this.ClearCurPlayAudio();
      this.pZi(false);
    } else {
      i = this.CurrentContent.CaptionParams;
      this.uZi = SpeakerById_1.configSpeakerById.GetConfig(this.CurrentContent.WhoId);
      if (i && !i.StartTime) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "配置了字幕参数的无法播放语音", ["id", t?.Id], ["param", t?.CaptionParams]);
        }
        this.hZi(i.TotalTime, i.IntervalTime);
      } else if (!this.EZi() && !this.pZi()) {
        this.hZi();
      }
    }
  }
  PauseSubtitle() {
    if (this.CurrentContent) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[PlotTextLogic] 暂停字幕");
      }
      this.X2n = true;
      if (this.K2n) {
        this.K2n.Pause();
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "[PlotTextLogic] 暂停时：音频加载中");
        }
      } else {
        if (this.lZi !== AudioSystem_1.INVALID_AUDIO_EVENT_VALUE && (AudioSystem_1.AudioSystem.ExecuteAction(this.lZi, 1, {
          TransitionDuration: BREAK_TIME
        }), Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("Plot", 26, "[PlotTextLogic] 暂停时：音频播放中");
        }
        this.Y2n?.Remove();
        this.Y2n = undefined;
        this.Kbn();
        if (this.SubtitleAnimationTimer && (this.Q2n = this.mZi.GetSelectorOffset(), this.cZi.Stop(), this.SubtitleAnimationTimer.Pause(), Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("Plot", 26, "[PlotTextLogic] 暂停时：打字机播放中", ["offset", this.Q2n]);
        }
      }
    }
  }
  ResumeSubtitle(t) {
    this.X2n = false;
    this.PlaySubtitle(t);
  }
  hZi(t, i) {
    this.SZi();
    this.yZi();
    this.IZi(t, i);
    this.Y2n = TimerSystem_1.GameplayTimerSystem.Next(this.Wbn);
  }
  SZi() {
    var t;
    this.PlotItem.SetUIActive(true);
    if (this.CurrentContent.Type && this.CurrentContent.Type !== "Talk" || this.CurrentContent.Style?.Type === "InnerVoice") {
      this.LineItem.SetUIActive(false);
      this.NpcName.SetUIActive(false);
      this.NpcTitle.SetUIActive(false);
    } else {
      this.LineItem.SetUIActive(true);
      t = PublicUtil_1.PublicUtil.GetConfigTextByTable(0, this.uZi.Id);
      if (StringUtils_1.StringUtils.IsEmpty(t)) {
        this.NpcName.SetUIActive(false);
      } else {
        this.NpcName.SetUIActive(true);
        this.NpcName.SetText(t);
      }
      t = PublicUtil_1.PublicUtil.GetConfigTextByTable(1, this.uZi.Id);
      if (StringUtils_1.StringUtils.IsEmpty(t)) {
        this.NpcTitle.SetUIActive(false);
      } else {
        this.NpcTitle.SetUIActive(true);
        this.NpcTitle.SetText(t);
      }
    }
  }
  yZi() {
    if (this.CurrentContent.Type === "NoTextItem") {
      this.PlotContent.SetUIActive(false);
    } else {
      this.PlotContent.SetUIActive(true);
      let t = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(this.CurrentContent.TidTalk);
      if (StringUtils_1.StringUtils.IsEmpty(t)) {
        ControllerHolder_1.ControllerHolder.FlowController.LogError("字幕为空", ["id", this.CurrentContent.TidTalk]);
        t = this.CurrentContent.TidTalk;
      }
      var i = ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelD";
      t = ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(t, i);
      this.PlotContent.SetGameRichText(true);
      this.PlotContent.SetText(t);
    }
  }
  Qbn() {
    if (this.IsInteraction) {
      return ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.TextAnimSpeedInteraction;
    } else if (ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelC") {
      return ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.TextAnimSpeedLevelC;
    } else {
      return ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.TextAnimSpeedLevelD;
    }
  }
  Kbn() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.Hbn)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.Hbn);
    }
    if (TimerSystem_1.GameplayTimerSystem.Has(this.jbn)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.jbn);
    }
  }
  IZi(i, s) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 38, "CD级", ["字幕：", this.PlotContent.GetText()]);
    }
    if (this.cZi) {
      if (this.SubtitleAnimationTimer) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "[PlotTextLogic] 恢复时：恢复打字机动画", ["offset", this.Q2n]);
        }
        this.SubtitleAnimationTimer.Resume();
        this.cZi.GetPlayTween().from = this.Q2n;
        this.cZi.GetPlayTween().duration *= this.Q2n;
        this.cZi.Play();
      } else if (this.y$t) {
        this.mZi.SetSelectorOffset(0);
      } else {
        var e = this.PlotContent.GetDisplayCharLength();
        this.cZi.Stop();
        let t = 1;
        t = i || (this.IsInteraction ? e / ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.TextAnimSpeedInteraction : ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelC" ? e / ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.TextAnimSpeedLevelC : e / ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.TextAnimSpeedLevelD);
        this.mZi.SetSelectorOffset(1);
        this.cZi.GetPlayTween().duration = t;
        this.cZi.Play();
        this.IsTextAnimPlaying = true;
        t *= CommonDefine_1.MILLIONSECOND_PER_SECOND;
        if (s) {
          this.PlayDelayTime = s * CommonDefine_1.MILLIONSECOND_PER_SECOND;
        } else if (this.PlayDelayTime) {
          this.PlayDelayTime = this.PlayDelayTime - t;
        } else {
          this.PlayDelayTime = 0;
        }
        this.TZi(t);
      }
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Plot", 18, "找不到字幕动画组件");
      }
      this.CZi();
    }
  }
  TZi(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 26, "[PlotTextLogic] 打字机开始", ["duration", t]);
    }
    this.gZi();
    t = Math.max(t, TimerSystem_1.MIN_TIME);
    this.SubtitleAnimationTimer = TimerSystem_1.GameplayTimerSystem.Delay(this.CZi, t);
  }
  gZi() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.SubtitleAnimationTimer)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.SubtitleAnimationTimer);
    }
    this.SubtitleAnimationTimer = undefined;
  }
  SetPlotContentAnimFinishCallback(t) {
    this.dZi = t;
  }
  ForceSkipPlotContentAnim() {
    this.cZi.Stop();
    this.mZi.SetSelectorOffset(0);
    this.Kbn();
    this.TextScrollView?.SetScrollProgress(1);
    this.CZi();
  }
  GetPlotContentAnimDuration() {
    return this.cZi.GetPlayTween().duration;
  }
  HandlePortraitVisible(t, i, s) {
    if (i && s) {
      if (i.Visible && !ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon) {
        ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon = true;
        this.fZi = new PlotPortraitItem_1.PlotPortraitItem();
        this.fZi.OpenAsync(t, i.HeadStyleConfig).finally(s);
      } else if (i.Visible && ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon) {
        this.fZi.CloseAsync();
        this.fZi = new PlotPortraitItem_1.PlotPortraitItem();
        this.fZi.OpenAsync(t, i.HeadStyleConfig).finally(s);
      } else if (!i.Visible && ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon) {
        ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon = false;
        this.fZi.CloseAsync().finally(s);
        this.fZi = undefined;
      } else {
        s();
      }
    }
  }
  async DestroyPortraitItem() {
    if (ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon) {
      ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon = false;
      await this.fZi.CloseAsync();
      this.fZi = undefined;
    }
  }
  OnTick(t) {
    if (this.XUm && !this.MuteTimeLimitedOption && (this.QUm += t, this.OptionLimitBar?.SetValue(1 - this.QUm / this.WUm), this.QUm >= this.WUm)) {
      this.ZUm(true);
    }
  }
}
(exports.PlotTextCommonLogic = PlotTextCommonLogic).Ybn = 0;
//# sourceMappingURL=PlotTextLogic.js.map