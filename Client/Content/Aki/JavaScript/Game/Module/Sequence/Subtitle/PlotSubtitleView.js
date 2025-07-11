"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotSubtitleView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioController_1 = require("../../../../Core/Audio/AudioController");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const Queue_1 = require("../../../../Core/Container/Queue");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const ExternalSourceSettingById_1 = require("../../../../Core/Define/ConfigQuery/ExternalSourceSettingById");
const PlotAudioById_1 = require("../../../../Core/Define/ConfigQuery/PlotAudioById");
const SpeakerById_1 = require("../../../../Core/Define/ConfigQuery/SpeakerById");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ScreenEffectSystem_1 = require("../../../Render/Effect/ScreenEffectSystem/ScreenEffectSystem");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const UiManager_1 = require("../../../Ui/UiManager");
const PlotAudioModel_1 = require("../../Plot/PlotAudioModel");
const PlotController_1 = require("../../Plot/PlotController");
const PlotDefine_1 = require("../../Plot/PlotDefine");
const PlotChildView_1 = require("../../Plot/PlotView/PlotChildView");
const PlotOptionItem_1 = require("../../Plot/PlotView/PlotOptionItem");
const PlotReviewComponent_1 = require("../../Plot/PlotView/PlotReviewComponent");
const PlotSkipComponent_1 = require("../../Plot/PlotView/PlotSkipComponent");
const PlotTextLogic_1 = require("../../Plot/PlotView/PlotTextLogic");
const UiAssistant_1 = require("../../Plot/Sequence/Assistant/UiAssistant");
const SequenceController_1 = require("../../Plot/Sequence/SequenceController");
const SequenceDefine_1 = require("../../Plot/Sequence/SequenceDefine");
const UiNavigationNewController_1 = require("../../UiNavigation/New/UiNavigationNewController");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const AUDIO_FADE_TIME = 500;
const TIME_SKIP_SEQ = 100;
const CLICK_AUDIO_EVENT = "play_ui_ia_spl_plot_next";
const FADE_TIME = 200;
const DEFAULT_PATH = "/Game/Aki/UI/UIResources/Common/Image/T_CommonDefault_UI.T_CommonDefault_UI";
const OPTIONHEIGHT_OFFSET = 265;
const PAUSE_REASON_SUBTITLE = "Subtitle";
const TIPS = "TermClickTip";
class SubtitleInfo {
  constructor() {
    this.Cvo = new SequenceDefine_1.PlotSubtitleConfig();
    this.HasOption = false;
    this.ShowAllText = false;
    this.ShowOption = false;
    this.Skip = false;
    this.EnableSkipTime = 0;
    this.NeedDelay = false;
    this.StartFinish = false;
  }
  get CurrentConfig() {
    return this.Cvo.Subtitles;
  }
  get CurrentDelayTime() {
    return this.Cvo.AudioDelay;
  }
  get CurrentAutoPlayDelayTime() {
    return this.Cvo.AutoPlayDelay;
  }
  get CurrentAudioTransitionDuration() {
    return this.Cvo.AudioTransitionDuration;
  }
  HasSubtitle() {
    return this.Cvo.Subtitles !== undefined;
  }
  SetCurrentSubtitle(t) {
    this.Cvo.CopyFrom(t);
    this.Hio();
  }
  Hio() {
    if (this.HasSubtitle()) {
      this.HasOption = (this.CurrentConfig.Options?.length ?? 0) > 0 || this.CurrentConfig.Type === "SystemOption";
      this.ShowAllText = false;
      this.ShowOption = false;
      this.EnableSkipTime = TimeUtil_1.TimeUtil.GetServerTimeStamp() + this.Cvo.GuardTime;
      this.NeedDelay = this.Cvo.AutoPlayDelay > 0;
      this.StartFinish = false;
    }
  }
  Clear() {
    this.Cvo.Clear();
    this.HasOption = false;
    this.ShowAllText = false;
    this.ShowOption = false;
    this.Skip = false;
    this.EnableSkipTime = 0;
    this.NeedDelay = false;
    this.StartFinish = false;
  }
}
class PlotSubtitleView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.gvo = "";
    this.OptionKeys = new Array();
    this.OsList = new Array();
    this.fvo = "";
    this.pvo = undefined;
    this.cZi = undefined;
    this.mZi = undefined;
    this.vvo = false;
    this.Mvo = new AudioController_1.PlayResult();
    this.Evo = new AudioController_1.PlayResult();
    this.Svo = 0;
    this.r1t = 0;
    this.yvo = undefined;
    this.Ivo = undefined;
    this._eo = undefined;
    this.qZi = undefined;
    this.HoverIndex = 0;
    this.ueo = undefined;
    this.ceo = undefined;
    this.meo = false;
    this.deo = undefined;
    this.Fuc = undefined;
    this.Lrt = true;
    this.neo = undefined;
    this.B8 = "LevelA";
    this.CurOption = new Array();
    this.Reo = 0;
    this.Aeo = false;
    this.Sbn = false;
    this.xeo = false;
    this.weo = undefined;
    this.Tvo = false;
    this.veo = undefined;
    this.Meo = undefined;
    this.Eeo = undefined;
    this.Seo = undefined;
    this.Ieo = undefined;
    this.Teo = undefined;
    this.Leo = undefined;
    this.FWs = undefined;
    this.sCa = undefined;
    this.aCa = undefined;
    this.c31 = undefined;
    this.ibc = undefined;
    this.QMa = undefined;
    this.hTl = undefined;
    this.zFu = undefined;
    this.YZt = new PlotTextLogic_1.PlotAudioDelegate();
    this.Lvo = undefined;
    this.Ssu = undefined;
    this.Nra = 0;
    this.HasChildViewPreloaded = false;
    this.TRn = () => {
      if (!this.meo) {
        this.ceo.SetActive(false);
      }
    };
    this.beo = () => {
      var t = new PlotOptionItem_1.PlotOptionItem(this);
      t.BindOnHover(this.qeo);
      return t;
    };
    this.qeo = t => {
      this.neo?.SetSelectedDisplay(false);
      (this.neo = t).SetSelectedDisplay(true);
    };
    this.owt = t => {
      t *= 1000;
      if (t > TimerSystem_1.MIN_TIME && t < TimerSystem_1.MAX_TIME) {
        this.GetExtendToggle(0).RootUIComp.SetUIActive(false);
        this.GetButton(16).RootUIComp.SetUIActive(false);
        this.Fuc.EnableReviewButton(false);
        this.GetButton(1).RootUIComp.SetUIActive(false);
        TimerSystem_1.TimerSystem.Delay(() => {
          this.Neo();
        }, t);
      }
    };
    this.tu1 = () => {
      this.qWc(true);
    };
    this.EI1 = () => {
      this.qWc(false);
    };
    this.Dvo = t => {
      this.gto(false, false);
      this.deo?.AddSummary(t.TalkOutline);
    };
    this.Rvo = () => {
      this.Neo();
    };
    this.t2e = () => {
      ControllerHolder_1.ControllerHolder.FlowController.BackgroundFlow("UI点击跳过(PlotSubtitleView)");
    };
    this.Uvo = t => {
      this.GetItem(22).SetUIActive(t);
    };
    this.OnBtnSubtitleSkipClick = () => {
      if (!!ModelManager_1.ModelManager.PlotModel.PlotConfig.CanInteractive && !!this.pvo.HasSubtitle() && this.CurrentSubtitle?.Type !== "CenterText" && !this.pvo.ShowOption && !this.pvo.Skip) {
        if (this.vvo) {
          this.Avo();
          AudioSystem_1.AudioSystem.PostEvent(CLICK_AUDIO_EVENT);
        } else if (!(this.pvo.EnableSkipTime > TimeUtil_1.TimeUtil.GetServerTimeStamp())) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 17, "点击字幕", ["offset", this.mZi.GetSelectorOffset()]);
          }
          if (this.pvo.ShowAllText || this.mZi.GetSelectorOffset() === 0) {
            this.Pvo();
            AudioSystem_1.AudioSystem.PostEvent(CLICK_AUDIO_EVENT);
          } else {
            this.xvo();
          }
        }
      }
    };
    this.OnBtnAutoClick = () => {
      let t = false;
      var i = !ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlay;
      ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlay = i;
      if (ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlayCache = i) {
        this.GetItem(14).SetUIActive(true);
        t = true;
      } else {
        this.GetItem(14).SetUIActive(false);
      }
      if (t && ModelManager_1.ModelManager.SequenceModel.IsPlaying && ModelManager_1.ModelManager.SequenceModel.IsPaused) {
        if (!this.pvo.HasSubtitle() || !this.pvo.HasOption) {
          this.Avo();
        }
      }
    };
    this.zeo = () => {
      this.qWc(true);
      this.fha();
    };
    this.cCa = () => {
      this.qWc(false);
      this.pha();
    };
    this.Zeo = () => {
      this.fha();
      this.Lrt = false;
      this.qWc(true);
    };
    this.DZ_ = () => {
      if (ControllerHolder_1.ControllerHolder.FlowController.OpenPlotReviewView()) {
        this.fha();
        this.qWc(true);
      }
    };
    this.FQe = t => {
      if (t === "PlotReviewView") {
        AudioSystem_1.AudioSystem.PostEvent(PlotDefine_1.PLOT_REVIEW_ENTER_AUDIO_EVENT);
      }
    };
    this.$Ge = t => {
      if (t === "PlotReviewView") {
        AudioSystem_1.AudioSystem.PostEvent(PlotDefine_1.PLOT_REVIEW_EXIT_AUDIO_EVENT);
        this.Lrt = true;
        this.qWc(false);
        this.pha();
      }
    };
    this.Geo = () => {
      this.neo?.SetSelectedDisplay(false);
      var i = this.ceo.GetDisplayGridEndIndex();
      for (let t = 0; t <= i; t++) {
        var e = this.ceo.GetLayoutItemByIndex(t);
        if (e?.GetActive() && (!(t < i) || !e.CheckToggleGray())) {
          this.neo = e;
          this.neo?.SetSelectedDisplay(true);
          UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForView(this.neo.GetToggleItem().GetRootComponent(), true);
          return;
        }
      }
    };
    this.Qzi = t => {
      this.RootItem.SetUIActive(!t);
    };
    this.lei = t => {
      this.r1t += t;
      this.Lvo = TimerSystem_1.TimerSystem.Delay(this.wvo, this.r1t);
    };
    this.wvo = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "音频播放定时器结束");
      }
      this.Lvo = undefined;
      if (this.pvo?.HasSubtitle()) {
        if (!this.pvo.ShowOption && this.pvo.NeedDelay && this.pvo.StartFinish) {
          this.pvo.NeedDelay = false;
          this.Ssu = TimerSystem_1.TimerSystem.Delay(this.Msu, this.pvo.CurrentAutoPlayDelayTime);
        } else if (this.vvo && !this.pvo.ShowOption && this.Bvo()) {
          this.Avo();
        }
      }
    };
    this.Msu = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 45, "自动播放延时定时器结束");
      }
      this.Ssu = undefined;
      if (this.vvo) {
        this.Avo();
      }
    };
    this.Fbn = 0;
    this.Vbn = 0;
    this.Hbn = undefined;
    this.jbn = undefined;
    this.Wbn = () => {
      this.Kbn();
      var s = this.GetScrollView(25);
      var h = this.GetItem(26);
      if (s) {
        var o = this.GetText(5);
        var r = o.GetTextRenderSize().Y;
        var s = s.GetRootComponent();
        if (r <= this.Nra) {
          s.SetHeight(this.Nra);
          h?.SetHeight(this.Nra + OPTIONHEIGHT_OFFSET);
        } else {
          var n = o.GetRenderLineNum();
          var _ = o.GetFontSpaceFinal().Y;
          if (n <= 6) {
            s.SetHeight(r + _);
            h?.SetHeight(r + _ + OPTIONHEIGHT_OFFSET);
          } else {
            let i = 0;
            for (let t = 1; t <= 6; t++) {
              i += o.GetRenderLineHeight(t) + _;
            }
            s.SetHeight(i);
            h?.SetHeight(i + OPTIONHEIGHT_OFFSET);
            r = this.Qbn();
            let t = CommonParamById_1.configCommonParamById.GetIntConfig("PlotAutoScrollDelayCharNum") ?? 25;
            s = o.GetDisplayCharLength();
            h = (t = s <= t ? o.GetRenderLineCharNum(0) : t) / r * 1000;
            s = s - t;
            let e = s;
            if (n > 1) {
              e = s - o.GetRenderLineCharNum(0);
            }
            this.Fbn = e / r * 1000;
            this.jbn = TimerSystem_1.TimerSystem.Delay(this.Xbn, h);
          }
        }
      }
    };
    this.Xbn = () => {
      this.Vbn = 0;
      this.Hbn = TimerSystem_1.TimerSystem.Forever(() => {
        var t = this.Vbn / this.Fbn;
        this.GetScrollView(25)?.SetScrollProgress(t);
        if (t >= 1 && TimerSystem_1.TimerSystem.Has(this.Hbn)) {
          TimerSystem_1.TimerSystem.Remove(this.Hbn);
        }
        this.Vbn += 100;
      }, 100);
    };
    this.keo = t => {
      if (this.pvo.HasSubtitle()) {
        ControllerHolder_1.ControllerHolder.FlowController.LogError("剧情Seq字幕重复触发", ["curId", this.pvo.CurrentConfig.Id], ["newId", t.Subtitles.Id]);
      } else {
        this.bvo();
        this.pvo.Clear();
        this.pvo.SetCurrentSubtitle(t);
        this.Cbn(t?.Subtitles?.BackgroundConfig, () => {
          this.qvo();
        });
      }
    };
    this.H_u = undefined;
    this.Gvo = t => {
      var i = this.pvo.Skip;
      this.eMo();
      this.kvo();
      if (i) {
        this.Nvo();
      } else if (this.vvo) {
        this.Avo();
      }
    };
    this.rAt = t => {
      if (!this.OpenParam?.HideAllUi && !!t && !this.Lrt) {
        this.Lrt = true;
        this.pha();
        this.qWc(false);
      }
    };
    this.eto = (t, i) => {
      if (!this.OpenParam?.HideAllUi && i.TouchType === 0 && !this.Lrt) {
        this.Lrt = true;
        this.pha();
      }
    };
    this.Ovo = (t, i) => {
      this.pvo.StartFinish = true;
      if (this.pvo.HasSubtitle() && this.CurrentSubtitle.Id === t) {
        if (i) {
          if (this.pvo.HasOption) {
            this.pvo.Skip = true;
          } else {
            this.kvo();
            this.Nvo();
          }
        } else if (this.pvo.ShowOption) {
          this.Fvo();
        } else if (this.pvo.HasOption) {
          this.Vvo();
          this.Fvo();
        } else if (this.B8 === "LevelB" && this.pvo.NeedDelay && this.pvo.CurrentConfig.Type !== "CenterText") {
          this.Fvo();
          this.Esu();
          this.Ssu = TimerSystem_1.TimerSystem.Delay(this.Msu, this.pvo.CurrentAutoPlayDelayTime);
        } else {
          t = TimeUtil_1.TimeUtil.GetServerTimeStamp();
          if (this.B8 !== "LevelA" && (!this.Bvo() || this.Lvo) && this.pvo.EnableSkipTime <= t) {
            this.Fvo();
          } else {
            this.bvo();
            this.kvo();
          }
        }
      }
    };
    this.Hvo = () => {
      if (this.pvo.HasSubtitle()) {
        this.bvo();
        this.kvo();
        this.jvo();
        this.Wvo();
      }
    };
    this.Kvo = (t, i, e) => {
      var s;
      if (t) {
        if (t = PlotAudioById_1.configPlotAudioById.GetConfig(i)) {
          s = ExternalSourceSettingById_1.configExternalSourceSettingById.GetConfig(t.ExternalSourceSetting);
          t = PlotAudioModel_1.PlotAudioModel.GetExternalSourcesMediaName(t);
          AudioController_1.AudioController.PostEventByExternalSourcesByUi(s.SubtitleEvent, t, s.SubtitleSrc, this.Evo, undefined, 0, undefined);
        } else {
          ControllerHolder_1.ControllerHolder.FlowController.LogError("读取语音配置为空", ["audioKey", i]);
        }
      } else {
        this.Wvo();
      }
    };
    this.tto = async (t, i, e, s) => {
      this.ito();
      this.Aeo = t;
      this.weo = i;
      if (t) {
        if (i) {
          await this.FadeInBgPhoto(e, s);
        } else {
          await this.FadeInBgPhotoMiddle(e, s);
        }
      } else {
        this.weo = true;
        await this.FadeOutBgPhoto();
        this.weo = false;
        await this.FadeOutBgPhotoMiddle();
        if (s) {
          s();
        }
      }
    };
    this.sto = t => {
      if (this.Reo < 0) {
        this.Reo = 0;
      }
      if (this.Reo > FADE_TIME) {
        this.Reo = FADE_TIME;
      }
      if (this.Aeo) {
        this.Reo += t;
        if (this.weo) {
          if (this.ato() > 1) {
            this.hto();
            this.lto();
          }
        } else if (this._to() > 1) {
          this.hto();
          this.lto();
        }
      } else {
        this.Reo -= t;
        if (this.weo) {
          if (this.ato() <= 0) {
            this.hto();
            this.lto();
          }
        } else if (this._to() <= 0) {
          this.hto();
          this.lto();
        }
      }
    };
    this.lto = () => {
      if (this.weo) {
        if (this.Aeo && this.Teo) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("BlackScreen", 45, "Plot图片FadeIn结束");
          }
          if (this.xeo) {
            this.veo.SetTexture(this.Meo.GetTexture());
            this.Meo.SetAlpha(0);
          }
          this.Teo.SetResult(true);
          this.Teo = undefined;
          this.xeo = true;
        } else if (!this.Aeo && this.Ieo) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("BlackScreen", 45, "Plot图片FadeOut结束");
          }
          this.Ieo.SetResult(true);
          this.Ieo = undefined;
          this.SetTextureByPath(DEFAULT_PATH, this.veo);
          this.xeo = false;
        }
      } else if (this.Aeo && this.Teo) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("BlackScreen", 45, "Plot Middle图片FadeIn结束");
        }
        this.xeo;
        this.Teo.SetResult(true);
        this.Teo = undefined;
        this.xeo = true;
      } else if (!this.Aeo && this.Ieo) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("BlackScreen", 45, "Plot Middle图片FadeOut结束");
        }
        this.Seo?.SetUIActive(false);
        this.Ieo.SetResult(true);
        this.Ieo = undefined;
        this.SetTextureByPath(DEFAULT_PATH, this.Eeo);
        this.xeo = false;
      }
      if (this.Leo) {
        this.Leo();
      }
    };
    this.yNc = false;
    this.SNc = undefined;
  }
  gto(t, i = true) {
    if (t !== this.Tvo) {
      if (this.Tvo = t) {
        this.GetSprite(9).SetUIActive(true);
        if (i) {
          this.UiViewSequence.StopSequenceByKey("PlotClose");
          this.PlaySequence("PlotStart");
        }
      } else if (i) {
        this.UiViewSequence.StopSequenceByKey("PlotStart");
        this.PlaySequence("PlotClose");
      } else {
        this.GetSprite(9).SetUIActive(false);
      }
    }
  }
  get Options() {
    return this.ceo?.GetLayoutItemList();
  }
  get CurrentSubtitle() {
    return this.pvo?.CurrentConfig;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIItem], [7, UE.UILayoutBase], [8, UE.UIItem], [9, UE.UISprite], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIText], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIText], [16, UE.UIButtonComponent], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UISprite], [20, UE.UITexture], [21, UE.UITexture], [22, UE.UIItem], [23, UE.UITexture], [24, UE.UISprite], [25, UE.UIScrollViewComponent], [26, UE.UIItem], [27, UE.UIItem], [28, UE.UIItem], [29, UE.UIItem], [30, UE.UIItem], [31, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.OnBtnSubtitleSkipClick], [0, this.OnBtnAutoClick], [16, this.Zeo], [31, this.DZ_]];
  }
  OnStart() {
    this.GetButton(2).RootUIComp.SetUIActive(false);
    this.deo = new PlotSkipComponent_1.PlotSkipComponent(this.GetButton(2), this.t2e, this.zeo, undefined, this.cCa);
    this.deo.EnableSkipButton(false);
    this.GetButton(31).RootUIComp.SetUIActive(false);
    this.Fuc = new PlotReviewComponent_1.PlotReviewComponent(this.GetButton(31), this.DZ_);
    this.Fuc.EnableReviewButton(false);
    this.GetSprite(19).SetAlpha(0);
    this.pvo = new SubtitleInfo();
    this.ceo = new GenericLayout_1.GenericLayout(this.GetLayoutBase(7), this.beo, this.GetItem(6).GetOwner());
    this.ceo.SetActive(false);
    this.meo = false;
    this.cZi = this.GetItem(8).GetOwner().GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass());
    this.mZi = this.GetItem(8).GetOwner().GetComponentByClass(UE.UIEffectTextAnimation.StaticClass());
    this.GetItem(6).SetUIActive(false);
    this.GetItem(22).SetUIActive(false);
    this.Tvo = false;
    this.GetSprite(9).SetUIActive(false);
    this._eo = this.GetItem(17);
    this.GetButton(1).RootUIComp.GetOwner().GetComponentByClass(UE.UIDraggableComponent.StaticClass()).SetActive(false);
    this.Yeo(false);
    this.Cto(false);
    this.Neo();
    this.vvo = false;
    this.AddScreenEffectPlotRoot();
    this.Lrt = true;
    this.YZt.Init(this.lei);
    this.UiViewSequence.AddSequenceFinishEvent("ChoiceClose", this.TRn);
    var t = this.GetScrollView(25);
    t?.SetCanScroll(false);
    t?.SetRayCastTargetForScrollView(false);
    this.Nra = t?.GetRootComponent()?.GetHeight() ?? 174;
    this.Reo = 0;
    this.veo = this.GetTexture(20);
    if (this.veo) {
      this.veo.SetAlpha(0);
    }
    this.Meo = this.GetTexture(21);
    if (this.Meo) {
      this.Meo.SetAlpha(0);
    }
    this.Eeo = this.GetTexture(23);
    if (this.Eeo) {
      this.Eeo.SetAlpha(0);
    }
    this.Seo = this.GetSprite(24);
    if (this.Seo) {
      this.Seo.SetUIActive(false);
    }
    this.sCa = this.GetItem(29);
    this.GetItem(30).SetUIActive(false);
    var t = this.OpenParam;
    if (t?.HideAllUi) {
      this.Zeo();
    }
    this.zFu?.Clear();
    this.zFu = new Queue_1.Queue();
    this.hTl?.Clear();
    this.hTl = new Queue_1.Queue();
    if (this.B8 === "LevelA") {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MoveCursorToRightDown);
    }
  }
  ResetSubtitle() {
    this.GetText(4).SetText("");
    this.GetText(4).SetUIActive(false);
    this.GetText(15).SetText("");
    this.GetText(15).SetUIActive(false);
    this.GetItem(11).SetUIActive(false);
    this.GetText(5).SetText("");
    this.GetText(12).SetText("");
    this.GetText(5).SetUIActive(false);
    this.GetText(12).SetUIActive(false);
  }
  OnAfterShow() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotViewChange, this.Info.Name, true);
  }
  async OnPlayingStartSequenceAsync() {
    if (!this.OpenParam?.DisableAnim) {
      await this.PlaySequenceAsync("Start01", true);
    }
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotViewChange, this.Info.Name, false);
    this.QMa?.Remove();
    this.QMa = undefined;
    this.GetItem(30).SetUIActive(false);
  }
  async OnPlayingCloseSequenceAsync() {
    if (!this.OpenParam?.DisableAnim) {
      await this.PlaySequenceAsync("Close01", true);
    }
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.PlotModel.OptionEnable = true;
    this.YZt.Clear();
    this.deo?.OnClear();
    this.deo = undefined;
    this.Fuc?.OnClear();
    this.Fuc = undefined;
    this.Ieo = undefined;
    this.Teo = undefined;
    this.SetTextureByPath(DEFAULT_PATH, this.veo);
    this.SetTextureByPath(DEFAULT_PATH, this.Meo);
    this.SetTextureByPath(DEFAULT_PATH, this.Eeo);
    this.xeo = false;
    this.Reo = 0;
    this.hto();
    this.RemoveScreenEffectPlotRoot();
    this.Kbn();
    this.Qvo();
    this.j_u(false);
    this.jvo();
    this.Esu();
    this.Wvo();
    this.Xvo();
    this.ibc?.clear();
    this.ibc = undefined;
    this.aCa = undefined;
    this.hTl?.Clear();
    this.hTl = undefined;
    this.zFu?.Clear();
    this.zFu = undefined;
    this.sCa = undefined;
  }
  Yeo(t) {
    ModelManager_1.ModelManager.PlotModel.CanClick = t;
    this._eo?.SetUIActive(t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.NavigationRefreshPlotNextPage, t);
  }
  Cto(t) {
    this.GetItem(18).SetUIActive(t);
    if (this.B8 === "LevelB") {
      ControllerHolder_1.ControllerHolder.TermExplanationController.SetEnableHyperLink(this.GetText(5), !t);
    }
  }
  Neo() {
    var t = ModelManager_1.ModelManager.PlotModel.PlotConfig;
    var i = t.CanPause;
    this.GetExtendToggle(0).RootUIComp.SetUIActive(i);
    this.GetButton(16).RootUIComp.SetUIActive(i);
    this.Fuc.EnableReviewButton(i);
    this.GetButton(1).RootUIComp.SetUIActive(t.CanInteractive);
    this.B8 = t.PlotLevel;
    this.Oeo();
    this.ResetSubtitle();
  }
  Oeo() {
    var t = this.GetExtendToggle(0);
    if (ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlay) {
      t.SetToggleState(0);
      this.GetItem(14).SetUIActive(true);
    } else {
      t.SetToggleState(1);
      this.GetItem(14).SetUIActive(false);
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotConfigChanged, this.Rvo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.HidePlotUi, this.Qzi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnInputAnyKey, this.rAt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotDoingTextShow, this.Uvo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotStartShowTalk, this.Dvo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, this.FQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTermExplanationViewOpening, this.tu1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTermExplanationViewClosed, this.EI1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotSequencePlay, this.owt);
    SequenceController_1.SequenceController.Event.Add(UiAssistant_1.ESequenceEventName.UpdateSeqSubtitle, this.keo);
    SequenceController_1.SequenceController.Event.Add(UiAssistant_1.ESequenceEventName.HandlePlotOptionSelected, this.Gvo);
    SequenceController_1.SequenceController.Event.Add(UiAssistant_1.ESequenceEventName.HandleSeqSubtitleEnd, this.Ovo);
    SequenceController_1.SequenceController.Event.Add(UiAssistant_1.ESequenceEventName.HandleSubSequenceStop, this.Hvo);
    SequenceController_1.SequenceController.Event.Add(UiAssistant_1.ESequenceEventName.HandleIndependentSeqAudio, this.Kvo);
    this.deo.AddEventListener();
    InputDistributeController_1.InputDistributeController.BindTouch(InputMappingsDefine_1.touchIdMappings.Touch1, this.eto);
    var t = this.GetItem(3);
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlink(this.GetText(5), 0, 1, 3, t, () => {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(TIPS);
    });
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotConfigChanged, this.Rvo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.HidePlotUi, this.Qzi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnInputAnyKey, this.rAt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotDoingTextShow, this.Uvo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotStartShowTalk, this.Dvo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenView, this.FQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTermExplanationViewOpening, this.tu1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTermExplanationViewClosed, this.EI1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotSequencePlay, this.owt);
    SequenceController_1.SequenceController.Event.Remove(UiAssistant_1.ESequenceEventName.UpdateSeqSubtitle, this.keo);
    SequenceController_1.SequenceController.Event.Remove(UiAssistant_1.ESequenceEventName.HandlePlotOptionSelected, this.Gvo);
    SequenceController_1.SequenceController.Event.Remove(UiAssistant_1.ESequenceEventName.HandleSeqSubtitleEnd, this.Ovo);
    SequenceController_1.SequenceController.Event.Remove(UiAssistant_1.ESequenceEventName.HandleSubSequenceStop, this.Hvo);
    SequenceController_1.SequenceController.Event.Remove(UiAssistant_1.ESequenceEventName.HandleIndependentSeqAudio, this.Kvo);
    this.deo.RemoveEventListener();
    InputDistributeController_1.InputDistributeController.UnBindTouch(InputMappingsDefine_1.touchIdMappings.Touch1, this.eto);
    ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(this.GetText(5));
  }
  qWc(t) {
    if (t) {
      ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlay = false;
      this.Oeo();
    } else {
      if ((t = ModelManager_1.ModelManager.PlotModel.PlotConfig).IsAutoPlayCache) {
        t.IsAutoPlay = true;
        this.Oeo();
      }
      if (t.IsAutoPlay && ModelManager_1.ModelManager.SequenceModel.IsPlaying && ModelManager_1.ModelManager.SequenceModel.IsPaused) {
        if (!this.pvo.HasSubtitle() || !this.pvo.HasOption) {
          this.Avo();
        }
      }
    }
  }
  xvo() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 17, "第一次点击，显示完整字幕");
    }
    this.Kbn();
    this.GetScrollView(25)?.SetScrollProgress(1);
    this.cZi.Stop();
    this.mZi.SetSelectorOffset(0);
    this.pvo.EnableSkipTime = TimeUtil_1.TimeUtil.GetServerTimeStamp() + TIME_SKIP_SEQ;
    this.pvo.ShowAllText = true;
    if (this.pvo.HasOption) {
      this.Vvo();
    }
  }
  Pvo() {
    if (this.pvo.HasOption) {
      if (!this.pvo.ShowOption) {
        this.Vvo();
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 17, "第二次点击，跳到下一个镜头或字幕");
      }
      ControllerHolder_1.ControllerHolder.SequenceController.FinishSubtitle(this.CurrentSubtitle.Id);
    }
  }
  fha() {
    this.GetItem(27)?.SetUIActive(false);
    this.GetItem(28)?.SetUIActive(false);
  }
  pha() {
    this.GetItem(27)?.SetUIActive(true);
    this.GetItem(28)?.SetUIActive(true);
  }
  Veo() {
    switch (this.pvo?.CurrentConfig?.Type) {
      case "Option":
      case "SystemOption":
        this.ResetSubtitle();
        this.Yeo(false);
        this.Cto(false);
        this.pvo.ShowAllText = true;
        break;
      case "CenterText":
        this.$vo();
        break;
      default:
        this.Yvo();
        this.Jvo(this.fvo, this.pvo.CurrentDelayTime, this.pvo.CurrentAudioTransitionDuration);
        this.zvo();
    }
  }
  Zvo() {
    this.ResetSubtitle();
    this.jvo();
    this.Yeo(false);
    this.Cto(false);
    this.Xvo();
    this.pvo.Clear();
  }
  Vvo() {
    if (this.pvo?.HasOption) {
      if (this.CurrentSubtitle.Type === "SystemOption") {
        ControllerHolder_1.ControllerHolder.PlotController.ShowSystemOption(this.CurrentSubtitle, t => {
          SequenceController_1.SequenceController.SelectOption(t, this.CurrentSubtitle.Id);
        });
        this.pvo.ShowOption = true;
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "显示选项", ["id", this.CurrentSubtitle?.Id]);
        }
        ModelManager_1.ModelManager.PlotModel.OptionEnable = true;
        this.pvo.ShowOption = true;
        this.SetOptionsShow(true);
        this.CurOption = this.jeo(this.CurrentSubtitle.Options);
        this.ceo.RefreshByData(this.CurOption, this.Geo);
      }
      this.zvo();
    }
  }
  jeo(t) {
    var i = new Array();
    for (const s of t) {
      var e = ModelManager_1.ModelManager.PlotModel.CheckOptionCondition(s, this.CurrentSubtitle);
      if (e || s.OptionLockTip) {
        e = {
          Config: s,
          ConditionCheck: e
        };
        i.push(e);
      }
    }
    return i;
  }
  eMo() {
    this.ito();
  }
  Jvo(t, i, e) {
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      PlotSubtitleView.tMo.Start();
      if (t = StringUtils_1.StringUtils.IsEmpty(t) ? undefined : PlotAudioById_1.configPlotAudioById.GetConfig(t)) {
        this.Ivo = t;
        this.Svo = TimeUtil_1.TimeUtil.GetServerTimeStamp() + i;
        this.iMo();
      }
      PlotSubtitleView.tMo.Stop();
    }
  }
  zvo() {
    var t;
    this.Xvo();
    if (!ModelManager_1.ModelManager.PlotModel.PlotConfig.CanInteractive || !this.pvo.HasSubtitle() || this.pvo.ShowOption) {
      this.Yeo(false);
      this.Cto(false);
    } else if ((t = this.pvo.EnableSkipTime - TimeUtil_1.TimeUtil.GetServerTimeStamp()) < TimerSystem_1.MIN_TIME) {
      this.Yeo(true);
      this.Cto(false);
    } else {
      this.Yeo(false);
      this.Cto(true);
      this.qZi = TimerSystem_1.TimerSystem.Delay(t => {
        this.Yeo(true);
        this.Cto(false);
        this.qZi = undefined;
      }, t);
    }
  }
  Xvo() {
    if (this.qZi) {
      if (TimerSystem_1.TimerSystem.Has(this.qZi)) {
        TimerSystem_1.TimerSystem.Remove(this.qZi);
      }
      this.qZi = undefined;
    }
  }
  iMo() {
    var t;
    if (this.Ivo) {
      if ((t = this.Svo - TimeUtil_1.TimeUtil.GetServerTimeStamp()) < TimerSystem_1.MIN_TIME) {
        this.oMo();
      } else {
        this.yvo = TimerSystem_1.TimerSystem.Delay(() => {
          if (this.Ivo) {
            this.oMo();
          }
        }, t);
      }
    }
  }
  oMo() {
    var t = ExternalSourceSettingById_1.configExternalSourceSettingById.GetConfig(this.Ivo.ExternalSourceSetting);
    var i = PlotAudioModel_1.PlotAudioModel.GetExternalSourcesMediaName(this.Ivo);
    this.YZt.Enable();
    this.r1t = this.Ivo.TailTime < 0 ? ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.AudioEndDelay : this.Ivo.TailTime;
    AudioController_1.AudioController.PostEventByExternalSourcesByUi(t.SubtitleEvent, i, t.SubtitleSrc, this.Mvo, undefined, PlotTextLogic_1.PLAY_FLAG, this.YZt.AudioDelegate);
  }
  jvo() {
    if (this.Ivo) {
      SequenceController_1.SequenceController.StopMouthAnim();
      this.Lvo?.Remove();
      this.Lvo = undefined;
      this.Svo = 0;
      this.r1t = 0;
      this.YZt.Disable();
      AudioController_1.AudioController.StopEvent(this.Mvo, true, AUDIO_FADE_TIME);
      this.rMo();
      this.Ivo = undefined;
      this.Esu();
    }
  }
  rMo() {
    if (this.yvo !== undefined) {
      if (TimerSystem_1.TimerSystem.Has(this.yvo)) {
        TimerSystem_1.TimerSystem.Remove(this.yvo);
      }
      this.yvo = undefined;
    }
  }
  Esu() {
    if (this.Ssu !== undefined) {
      if (TimerSystem_1.TimerSystem.Has(this.Ssu)) {
        TimerSystem_1.TimerSystem.Remove(this.Ssu);
      }
      this.Ssu = undefined;
    }
  }
  Yvo() {
    var t = this.pvo.CurrentConfig;
    if (this.B8 === "LevelA") {
      let t = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(this.gvo);
      if (StringUtils_1.StringUtils.IsEmpty(t)) {
        ControllerHolder_1.ControllerHolder.FlowController.LogError("字幕为空", ["id", this.gvo]);
        t = this.gvo;
      }
      t = this.ParseSubtitle(t);
      this.GetText(12).SetGameRichText(true);
      this.GetText(12).SetText(t);
      this.GetText(12).SetUIActive(true);
      this.GetItem(3).SetAlpha(1);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 38, "A级", ["字幕：", t]);
      }
    } else {
      this.gto(true);
      var i;
      var e = this.GetText(4);
      var s = this.GetText(15);
      var h = this.GetItem(11);
      if (t.Style?.Type === "InnerVoice") {
        e.SetUIActive(false);
        s.SetUIActive(false);
        h.SetUIActive(false);
      } else {
        i = (t = SpeakerById_1.configSpeakerById.GetConfig(t.WhoId)) ? PublicUtil_1.PublicUtil.GetConfigTextByTable(0, t.Id) : undefined;
        t = t ? PublicUtil_1.PublicUtil.GetConfigTextByTable(1, t.Id) : undefined;
        h.SetUIActive(true);
        if (StringUtils_1.StringUtils.IsEmpty(i)) {
          e.SetUIActive(false);
        } else {
          e.SetUIActive(true);
          e.SetText(i);
        }
        if (StringUtils_1.StringUtils.IsEmpty(t)) {
          s.SetUIActive(false);
        } else {
          s.SetUIActive(true);
          s.SetText(t);
        }
      }
      var h = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(this.gvo);
      var h = this.ParseSubtitle(h);
      this.GetText(5).SetGameRichText(true);
      this.GetText(5).SetText(h);
      this.GetText(5).SetUIActive(true);
      var e = this.GetText(5).GetDisplayCharLength();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 38, "B级", ["字幕：", h]);
      }
      if (this.cZi) {
        i = e / ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.TextAnimSpeedSeq;
        this.mZi.SetSelectorOffset(1);
        this.cZi.GetPlayTween().duration = i;
        this.cZi.Play();
      }
      TimerSystem_1.TimerSystem.Next(this.Wbn);
    }
  }
  Qbn() {
    return ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.TextAnimSpeedSeq;
  }
  Kbn() {
    if (TimerSystem_1.TimerSystem.Has(this.Hbn)) {
      TimerSystem_1.TimerSystem.Remove(this.Hbn);
    }
    if (TimerSystem_1.TimerSystem.Has(this.jbn)) {
      TimerSystem_1.TimerSystem.Remove(this.jbn);
    }
  }
  qvo() {
    this.nMo();
    this.sMo();
    this.aMo();
    this.j_u(true);
    this.Veo();
  }
  j_u(t) {
    if (t) {
      this.MZi(this.pvo.CurrentConfig.TalkAkEvent);
      this.H_u = this.pvo.CurrentConfig.TalkEndAkEvent;
    } else {
      this.MZi(this.H_u);
      this.H_u = undefined;
    }
  }
  kvo() {
    if (this.B8 === "LevelB" && this.hMo()) {
      this.gto(false);
    }
    this.j_u(false);
    this.Zvo();
    this.eMo();
  }
  hMo() {
    var t = ControllerHolder_1.ControllerHolder.FlowController.FlowSequence.GetNextTalkItem();
    return !t || t?.Type === "Option" || this.CurrentSubtitle?.WhoId !== t?.WhoId;
  }
  $vo() {
    let t = undefined;
    var i = this.gvo;
    if (i !== "") {
      t = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(i);
      t = this.ParseSubtitle(t);
    } else {
      ControllerHolder_1.ControllerHolder.FlowController.LogError("该字幕没配置对白", ["id", this.pvo.CurrentConfig.Id]);
    }
    var i = ModelManager_1.ModelManager.PlotModel.CenterText;
    i.Text = t;
    i.AutoClose = false;
    i.TalkAkEvent = this.pvo?.CurrentConfig?.TalkAkEvent;
    i.UniversalTone = this.pvo?.CurrentConfig?.UniversalTone;
    PlotController_1.PlotController.HandleShowCenterText(true);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 35, "Sequence黑幕监听日志-打开黑幕", ["subtitleKey", this.gvo]);
    }
  }
  bvo() {
    return !!this.pvo.HasSubtitle() && this.pvo.CurrentConfig.Type === "CenterText" && !(this.Qvo(), Log_1.Log.CheckInfo() && Log_1.Log.Info("Plot", 35, "Sequence黑幕监听日志-关闭黑幕"), 0);
  }
  Qvo() {
    if (UiManager_1.UiManager.IsViewOpen("PlotTransitionViewPop")) {
      UiManager_1.UiManager.CloseView("PlotTransitionViewPop");
    }
  }
  Wvo() {
    AudioController_1.AudioController.StopEvent(this.Evo);
  }
  Nvo() {
    this.pvo.Skip = true;
    SequenceController_1.SequenceController.JumpToNextSubtitleOrChildSeq();
  }
  Fvo(t = PAUSE_REASON_SUBTITLE) {
    this.vvo = true;
    SequenceController_1.SequenceController.PauseSequence(t);
  }
  Avo(t = PAUSE_REASON_SUBTITLE) {
    SequenceController_1.SequenceController.ResumeSequence(t);
    this.vvo = false;
    this.kvo();
  }
  MZi(t) {
    var i;
    var e;
    var s;
    if (t) {
      if (t.Type === IAction_1.EPostAkEvent.Global) {
        i = t.AkEvent;
        AudioController_1.AudioController.PostEvent(i, undefined);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Event", 26, "[PlotSubtitleView][FlowAudio][Global]", ["AkEvent", t?.AkEvent]);
        }
      } else if (t.Type === IAction_1.EPostAkEvent.Target) {
        i = t.AkEvent;
        e = t.EntityId;
        if (!(s = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e))) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Event", 26, "实体不存在", ["entityId", e]);
          }
        }
        if ((s = s.Entity.GetComponent(1)?.Owner)?.IsValid()) {
          AudioController_1.AudioController.PostEvent(i, s);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Event", 26, "[PlotSubtitleView][FlowAudio][Entity]", ["EntityID", e], ["AkEvent", t?.AkEvent]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Event", 26, "未能获取到该实体对应的有效Actor", ["entityId", e]);
        }
      }
    }
  }
  nMo() {
    this.gvo = this.pvo.CurrentConfig.TidTalk;
  }
  sMo() {
    this.OptionKeys.length = 0;
    this.OsList.length = 0;
    this.pvo.CurrentConfig.Options?.forEach(t => {
      this.OptionKeys.push(t.TidTalkOption);
      this.OsList.push(t.Icon);
    });
  }
  aMo() {
    this.fvo = this.pvo.CurrentConfig?.PlayVoice ? this.pvo.CurrentConfig.TidTalk : undefined;
  }
  ito() {
    this.CurOption.length = 0;
    this.SetOptionsShow(false);
  }
  SetOptionsShow(t) {
    if (t !== this.meo) {
      if (this.meo = t) {
        this.ceo.SetActive(true);
        this.UiViewSequence.PlaySequence("ChoiceStart");
        this.GetItem(30).SetUIActive(true);
        this.QMa = TimerSystem_1.TimerSystem.Delay(() => {
          this.GetItem(30).SetUIActive(false);
          this.QMa = undefined;
        }, ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.ProtectOptionTime);
      } else {
        this.UiViewSequence.PlaySequence("ChoiceClose");
        this.GetItem(30).SetUIActive(false);
        this.QMa?.Remove();
        this.QMa = undefined;
      }
    }
  }
  ParseSubtitle(t) {
    if (t) {
      return ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(t);
    } else {
      return "";
    }
  }
  Bvo() {
    return !!this.pvo.HasSubtitle() && this.pvo.CurrentConfig.Type === "CenterText" || ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlay;
  }
  AddScreenEffectPlotRoot() {
    var t = (0, puerts_1.$ref)(undefined);
    var i = ScreenEffectSystem_1.ScreenEffectSystem.GetInstance();
    if (i?.IsValid() && (i.GetScreenEffectPlotRoot(t), this.ueo = (0, puerts_1.$unref)(t), i = this.GetItem(13), this.ueo?.IsValid()) && (this.ueo.K2_AttachRootComponentTo(i), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Plot", 38, "PlotSubtitleView::AddScreenEffectPlotRoot");
    }
  }
  RemoveScreenEffectPlotRoot() {
    if (this.ueo?.IsValid() && (this.ueo.K2_DetachFromActor(), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Plot", 38, "PlotSubtitleView::RemoveScreenEffectPlotRoot");
    }
    this.ueo = undefined;
  }
  GetOptionList() {
    return this.ceo.GetLayoutItemList();
  }
  OnTick(t) {
    if (this.Sbn) {
      this.sto(t);
    }
    if (this.yNc) {
      this.Eeo.SetAlpha(this.SNc.Icon透明度);
      this.Seo.SetAlpha(this.SNc.Icon遮罩透明度);
    }
  }
  SimulateClickSubtitle() {
    if (!Info_1.Info.IsBuildShipping) {
      this.OnBtnSubtitleSkipClick();
    }
  }
  SimulateClickOption() {
    var t;
    if (!Info_1.Info.IsBuildShipping) {
      if (this.pvo.ShowOption && (t = ControllerHolder_1.ControllerHolder.FlowController.GetRecommendedOption(), t = this.GetOptionList()[t])) {
        t.OptionClick(true);
      }
    }
  }
  async Cbn(t, i) {
    var e = t;
    if (e) {
      const o = new CustomPromise_1.CustomPromise();
      var s = () => {
        if (i) {
          i();
        }
        o.SetResult();
      };
      this.FWs = e.Type;
      switch (e.Type) {
        case "Clean":
          this.tto(false, true, undefined, s);
          break;
        case "Image":
          var h = e;
          this.RemovePhotoAtOnce();
          this.tto(true, true, h?.ImageAsset, s);
          break;
        case "Icon":
          h = e;
          this.RemovePhotoAtOnce();
          this.tto(true, false, h?.ImageAsset, s);
          break;
        case "ImageByMcGender":
          this.RemovePhotoAtOnce();
          if (ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 1) {
            this.tto(true, true, e.ImageAssetMale, s);
          } else if (ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 0) {
            this.tto(true, true, e.ImageAssetFemale, s);
          }
          break;
        default:
          s();
      }
      await o.Promise;
    } else {
      if (this.FWs === "Clean") {
        this.RemovePhotoAtOnce();
      }
      this.FWs = undefined;
      if (i) {
        i();
      }
    }
  }
  fto() {
    this.Sbn = true;
  }
  hto() {
    this.Sbn = false;
  }
  ato() {
    var t = MathUtils_1.MathUtils.GetRangePct(0, FADE_TIME, this.Reo);
    if (this.xeo && this.Aeo) {
      this.Meo.SetAlpha(t);
    } else {
      if (!this.Aeo && this.veo.GetAlpha() <= 0) {
        return 0;
      }
      this.veo.SetAlpha(t);
    }
    return t;
  }
  _to() {
    var t = MathUtils_1.MathUtils.GetRangePct(0, FADE_TIME, this.Reo);
    if (!this.Aeo && this.Eeo.GetAlpha() <= 0) {
      return 0;
    } else {
      this.Eeo.SetAlpha(t);
      return t;
    }
  }
  async FadeInBgPhoto(t, i) {
    this.Teo = new CustomPromise_1.CustomPromise();
    this.Aeo = true;
    this.Reo = 0;
    if (this.xeo) {
      if (t) {
        this.SetTextureByPath(t, this.Meo, undefined, () => {
          this.Leo = i;
          this.fto();
        });
      } else {
        this.SetTextureByPath(DEFAULT_PATH, this.Meo, undefined, () => {
          this.Leo = i;
          this.fto();
        });
      }
    } else if (t) {
      this.SetTextureByPath(t, this.veo, undefined, () => {
        this.Leo = i;
        this.fto();
      });
    } else {
      this.SetTextureByPath(DEFAULT_PATH, this.veo, undefined, () => {
        this.Leo = i;
        this.fto();
      });
    }
    await this.Teo.Promise;
  }
  async FadeOutBgPhoto(t) {
    this.Reo = FADE_TIME;
    this.Leo = t;
    this.Ieo = new CustomPromise_1.CustomPromise();
    this.fto();
    await this.Ieo.Promise;
  }
  async FadeInBgPhotoMiddle(t, i) {
    this.Teo = new CustomPromise_1.CustomPromise();
    this.Aeo = true;
    this.Reo = 0;
    if (t) {
      this.SetTextureByPath(t, this.Eeo, undefined, () => {
        this.Seo?.SetUIActive(true);
        this.Leo = i;
        this.fto();
      });
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("BlackScreen", 45, "PlotView设置图片,但未找到Path");
      }
      this.SetTextureByPath(DEFAULT_PATH, this.Eeo, undefined, () => {
        this.Leo = i;
        this.fto();
      });
    }
    await this.Teo.Promise;
  }
  async FadeOutBgPhotoMiddle(t) {
    this.Reo = FADE_TIME;
    this.Leo = t;
    this.Ieo = new CustomPromise_1.CustomPromise();
    this.fto();
    await this.Ieo.Promise;
  }
  async RemovePhotoAtOnce() {
    this.hto();
    this.Reo = 0;
    this.sto(0);
    this.Leo = undefined;
    await this.Teo?.Promise;
  }
  async PreloadOpenBackgroundUi(i) {
    if (!this.HasChildViewPreloaded) {
      if (i.Num() <= 0 && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 45, "Ui预览图:Preload数组数量为空");
      }
      this.ibc = new Map();
      var e = [];
      for (let t = 0; t < i.Num(); t++) {
        var s = i.Get(t);
        var h = new PlotChildView_1.PlotChildView();
        this.ibc.set(s, h);
        e.push(h.PreOpenAsync(this.sCa, s));
      }
      await Promise.all(e);
    }
  }
  async PrePreloadOpenBackgroundUi(t) {
    this.HasChildViewPreloaded = true;
    if (t.length <= 0 && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 45, "Ui预览图:Preload数组数量为空");
    }
    this.ibc = new Map();
    var i = [];
    for (const s of t) {
      var e = new PlotChildView_1.PlotChildView();
      this.ibc.set(s, e);
      i.push(e.PreOpenAsync(this.sCa, s));
    }
    await Promise.all(i);
  }
  async OpenBackgroundUi(t, i, e = true) {
    if (t === "") {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Plot", 45, "Ui预览图:尝试打开预览图但uiName为空");
      }
    } else {
      var s = this.rbc(t);
      if (s) {
        this.zFu?.Push(s);
        await s.OpenAsync(this.sCa, t, i, e);
        this.aCa = s;
        var h = [];
        for (; this.zFu && this.zFu?.Size > 1;) {
          var o = this.zFu.Pop();
          if (o) {
            h.push(this.CloseWhichBackgroundUi(o));
          }
        }
        await Promise.all(h);
      } else {
        var s = new PlotChildView_1.PlotChildView();
        this.zFu?.Push(s);
        await s.OpenAsync(this.sCa, t, i, e);
        this.aCa = s;
        var r = [];
        for (; this.zFu && this.zFu?.Size > 1;) {
          var n = this.zFu.Pop();
          if (n) {
            r.push(this.CloseWhichBackgroundUi(n));
          }
        }
        await Promise.all(r);
      }
      this._Tl();
    }
  }
  async OpenBackgroundUiForSeekSpine(t, i) {
    if (t === "") {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Plot", 45, "Ui预览图:尝试打开预览图但uiName为空");
      }
    } else {
      var e = this.rbc(t);
      if (e) {
        this.zFu?.Push(e);
        await e.OpenAsyncInArray(this.sCa, t, i);
        this.aCa = e;
        var s = [];
        for (; this.zFu && this.zFu?.Size > 1;) {
          var h = this.zFu.Pop();
          if (h) {
            s.push(this.CloseWhichBackgroundUi(h));
          }
        }
        await Promise.all(s);
      } else {
        var e = new PlotChildView_1.PlotChildView();
        this.zFu?.Push(e);
        await e.OpenAsyncInArray(this.sCa, t, i);
        this.aCa = e;
        var o = [];
        for (; this.zFu && this.zFu?.Size > 1;) {
          var r = this.zFu.Pop();
          if (r) {
            o.push(this.CloseWhichBackgroundUi(r));
          }
        }
        await Promise.all(o);
      }
      this._Tl();
    }
  }
  async PlayUiLevelSeq(t) {
    if (this.aCa) {
      if (t === undefined) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Plot", 45, "Ui预览图:名字为空");
        }
      } else {
        await this.aCa.PlayUiLevelSequence(t);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Plot", 45, "Ui预览图:不存在的PlotView子类");
    }
  }
  async CloseBackgroundUiThis() {
    var t = [];
    for (; this.zFu && this.zFu?.Size > 0;) {
      var i = this.zFu.Pop();
      if (i) {
        t.push(this.CloseWhichBackgroundUi(i));
      }
    }
    await Promise.all(t);
    this.aCa = undefined;
    this.c31 = undefined;
  }
  async CloseWhichBackgroundUi(t) {
    if (t) {
      this.obc(t);
      if (!(t = t)) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Plot", 45, "Ui预览图:tempSonUi为空");
        }
      }
      await t?.CloseAsync();
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Plot", 45, "Ui预览图:CloseWhichBackgroundUi,但不存在的PlotView子类");
    }
  }
  CloseSpineAnimation(t) {
    if (this.c31) {
      this.aCa.CloseSpineAnimation(t);
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 45, "Ui预览图:不存在的PlotView子类，关闭失败");
    }
  }
  PlaySonUiSpine(t, i = true) {
    var e;
    if (t) {
      if (this.aCa) {
        this.aCa.PlaySpineAnimation(t, i);
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Plot", 45, "Ui预览图:不存在的PlotView子类,已加入队列");
        }
        (e = new UE.SpineThingsInfo()).Name = t;
        e.NeedLoop = i;
        this.hTl?.Push(e);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Plot", 45, "Ui预览图:SpineName为空");
    }
  }
  PlaySonUiSpineInArray(i) {
    if (i.Num() <= 0) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Plot", 45, "Ui预览图:spineArray为空");
      }
    } else if (this.aCa) {
      for (let t = 0; t < i.Num(); t++) {
        this.aCa.PlaySpineAnimation(i.Get(t).Name, i.Get(t).NeedLoop);
      }
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 45, "Ui预览图:不存在的PlotView子类,已加入队列");
      }
      for (let t = 0; t < i.Num(); t++) {
        this.hTl?.Push(i.Get(t));
      }
    }
  }
  _Tl() {
    if (this.hTl && this.aCa) {
      while (this.hTl.Size > 0) {
        if (!this.hTl.Front) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Plot", 45, "Ui预览图:Queue播放但Spine队列异常");
          }
          break;
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Plot", 45, "Ui预览图:Queue播放", ["name", this.hTl.Front]);
        }
        this.aCa.PlaySpineAnimation(this.hTl.Front.Name, this.hTl.Front.NeedLoop);
        this.hTl.Pop();
      }
    }
  }
  rbc(s) {
    if (this.ibc) {
      let e = undefined;
      this.ibc.forEach((t, i) => {
        if (i === s) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Plot", 45, "Ui预览图:FindSonViewInMap 找到对应的预制体", ["key", i], ["son", t]);
          }
          e = t;
        }
      });
      return e;
    }
  }
  obc(s) {
    if (this.ibc) {
      let e = undefined;
      this.ibc.forEach((t, i) => {
        if (s === t) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Plot", 45, "Ui预览图:DeleteSonViewInMap 找到对应的预制体", ["key", i], ["son", t]);
          }
          e = i;
        }
      });
      if (e) {
        this.ibc.delete(e);
      }
    }
  }
  SetIconBySequence(t, i, e) {
    if (t) {
      this.yNc = true;
      this.SNc = e;
      this.Eeo?.SetTexture(i);
      this.Eeo?.SetUIActive(true);
      this.Seo?.SetUIActive(true);
    } else {
      this.yNc = false;
      this.SNc = undefined;
      this.SetTextureByPath(DEFAULT_PATH, this.Eeo);
      this.Eeo?.SetUIActive(false);
      this.Seo?.SetUIActive(false);
    }
  }
}
(exports.PlotSubtitleView = PlotSubtitleView).tMo = Stats_1.Stat.Create("HandleSubtitleAudio");
//# sourceMappingURL=PlotSubtitleView.js.map