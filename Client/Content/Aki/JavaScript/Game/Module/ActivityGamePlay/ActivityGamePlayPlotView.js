"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityGamePlayPlotView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const ActivityGamePlayPlotById_1 = require("../../../Core/Define/ConfigQuery/ActivityGamePlayPlotById");
const SpineBackgroundById_1 = require("../../../Core/Define/ConfigQuery/SpineBackgroundById");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const InputController_1 = require("../../Input/InputController");
const InputEnums_1 = require("../../Input/InputEnums");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ScreenEffectSystem_1 = require("../../Render/Effect/ScreenEffectSystem/ScreenEffectSystem");
const UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
const TouchFingerManager_1 = require("../../Ui/TouchFinger/TouchFingerManager");
const PlotController_1 = require("../Plot/PlotController");
const PlotDefine_1 = require("../Plot/PlotDefine");
const PlotChildView_1 = require("../Plot/PlotView/PlotChildView");
const PlotSkipComponent_1 = require("../Plot/PlotView/PlotSkipComponent");
const PlotTextLogic_1 = require("../Plot/PlotView/PlotTextLogic");
const FADE_TIME = 1000;
const ROTATE_RATE_X = 0.06;
const ROTATE_RATE_Y = 0.03;
const ZOOM_RATE = 1.2;
const DEFAULT_PATH = "/Game/Aki/UI/UIResources/Common/Image/T_CommonDefault_UI.T_CommonDefault_UI";
const CLICK_AUDIO_EVENT = "play_ui_ia_spl_plot_next";
class ActivityGamePlayPlotView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.CaptionItem = undefined;
    this.CurOption = new Array();
    this.deo = undefined;
    this.seo = undefined;
    this.qZi = undefined;
    this.InteractController = undefined;
    this.aeo = undefined;
    this.heo = 0;
    this.leo = false;
    this._eo = undefined;
    this.ueo = undefined;
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
    this.vya = undefined;
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
    this.Neo = () => {
      this.Mlg();
      this.GetButton(0).RootUIComp.SetUIActive(true);
      this.Beo = true;
      this.GetSprite(7).SetUIActive(this.Beo);
    };
    this.keo = t => {
      this.Feo();
      this.leo = false;
      this.vya?.Remove();
      this.vya = undefined;
      var i = (t.CaptionParams?.StartTime ?? 0) * CommonDefine_1.MILLIONSECOND_PER_SECOND;
      let e = false;
      if (t.Type === "SystemOption") {
        e = t.OptionConfig.KeepPreTalkItem ?? false;
      }
      if (ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelC" && i > TimerSystem_1.MIN_TIME) {
        if (!e) {
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
          if (!e) {
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
      this.geo.ShowOptions();
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
      }
    };
    this.Qzi = t => {
      this.RootItem.SetUIActive(!t);
    };
    this.rAt = t => {
      if (!!t && !this.Lrt) {
        this.Lrt = true;
        this.pha();
      }
    };
    this.eto = (t, i) => {
      if (i.TouchType === 0 && !this.Lrt) {
        this.Lrt = true;
        this.pha();
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
    this.t2e = () => {
      ControllerHolder_1.ControllerHolder.FlowController.BackgroundFlow("UI点击跳过(PlotView)");
    };
    this.zeo = () => {};
    this.cCa = () => {};
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
    return this.geo?.Options;
  }
  get CurrentSubtitle() {
    return this.geo.CurrentContent;
  }
  get HasOptions() {
    return !!this.CurrentSubtitle && !!this.CurrentSubtitle.Options && this.CurrentSubtitle.Options.length !== 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UILayoutBase], [6, UE.UIItem], [7, UE.UISprite], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIItem], [12, UE.UIText], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UISprite], [16, UE.UITexture], [17, UE.UITexture], [18, UE.UIItem], [19, UE.UITexture], [20, UE.UISprite], [21, UE.UIScrollViewComponent], [22, UE.UIItem], [23, UE.UIItem], [24, UE.UIItem], [25, UE.UIItem], [26, UE.UIItem], [27, UE.UISliderComponent], [28, UE.UIItem]];
  }
  OnStart() {
    this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(28));
    var t = this.CaptionItem.GetCloseBtn();
    var i = ModelManager_1.ModelManager.PlotModel.PlotConfig;
    if (i.ActivityGamePlayPlotConfig && ActivityGamePlayPlotById_1.configActivityGamePlayPlotById.GetConfig(i.ActivityGamePlayPlotConfig).NeedClose) {
      this.deo = new PlotSkipComponent_1.PlotSkipComponent(t, this.t2e, this.zeo, undefined, this.cCa);
    }
    var i = this.GetScrollView(21);
    i?.SetCanScroll(false);
    i?.SetRayCastTargetForScrollView(false);
    this.geo = new PlotTextLogic_1.PlotTextCommonLogic(this.GetItem(1), this.GetText(2), this.GetText(12), this.GetText(3), this.GetItem(9), i, this, this.GetLayoutBase(5), this.GetItem(4), this.GetSlider(27), this.UiViewSequence, this.GetItem(26), this.GetItem(22));
    this.geo.SetPlotContentAnimFinishCallback(this.CZi);
    this._eo = this.GetItem(13);
    this.Yeo(false);
    this.Cto(false);
    this.Neo();
    this.AddScreenEffectPlotRoot();
    this.Reo = 0;
    this.Ueo = 0;
    this.veo = this.GetTexture(16);
    if (this.veo) {
      this.veo.SetAlpha(0);
    }
    this.Meo = this.GetTexture(17);
    if (this.Meo) {
      this.Meo.SetAlpha(0);
    }
    this.Eeo = this.GetTexture(19);
    if (this.Eeo) {
      this.Eeo.SetAlpha(0);
    }
    this.Seo = this.GetSprite(20);
    if (this.Seo) {
      this.Seo.SetUIActive(false);
    }
    this.yeo = this.GetSprite(15);
    if (this.yeo) {
      this.yeo.SetAlpha(0);
    }
    this.Lrt = true;
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
    this.geo.OnBeforeHide();
    this.nto();
    this.vya?.Remove();
    this.vya = undefined;
    this.GetItem(26).SetUIActive(false);
    this.CloseChildView();
  }
  OnBeforeDestroy() {
    this.geo.Clear();
    this.RemoveScreenEffectPlotRoot();
    this.InteractController = undefined;
    this.Ieo = undefined;
    this.Teo = undefined;
    this.deo?.OnClear();
    this.deo = undefined;
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
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NavigationTriggerPlotForward, this.K5a);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NavigationTriggerPlotRight, this.$5a);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NavigationTriggerPlotZoom, this.X5a);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, this.FQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
    this.deo?.AddEventListener();
    InputDistributeController_1.InputDistributeController.BindTouch(InputMappingsDefine_1.touchIdMappings.Touch1, this.eto);
    var t = this.GetButton(0).RootUIComp.GetOwner().GetComponentByClass(UE.UIDraggableComponent.StaticClass());
    if (t) {
      t.OnPointerBeginDragCallBack.Bind(this.w8i);
      t.OnPointerDragCallBack.Bind(this.B8i);
      t.OnPointerEndDragCallBack.Bind(this.b8i);
      t.OnPointerUpCallBack.Bind(this.OnBtnSubtitleSkipClick);
      t.OnPointerScrollCallBack.Bind(this.N8i);
    }
    var t = this.GetItem(1);
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlink(this.GetText(3), 0, 1, 3, t);
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
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NavigationTriggerPlotForward, this.K5a);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NavigationTriggerPlotRight, this.$5a);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NavigationTriggerPlotZoom, this.X5a);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenView, this.FQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
    this.deo?.RemoveEventListener();
    InputDistributeController_1.InputDistributeController.UnBindTouch(InputMappingsDefine_1.touchIdMappings.Touch1, this.eto);
    var t = this.GetButton(0).RootUIComp.GetOwner().GetComponentByClass(UE.UIDraggableComponent.StaticClass());
    if (t) {
      t.OnPointerBeginDragCallBack.Unbind();
      t.OnPointerDragCallBack.Unbind();
      t.OnPointerEndDragCallBack.Unbind();
      t.OnPointerUpCallBack.Unbind();
      t.OnPointerScrollCallBack.Unbind();
    }
    ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(this.GetText(3));
  }
  OnTick(t) {
    if (this.Sbn) {
      this.sto(t);
    }
    if (this.Mbn) {
      this.uto(t);
    }
    this.geo.OnTick(t);
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
  Mlg() {
    var t = ModelManager_1.ModelManager.PlotModel.PlotConfig;
    if (t.ActivityGamePlayPlotConfig) {
      const i = ActivityGamePlayPlotById_1.configActivityGamePlayPlotById.GetConfig(t.ActivityGamePlayPlotConfig);
      this.CaptionItem.SetTitleByTextIdAndArgNew(i.Name);
      this.CaptionItem.SetTitleIcon(i.Icon);
      this.CaptionItem.SetHelpBtnActive(i.HelpId !== 0);
      if (i.HelpId !== 0) {
        this.CaptionItem.SetHelpCallBack(() => {
          ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(i.HelpId);
        });
      }
      this.CaptionItem.SetCloseBtnActive(i.NeedClose);
    }
  }
  ito() {
    this.geo.ClearOptions();
  }
  pha() {
    this.GetItem(23)?.SetUIActive(true);
    this.GetItem(24)?.SetUIActive(true);
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
    this.geo.InitInteractOptions();
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
    this.GetItem(14).SetUIActive(t);
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
    this.GetItem(1).SetUIActive(false);
    this.GetText(2).SetUIActive(false);
    this.GetText(12).SetUIActive(false);
    this.GetItem(9).SetUIActive(false);
  }
  AddScreenEffectPlotRoot() {
    var t = (0, puerts_1.$ref)(undefined);
    var i = ScreenEffectSystem_1.ScreenEffectSystem.GetInstance();
    if (i?.IsValid() && (i.GetScreenEffectPlotRoot(t), this.ueo = (0, puerts_1.$unref)(t), i = this.GetItem(11), this.ueo?.IsValid()) && (this.ueo.K2_AttachRootComponentTo(i), Log_1.Log.CheckDebug())) {
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
    let e = undefined;
    let s = undefined;
    s = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 1 ? (e = StringUtils_1.StringUtils.IsEmpty(t.UiPrefabIdMaleVariant) ? t.UiPrefabId : t.UiPrefabIdMaleVariant, StringUtils_1.StringUtils.IsEmpty(t.AnimationNameMaleVariant) ? t.AnimationName : t.AnimationNameMaleVariant) : (e = t.UiPrefabId, t.AnimationName);
    if (this.fUl) {
      if (this.UQl === e) {
        this.fUl.PlaySpineAnimation(s, i);
        return;
      }
      await this.fUl.CloseAsync();
      this.fUl = undefined;
    }
    t = this.GetItem(25);
    this.fUl = new PlotChildView_1.PlotChildView();
    this.UQl = e;
    await this.fUl.OpenAsync(t, e, s, i);
  }
  async CloseChildView() {
    if (this.fUl) {
      await this.fUl.CloseAsync();
      this.fUl = undefined;
      this.UQl = "";
    }
  }
}
exports.ActivityGamePlayPlotView = ActivityGamePlayPlotView;
//# sourceMappingURL=ActivityGamePlayPlotView.js.map