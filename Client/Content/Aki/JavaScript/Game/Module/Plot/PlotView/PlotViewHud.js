"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotViewHud = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const UiManager_1 = require("../../../Ui/UiManager");
const PlotTextLogic_1 = require("./PlotTextLogic");
const TRANSLUCENT_ALPHA = 0.6;
class PlotViewHud extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.geo = undefined;
    this.xOi = undefined;
    this._9_ = false;
    this.txm = false;
    this.vto = false;
    this.$gf = false;
    this.Wgf = false;
    this.CZi = () => {
      this.$eo();
    };
    this.Jeo = () => {
      this.Feo();
      this._9_ = false;
      ControllerHolder_1.ControllerHolder.FlowController.FlowShowTalk.SubmitSubtitle(this.geo.CurrentContent);
    };
    this.lqt = () => {
      if (this.$gf || this.Wgf) {
        this.ixm(false);
        this.ixm(true);
      }
    };
    this.Heo = () => {
      this.txm = true;
      this.geo.ShowOptions();
      this.oXi();
    };
    this.Mto = t => {
      if (!this.vto) {
        this._9_ = true;
        this.ito();
        this.geo.UpdatePlotSubtitle(t);
      }
    };
    this.Weo = (t, e) => {
      this.geo.HandlePortraitVisible(this.RootItem, t, e);
    };
    this.rto = () => {
      this._9_ = false;
      this.geo.ClearPlotContent();
      this.ito();
      this.Feo();
    };
    this.Eto = (t = false, e = true) => {
      if (this.vto !== t && (!!t || !this.IsHideOrHiding)) {
        if (this.vto = t) {
          if (e) {
            this.SetUiActive(false);
          }
          this.Abn();
          this.rxm();
          ControllerHolder_1.ControllerHolder.FlowController.CountDownSkip(true);
        } else {
          if (e) {
            this.SetUiActive(true);
          }
          this.J2n();
          this.oxm();
          ControllerHolder_1.ControllerHolder.FlowController.CountDownSkip(false);
        }
      }
    };
    this.Sto = t => {
      this.OpenParam = t;
      this.yto();
      this.Ito();
      this.Tto();
    };
    this.nxm = () => {
      this.sxm(0);
    };
    this.axm = () => {
      this.sxm(1);
    };
  }
  SimulateClickSubtitle() {}
  SimulateClickOption() {}
  get CurrentSubtitle() {
    return this.geo.CurrentContent;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIScrollViewComponent], [9, UE.UIItem], [10, UE.UILayoutBase], [11, UE.UIItem], [12, UE.UISliderComponent]];
  }
  OnStart() {
    var t = this.GetScrollView(8);
    t?.SetCanScroll(false);
    t?.SetRayCastTargetForScrollView(false);
    this.geo = new PlotTextLogic_1.PlotTextCommonLogic(this.GetItem(4), this.GetText(0), this.GetText(1), this.GetText(2), this.GetItem(3), t, this, this.GetLayoutBase(10), this.GetItem(11), this.GetSlider(12), this.UiViewSequence, undefined, undefined);
    this.geo.SetPlotContentAnimFinishCallback(this.CZi);
    this.Tto();
    this.Ito();
    this.vto = false;
  }
  $eo() {
    this.Feo();
    var t = ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.EndWaitTimeLevelD * CommonDefine_1.MILLIONSECOND_PER_SECOND;
    this.xOi = TimerSystem_1.GameplayTimerSystem.Delay(this.Jeo, this.geo.PlayDelayTime <= t ? t : this.geo.PlayDelayTime);
  }
  Feo() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.xOi)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.xOi);
    }
    this.xOi = undefined;
  }
  async OnPlayingCloseSequenceAsync() {
    await this.geo.DestroyPortraitItem();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpdatePlotSubtitle, this.Mto);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpdatePortraitVisible, this.Weo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ClearPlotSubtitle, this.rto);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.HangPlotViewHud, this.Eto);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpdatePlotUiParam, this.Sto);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ShowPlotSubtitleOptions, this.Heo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.lqt);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdatePlotSubtitle, this.Mto);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdatePortraitVisible, this.Weo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ClearPlotSubtitle, this.rto);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.HangPlotViewHud, this.Eto);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdatePlotUiParam, this.Sto);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ShowPlotSubtitleOptions, this.Heo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.lqt);
  }
  ito() {
    this.txm = false;
    this.geo.ClearOptions();
    this.Atm();
  }
  OnAfterPlayStartSequence() {
    this.yto();
  }
  OnAfterShow() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotViewChange, this.Info.Name, true);
    this.Eto(ModelManager_1.ModelManager.PlotModel?.HangViewHud, false);
    this.SetEnableTranslucent(ModelManager_1.ModelManager.PlotModel.TranslucentHud);
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotViewChange, this.Info.Name, false);
    this.Eto(true, false);
  }
  OnBeforeDestroy() {
    this.geo.Clear();
    ControllerHolder_1.ControllerHolder.FlowController.CountDownSkip(false);
  }
  Tto() {
    var t;
    var e = this.OpenParam;
    if (e && e.Position && e.ViewName && e.ViewName !== "BattleView") {
      t = this.GetItem(4);
      if (e.Position === 3) {
        t.SetUIParent(this.GetItem(6));
      } else if (e.Position === 2) {
        t.SetUIParent(this.GetItem(7));
      } else {
        t.SetUIParent(this.GetItem(5));
      }
      t.SetAnchorOffsetX(0);
    }
  }
  Ito() {
    var t;
    if (!Info_1.Info.IsInTouch()) {
      if ((t = this.OpenParam) && t.TextWidth) {
        this.GetText(2)?.SetWidth(t.TextWidth);
      }
    }
  }
  yto() {
    var t;
    var e = this.OpenParam;
    if (e?.ViewName) {
      if (t = UiManager_1.UiManager.GetViewByName(e.ViewName)) {
        t.AddChild(this);
        if (t.IsHideOrHiding) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 26, "[PlotViewHud] 父界面已经隐藏，attach时子界面主动隐藏");
          }
          this.Hide();
        }
      } else {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Plot", 26, "[PlotViewHud] 父界面已经不在，子界面直接关闭", ["parent", e.ViewName]);
        }
        this.CloseMe();
      }
    }
  }
  Abn() {
    if (ModelManager_1.ModelManager.PlotModel.CurTalkItem && (this.geo.PauseSubtitle(), this.xOi)) {
      this.xOi.Pause();
    }
  }
  J2n() {
    if (ModelManager_1.ModelManager.PlotModel.CurTalkItem) {
      if (this._9_) {
        this.geo.ResumeSubtitle(ModelManager_1.ModelManager.PlotModel.CurTalkItem);
        if (this.xOi) {
          this.xOi.Resume();
        }
      } else {
        this.Mto(ModelManager_1.ModelManager.PlotModel.CurTalkItem);
      }
    }
  }
  rxm() {
    if (this.txm) {
      this.geo.MuteTimeLimitedOption = true;
      this.Atm();
    }
  }
  oxm() {
    if (ModelManager_1.ModelManager.PlotModel.InOptions) {
      if (this.txm) {
        this.geo.MuteTimeLimitedOption = false;
        this.oXi();
      } else {
        this.Heo();
      }
    }
  }
  oXi() {
    ModelManager_1.ModelManager.PlotModel.TimeLimitedOptionTag = true;
    ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(14, [12, 23]);
    this.ixm(true);
  }
  Atm() {
    ModelManager_1.ModelManager.PlotModel.TimeLimitedOptionTag = false;
    ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(14);
    this.ixm(false);
  }
  ixm(t) {
    if (t) {
      if (Info_1.Info.IsInGamepad()) {
        if (!this.$gf) {
          ControllerHolder_1.ControllerHolder.InputDistributeController.BindActionIgnoreLimit(InputMappingsDefine_1.actionMappings.D级限时选项_1, this.nxm);
          ControllerHolder_1.ControllerHolder.InputDistributeController.BindActionIgnoreLimit(InputMappingsDefine_1.actionMappings.D级限时选项_2, this.axm);
          this.$gf = true;
        }
      } else if (!this.Wgf) {
        ControllerHolder_1.ControllerHolder.InputDistributeController.BindActionIgnoreLimit(InputMappingsDefine_1.actionMappings.切换角色1, this.nxm);
        ControllerHolder_1.ControllerHolder.InputDistributeController.BindActionIgnoreLimit(InputMappingsDefine_1.actionMappings.切换角色2, this.axm);
        this.Wgf = true;
      }
    } else {
      if (this.$gf) {
        this.$gf = false;
        ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindActionIgnoreLimit(InputMappingsDefine_1.actionMappings.D级限时选项_1, this.nxm);
        ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindActionIgnoreLimit(InputMappingsDefine_1.actionMappings.D级限时选项_2, this.axm);
      }
      if (this.Wgf) {
        this.Wgf = false;
        ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindActionIgnoreLimit(InputMappingsDefine_1.actionMappings.切换角色1, this.nxm);
        ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindActionIgnoreLimit(InputMappingsDefine_1.actionMappings.切换角色2, this.axm);
      }
    }
  }
  sxm(e) {
    var t;
    if (this.geo?.Options && (t = this.geo.Options.find(t => t.OptionIndex === e))) {
      t.OptionClick();
    }
  }
  SetEnableTranslucent(t) {
    if (t) {
      this.GetRootItem().SetAlpha(TRANSLUCENT_ALPHA);
    } else {
      this.GetRootItem().SetAlpha(1);
    }
  }
  OnTick(t) {
    this.geo.OnTick(t);
  }
}
exports.PlotViewHud = PlotViewHud;
//# sourceMappingURL=PlotViewHud.js.map