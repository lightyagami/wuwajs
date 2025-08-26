"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const SpineBackgroundById_1 = require("../../../../Core/Define/ConfigQuery/SpineBackgroundById");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const InputController_1 = require("../../../Input/InputController");
const InputEnums_1 = require("../../../Input/InputEnums");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ScreenEffectSystem_1 = require("../../../Render/Effect/ScreenEffectSystem/ScreenEffectSystem");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const TouchFingerManager_1 = require("../../../Ui/TouchFinger/TouchFingerManager");
const UiNavigationNewController_1 = require("../../UiNavigation/New/UiNavigationNewController");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const PlotController_1 = require("../PlotController");
const PlotDefine_1 = require("../PlotDefine");
const PlotChildView_1 = require("./PlotChildView");
const PlotOptionItem_1 = require("./PlotOptionItem");
const PlotReviewComponent_1 = require("./PlotReviewComponent");
const PlotSkipComponent_1 = require("./PlotSkipComponent");
const PlotTextLogic_1 = require("./PlotTextLogic");
const FADE_TIME = 1000;
const ROTATE_RATE_X = 0.06;
const ROTATE_RATE_Y = 0.03;
const ZOOM_RATE = 1.2;
const DEFAULT_PATH = "/Game/Aki/UI/UIResources/Common/Image/T_CommonDefault_UI.T_CommonDefault_UI";
const CLICK_AUDIO_EVENT = "play_ui_ia_spl_plot_next";
class PlotView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.neo = undefined;
    this.CurOption = new Array();
    this.seo = undefined;
    this.qZi = undefined;
    this.InteractController = undefined;
    this.aeo = undefined;
    this.heo = 0;
    this.leo = false;
    this._eo = undefined;
    this.ueo = undefined;
    this.ceo = undefined;
    this.meo = false;
    this.deo = undefined;
    this.Fuc = undefined;
    this.geo = undefined;
    this.Mbn = false;
    this.Sbn = false;
    this.veo = undefined;
    this.Meo = undefined;
    this.Eeo = undefined;
    this.Seo = undefined;
    this.yeo = undefined;
    this.Ieo = undefined;
    this.Teo = undefined;
    this.Leo = undefined;
    this.Deo = undefined;
    this.Reo = 0;
    this.Ueo = 0;
    this.Aeo = false;
    this.Peo = false;
    this.Lrt = true;
    this.xeo = false;
    this.weo = undefined;
    this.Beo = false;
    this.x8i = undefined;
    this.QMa = undefined;
    this.vya = undefined;
    this.TRn = () => {
      if (!this.meo) {
        this.ceo?.SetActive(false);
      }
    };
    this.tu1 = () => {
      this.qZu(true);
    };
    this.EI1 = () => {
      this.qZu(false);
    };
    this.Dvo = t => {
      this.deo?.AddSummary(t.TalkOutline);
    };
    this.K5a = t => {
      InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.LookUp, t);
    };
    this.$5a = t => {
      InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.Turn, t);
    };
    this.X5a = t => {
      if (t !== 0) {
        t = t * ZOOM_RATE;
        InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.Zoom, -t);
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
    this.w8i = t => {
      if (ModelManager_1.ModelManager.PlotModel.CanControlView) {
        this.x8i = t.GetLocalPointInPlane();
      }
    };
    this.N8i = t => {
      if (ModelManager_1.ModelManager.PlotModel.CanControlView) {
        t = t.scrollAxisValue * ZOOM_RATE;
        InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.Zoom, t);
      }
    };
    this.B8i = t => {
      var i;
      if (ModelManager_1.ModelManager.PlotModel.CanControlView) {
        if (TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() > 1) {
          this.x8i = undefined;
        } else {
          i = this.x8i;
          this.x8i = t.GetLocalPointInPlane();
          if (i) {
            t = (this.x8i.Y - i.Y) * ROTATE_RATE_Y;
            i = (this.x8i.X - i.X) * ROTATE_RATE_X;
            InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.Turn, i);
            InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.LookUp, -t);
          }
        }
      }
    };
    this.b8i = t => {
      if (ModelManager_1.ModelManager.PlotModel.CanControlView) {
        this.x8i = undefined;
      }
    };
    this.Geo = () => {
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
    };
    this.t2e = () => {
      ControllerHolder_1.ControllerHolder.FlowController.BackgroundFlow("UI点击跳过(PlotView)");
    };
    this.Neo = () => {
      this.deo.EnableSkipButton(false);
      var t = ModelManager_1.ModelManager.PlotModel.PlotConfig.CanPause;
      this.GetExtendToggle(0).RootUIComp.SetUIActive(t);
      this.GetButton(16).RootUIComp.SetUIActive(t);
      this.Fuc.EnableReviewButton(t);
      this.GetButton(1).RootUIComp.SetUIActive(true);
      this.Oeo();
      this.Beo = true;
      this.GetSprite(9).SetUIActive(this.Beo);
    };
    this.keo = t => {
      this.Feo();
      this.leo = false;
      this.vya?.Remove();
      this.vya = undefined;
      var i = (t.CaptionParams?.StartTime ?? 0) * CommonDefine_1.MILLIONSECOND_PER_SECOND;
      let s = false;
      if (t.Type === "SystemOption") {
        s = t.OptionConfig.KeepPreTalkItem ?? false;
      }
      if (ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelC" && i > TimerSystem_1.MIN_TIME) {
        if (!s) {
          this.gto(false);
        }
        this.ito();
        this.vya = TimerSystem_1.TimerSystem.Delay(() => {
          this.vya = undefined;
          this.geo.UpdatePlotSubtitle(t);
          if (t.Type === "Option" || t.Type === "SystemOption") {
            this.Jeo();
          } else {
            this.Veo(t);
          }
        }, i);
      } else {
        this.geo.UpdatePlotSubtitle(t);
        if (t.Type === "Option" || t.Type === "SystemOption") {
          if (!s) {
            this.gto(false);
          }
          this.ito();
          this.Jeo();
        } else {
          this.Veo(t);
        }
      }
    };
    this.Heo = () => {
      if (this.HasOptions) {
        ModelManager_1.ModelManager.PlotModel.OptionEnable = true;
        this.SetOptionsShow(true);
        this.CurOption = this.jeo(this.geo.CurrentContent.Options);
        this.ceo.RefreshByData(this.CurOption, this.Geo);
      }
    };
    this.Weo = (t, i) => {
      this.geo.HandlePortraitVisible(this.RootItem, t, i);
    };
    this.Keo = t => {
      this.geo.IsInteraction = true;
      this.InteractController = t;
      this.aeo = PlotController_1.PlotController.GetTalkItemsOfFlow(this.InteractController.PreTalkConfigs);
      this.heo = -1;
      if (this.aeo) {
        ModelManager_1.ModelManager.PlotModel.FlowListName = this.InteractController.PreTalkConfigs.FlowListName;
        this.Qeo();
      } else {
        this.Xeo();
      }
    };
    this.CZi = () => {
      if (this.geo.IsInteraction) {
        this.$eo();
      } else if (this.leo) {
        if (this.HasOptions) {
          this.Yeo(false);
          this.Jeo();
        } else if (ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlay) {
          this.$eo();
        }
      }
    };
    this.OnBtnSubtitleSkipClick = t => {
      if (!t?.dragComponent || !ModelManager_1.ModelManager.PlotModel.CanControlView) {
        if (this.geo.IsInteraction) {
          if (!this.aeo || this.heo >= this.aeo.length) {
            return;
          }
        } else if (!ControllerHolder_1.ControllerHolder.FlowController.IsInShowTalk()) {
          return;
        }
        if (this.leo) {
          if (this.geo.SubtitleAnimationTimer !== undefined) {
            this.geo.ForceSkipPlotContentAnim();
          } else {
            this.Yeo(false);
            this.Jeo();
            AudioSystem_1.AudioSystem.PostEvent(CLICK_AUDIO_EVENT);
          }
        } else if (this.qZi !== undefined && this.geo.SubtitleAnimationTimer === undefined && Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Plot", 26, "当前字幕已显示完全，但等待时间未结束，无法点到下一句", ["TalkId", this.geo.CurrentContent.Id], ["WaitTime", this.geo.CurrentContent.WaitTime], ["AnimationTime", this.geo.GetPlotContentAnimDuration()]);
        }
      }
    };
    this.OnBtnAutoClick = () => {
      var t = !ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlay;
      ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlay = t;
      if (ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlayCache = t) {
        if (!this.geo.IsTextAnimPlaying && !this.HasOptions) {
          this.OnBtnSubtitleSkipClick();
        }
        this.GetItem(14).SetUIActive(true);
      } else {
        this.Feo();
        this.GetItem(14).SetUIActive(false);
      }
    };
    this.zeo = () => {
      this.qZu(true);
      this.fha();
    };
    this.cCa = () => {
      this.qZu(false);
      this.pha();
    };
    this.Zeo = () => {
      this.fha();
      this.Lrt = false;
      this.qZu(true);
    };
    this.DZ_ = () => {
      if (ControllerHolder_1.ControllerHolder.FlowController.OpenPlotReviewView()) {
        this.fha();
        this.qZu(true);
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
        this.pha();
        this.qZu(false);
      }
    };
    this.Qzi = t => {
      this.RootItem.SetUIActive(!t);
    };
    this.rAt = t => {
      if (!!t && !this.Lrt) {
        this.Lrt = true;
        this.pha();
        this.qZu(true);
      }
    };
    this.eto = (t, i) => {
      if (i.TouchType === 0 && !this.Lrt) {
        this.Lrt = true;
        this.pha();
      }
    };
    this.tto = async (t, i, s, e) => {
      this.ito();
      this.Aeo = t;
      this.weo = i;
      if (t) {
        if (i) {
          await this.FadeInBgPhoto(s, e);
        } else {
          await this.FadeInBgPhotoMiddle(s, e);
        }
      } else {
        this.weo = true;
        await this.FadeOutBgPhoto();
        this.weo = false;
        await this.FadeOutBgPhotoMiddle();
        if (e) {
          e();
        }
      }
    };
    this.oto = async (t, i) => {
      if (this.Peo = t) {
        await this.FadeInBgBlackScreen(i);
      } else {
        await this.FadeOutBgBlackScreen(i);
      }
    };
    this.rto = () => {
      this.nto();
      this.geo.ClearPlotContent();
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
          PlotController_1.PlotController.ResetViewControl();
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
        PlotController_1.PlotController.ResetViewControl();
      }
      if (this.Leo) {
        this.Leo();
      }
    };
    this.uto = t => {
      if (this.Ueo < 0) {
        this.Ueo = 0;
      }
      if (this.Ueo > FADE_TIME) {
        this.Ueo = FADE_TIME;
      }
      if (this.Peo) {
        this.Ueo += t;
        if (this.cto() > 1) {
          this.mto();
          this.dto();
        }
      } else {
        this.Ueo -= t;
        if (this.cto() < 0) {
          this.mto();
          this.dto();
        }
      }
    };
    this.dto = () => {
      if (this.Peo && this.Teo) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("BlackScreen", 45, "Plot黑幕FadeIn结束");
        }
        this.Teo.SetResult(true);
        this.Teo = undefined;
      } else if (!this.Peo && this.Ieo) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("BlackScreen", 45, "Plot黑幕FadeOut结束");
        }
        this.Ieo.SetResult(true);
        this.Ieo = undefined;
      }
      if (this.Deo) {
        this.Deo();
      }
    };
    this.fUl = undefined;
    this.UQl = "";
  }
  get Options() {
    return this.ceo?.GetLayoutItemList();
  }
  get CurrentSubtitle() {
    return this.geo.CurrentContent;
  }
  get HasOptions() {
    return !!this.CurrentSubtitle && !!this.CurrentSubtitle.Options && this.CurrentSubtitle.Options.length !== 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIItem], [7, UE.UILayoutBase], [8, UE.UIItem], [9, UE.UISprite], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIText], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIText], [16, UE.UIButtonComponent], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UISprite], [20, UE.UITexture], [21, UE.UITexture], [22, UE.UIItem], [23, UE.UITexture], [24, UE.UISprite], [25, UE.UIScrollViewComponent], [26, UE.UIItem], [27, UE.UIItem], [28, UE.UIItem], [29, UE.UIItem], [30, UE.UIItem], [31, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.OnBtnAutoClick], [16, this.Zeo], [31, this.DZ_]];
  }
  OnStart() {
    var t = this.GetScrollView(25);
    t?.SetCanScroll(false);
    t?.SetRayCastTargetForScrollView(false);
    this.geo = new PlotTextLogic_1.PlotTextCommonLogic(this.GetItem(3), this.GetText(4), this.GetText(15), this.GetText(5), this.GetItem(11), t, this.GetItem(26));
    this.geo.SetPlotContentAnimFinishCallback(this.CZi);
    this.ceo = new GenericLayout_1.GenericLayout(this.GetLayoutBase(7), this.beo, this.GetItem(6).GetOwner());
    this.GetButton(2).RootUIComp.SetUIActive(false);
    this.deo = new PlotSkipComponent_1.PlotSkipComponent(this.GetButton(2), this.t2e, this.zeo, undefined, this.cCa);
    this.deo.EnableSkipButton(false);
    this.GetButton(31).RootUIComp.SetUIActive(false);
    this.Fuc = new PlotReviewComponent_1.PlotReviewComponent(this.GetButton(31), this.DZ_);
    this.Fuc.EnableReviewButton(false);
    this._eo = this.GetItem(17);
    this.Yeo(false);
    this.Cto(false);
    this.GetItem(6).SetUIActive(false);
    this.GetLayoutBase(7).RootUIComp.SetAlpha(1);
    this.ceo.SetActive(false);
    this.meo = false;
    this.Neo();
    this.AddScreenEffectPlotRoot();
    this.Reo = 0;
    this.Ueo = 0;
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
    this.yeo = this.GetSprite(19);
    if (this.yeo) {
      this.yeo.SetAlpha(0);
    }
    this.Lrt = true;
    this.UiViewSequence.AddSequenceFinishEvent("ChoiceClose", this.TRn);
    this.GetItem(30).SetUIActive(false);
  }
  gto(t) {
    if (t !== this.Beo) {
      this.Beo = t;
      this.PlaySequence(t ? "PlotStart" : "PlotClose");
    }
  }
  async OnPlayingStartSequenceAsync() {
    if (!this.OpenParam?.DisableAnim) {
      await this.PlaySequenceAsync("Start01", true);
    }
  }
  async OnPlayingCloseSequenceAsync() {
    await this.geo.DestroyPortraitItem();
    if (!this.OpenParam?.DisableAnim) {
      await this.PlaySequenceAsync("Close01", true);
    }
  }
  OnAfterShow() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotViewChange, this.Info.Name, true);
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotViewChange, this.Info.Name, false);
    ModelManager_1.ModelManager.PlotModel.OptionEnable = true;
    this.SetTextureByPath(DEFAULT_PATH, this.veo);
    this.SetTextureByPath(DEFAULT_PATH, this.Meo);
    this.SetTextureByPath(DEFAULT_PATH, this.Eeo);
    this.xeo = false;
    this.Reo = 0;
    this.Ueo = 0;
    this.hto();
    this.mto();
    this.geo.ClearPlotContent();
    this.nto();
    this.ceo.SetActive(false);
    this.QMa?.Remove();
    this.QMa = undefined;
    this.vya?.Remove();
    this.vya = undefined;
    this.GetItem(30).SetUIActive(false);
    this.CloseChildView();
  }
  OnBeforeDestroy() {
    this.geo.Clear();
    this.RemoveScreenEffectPlotRoot();
    this.InteractController = undefined;
    this.Ieo = undefined;
    this.Teo = undefined;
    this.ceo = undefined;
    this.deo?.OnClear();
    this.deo = undefined;
    this.Fuc?.OnClear();
    this.Fuc = undefined;
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotConfigChanged, this.Neo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpdatePlotSubtitle, this.keo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ShowPlotSubtitleOptions, this.Heo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpdatePortraitVisible, this.Weo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ClearPlotSubtitle, this.rto);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TriggerPlotInteraction, this.Keo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.HidePlotUi, this.Qzi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnInputAnyKey, this.rAt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotViewBgFadePhoto, this.tto);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotViewBgFadeBlackScreen, this.oto);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotStartShowTalk, this.Dvo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NavigationTriggerPlotForward, this.K5a);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NavigationTriggerPlotRight, this.$5a);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NavigationTriggerPlotZoom, this.X5a);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, this.FQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTermExplanationViewOpening, this.tu1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTermExplanationViewClosed, this.EI1);
    InputDistributeController_1.InputDistributeController.BindTouch(InputMappingsDefine_1.touchIdMappings.Touch1, this.eto);
    this.deo.AddEventListener();
    var t = this.GetButton(1).RootUIComp.GetOwner().GetComponentByClass(UE.UIDraggableComponent.StaticClass());
    if (t) {
      t.OnPointerBeginDragCallBack.Bind(this.w8i);
      t.OnPointerDragCallBack.Bind(this.B8i);
      t.OnPointerEndDragCallBack.Bind(this.b8i);
      t.OnPointerUpCallBack.Bind(this.OnBtnSubtitleSkipClick);
      t.OnPointerScrollCallBack.Bind(this.N8i);
    }
    var t = this.GetItem(3);
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlink(this.GetText(5), 0, 1, 3, t);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotConfigChanged, this.Neo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdatePlotSubtitle, this.keo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ShowPlotSubtitleOptions, this.Heo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdatePortraitVisible, this.Weo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ClearPlotSubtitle, this.rto);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TriggerPlotInteraction, this.Keo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.HidePlotUi, this.Qzi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnInputAnyKey, this.rAt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotViewBgFadePhoto, this.tto);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotViewBgFadeBlackScreen, this.oto);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotStartShowTalk, this.Dvo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NavigationTriggerPlotForward, this.K5a);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NavigationTriggerPlotRight, this.$5a);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NavigationTriggerPlotZoom, this.X5a);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenView, this.FQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTermExplanationViewOpening, this.tu1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTermExplanationViewClosed, this.EI1);
    this.deo.RemoveEventListener();
    InputDistributeController_1.InputDistributeController.UnBindTouch(InputMappingsDefine_1.touchIdMappings.Touch1, this.eto);
    var t = this.GetButton(1).RootUIComp.GetOwner().GetComponentByClass(UE.UIDraggableComponent.StaticClass());
    if (t) {
      t.OnPointerBeginDragCallBack.Unbind();
      t.OnPointerDragCallBack.Unbind();
      t.OnPointerEndDragCallBack.Unbind();
      t.OnPointerUpCallBack.Unbind();
      t.OnPointerScrollCallBack.Unbind();
    }
    ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(this.GetText(5));
  }
  qZu(t) {
    if (t) {
      ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlay = false;
      this.Feo();
      this.Oeo();
    } else {
      if ((t = ModelManager_1.ModelManager.PlotModel.PlotConfig).IsAutoPlayCache) {
        t.IsAutoPlay = true;
        this.Oeo();
      }
      if (!!t.IsAutoPlay && !this.geo.IsTextAnimPlaying && !this.HasOptions) {
        this.OnBtnSubtitleSkipClick();
      }
    }
  }
  OnTick(t) {
    if (this.Sbn) {
      this.sto(t);
    }
    if (this.Mbn) {
      this.uto(t);
    }
  }
  SimulateClickSubtitle() {
    if (!Info_1.Info.IsBuildShipping) {
      this.OnBtnSubtitleSkipClick();
    }
  }
  SimulateClickOption() {
    if (!Info_1.Info.IsBuildShipping) {
      for (let t = this.Options.length - 1; t >= 0; --t) {
        var i = this.Options[t];
        if (!i.CheckToggleGray()) {
          i.OptionClick(true);
        }
      }
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
  jeo(t) {
    var i = new Array();
    for (const e of t) {
      var s = ModelManager_1.ModelManager.PlotModel.CheckOptionCondition(e, this.CurrentSubtitle);
      if (s || e.OptionLockTip) {
        s = {
          Config: e,
          ConditionCheck: s
        };
        i.push(s);
      }
    }
    return i;
  }
  Veo(i) {
    this.ito();
    this.gto(true);
    if (this.geo.IsInteraction || !ModelManager_1.ModelManager.PlotModel.PlotConfig.CanInteractive) {
      this.Yeo(true);
      this.Cto(false);
      this.leo = true;
    } else {
      let t = i.WaitTime;
      if (t === undefined) {
        t = ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.JumpWaitTime;
        i.WaitTime = t;
      }
      if (t < ModelManager_1.ModelManager.PlotModel.PlotTemplate.MinWaitingTime) {
        t = ModelManager_1.ModelManager.PlotModel.PlotTemplate.MinWaitingTime;
        i.WaitTime = t;
      }
      if ((t = TimeUtil_1.TimeUtil.SetTimeMillisecond(t)) < TimerSystem_1.MIN_TIME) {
        this.Yeo(true);
        this.Cto(false);
        this.leo = true;
      } else {
        this.Yeo(false);
        this.Cto(true);
        this.qZi = TimerSystem_1.TimerSystem.Delay(t => {
          this.Cto(false);
          this.qZi = undefined;
          this.leo = true;
          if (!this.geo.IsTextAnimPlaying) {
            if (this.HasOptions) {
              this.Jeo();
              return;
            }
            if (ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlay) {
              this.$eo();
            }
          }
          this.Yeo(true);
        }, t);
      }
    }
  }
  $eo() {
    this.Feo();
    let t = 1;
    if (this.geo.IsInteraction) {
      t = ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.EndWaitTimeInteraction;
    } else if (ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelC") {
      t = ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.EndWaitTimeLevelC;
    }
    if (t < ModelManager_1.ModelManager.PlotModel.PlotTemplate.MinWaitingTime) {
      t = ModelManager_1.ModelManager.PlotModel.PlotTemplate.MinWaitingTime;
    }
    t *= CommonDefine_1.MILLIONSECOND_PER_SECOND;
    this.seo = TimerSystem_1.TimerSystem.Delay(() => {
      this.Yeo(false);
      this.Jeo();
    }, this.geo.PlayDelayTime <= t ? t : this.geo.PlayDelayTime);
  }
  Jeo() {
    this.leo = false;
    this.Feo();
    if (this.geo.IsInteraction) {
      this.Qeo();
    } else {
      ControllerHolder_1.ControllerHolder.FlowController.FlowShowTalk.SubmitSubtitle(this.geo.CurrentContent);
    }
  }
  Xeo() {
    var t;
    if (this.InteractController) {
      ModelManager_1.ModelManager.PlotModel.OptionEnable = true;
      this.SetOptionsShow(true);
      t = this.InteractController.ShowOptions;
      this.ceo.RefreshByData(t, this.Geo);
    }
  }
  Qeo() {
    var t;
    this.heo++;
    if (this.heo < this.aeo.length) {
      this.geo.ClearPlotContent();
      t = this.aeo[this.heo];
      this.geo.PlaySubtitle(t);
      this.Veo(t);
    } else if (this.heo === this.aeo.length) {
      this.Xeo();
    }
  }
  Yeo(t) {
    ModelManager_1.ModelManager.PlotModel.CanClick = t;
    this._eo?.SetUIActive(t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.NavigationRefreshPlotNextPage, t);
  }
  Cto(t) {
    this.GetItem(18).SetUIActive(t);
  }
  Feo() {
    if (TimerSystem_1.TimerSystem.Has(this.seo)) {
      TimerSystem_1.TimerSystem.Remove(this.seo);
    }
    this.seo = undefined;
  }
  RemoveWaitSkipTimer() {
    if (TimerSystem_1.TimerSystem.Has(this.qZi)) {
      TimerSystem_1.TimerSystem.Remove(this.qZi);
    }
    this.qZi = undefined;
  }
  nto() {
    this.RemoveWaitSkipTimer();
    this.Feo();
    this.ito();
    this.GetItem(3).SetUIActive(false);
    this.GetText(4).SetUIActive(false);
    this.GetText(15).SetUIActive(false);
    this.GetItem(11).SetUIActive(false);
  }
  ito() {
    this.CurOption.length = 0;
    this.SetOptionsShow(false);
    this.neo = undefined;
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
  AddScreenEffectPlotRoot() {
    var t = (0, puerts_1.$ref)(undefined);
    var i = ScreenEffectSystem_1.ScreenEffectSystem.GetInstance();
    if (i?.IsValid() && (i.GetScreenEffectPlotRoot(t), this.ueo = (0, puerts_1.$unref)(t), i = this.GetItem(13), this.ueo?.IsValid()) && (this.ueo.K2_AttachRootComponentTo(i), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Plot", 45, "PlotView::AddScreenEffectPlotRoot");
    }
  }
  RemoveScreenEffectPlotRoot() {
    if (this.ueo?.IsValid() && (this.ueo.K2_DetachFromActor(), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Plot", 45, "PlotView::RemoveScreenEffectPlotRoot");
    }
    this.ueo = undefined;
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
  pto() {
    this.Mbn = true;
  }
  mto() {
    this.Mbn = false;
  }
  cto() {
    var t = MathUtils_1.MathUtils.GetRangePct(0, FADE_TIME, this.Ueo);
    this.yeo.SetAlpha(t);
    return t;
  }
  async FadeInBgBlackScreen(t) {
    this.Teo = new CustomPromise_1.CustomPromise();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("BlackScreen", 45, "FadeInBgBlackScreen黑幕进入");
    }
    this.Deo = t;
    this.pto();
    await this.Teo.Promise;
  }
  async FadeOutBgBlackScreen(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("BlackScreen", 45, "FadeInBgBlackScreen黑幕退出");
    }
    this.Deo = t;
    this.Ieo = new CustomPromise_1.CustomPromise();
    this.pto();
    await this.Ieo.Promise;
  }
  async OpenChildView(t, i) {
    t = SpineBackgroundById_1.configSpineBackgroundById.GetConfig(t);
    let s = undefined;
    let e = undefined;
    e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 1 ? (s = StringUtils_1.StringUtils.IsEmpty(t.UiPrefabIdMaleVariant) ? t.UiPrefabId : t.UiPrefabIdMaleVariant, StringUtils_1.StringUtils.IsEmpty(t.AnimationNameMaleVariant) ? t.AnimationName : t.AnimationNameMaleVariant) : (s = t.UiPrefabId, t.AnimationName);
    if (this.fUl) {
      if (this.UQl === s) {
        this.fUl.PlaySpineAnimation(e, i);
        return;
      }
      await this.fUl.CloseAsync();
      this.fUl = undefined;
    }
    t = this.GetItem(29);
    this.fUl = new PlotChildView_1.PlotChildView();
    this.UQl = s;
    await this.fUl.OpenAsync(t, s, e, i);
  }
  async CloseChildView() {
    if (this.fUl) {
      await this.fUl.CloseAsync();
      this.fUl = undefined;
      this.UQl = "";
    }
  }
}
exports.PlotView = PlotView;
//# sourceMappingURL=PlotView.js.map