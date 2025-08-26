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
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const PlotTextLogic_1 = require("./PlotTextLogic");
const TRANSLUCENT_ALPHA = 0.6;
class PlotViewHud extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.geo = undefined;
    this.xOi = undefined;
    this._9_ = false;
    this.vto = false;
    this.CZi = () => {
      this.$eo();
    };
    this.Jeo = () => {
      this.Feo();
      this._9_ = false;
      ControllerHolder_1.ControllerHolder.FlowController.FlowShowTalk.SubmitSubtitle(this.geo.CurrentContent);
    };
    this.Mto = e => {
      if (!this.vto) {
        this._9_ = true;
        this.geo.UpdatePlotSubtitle(e);
      }
    };
    this.Weo = (e, t) => {
      this.geo.HandlePortraitVisible(this.RootItem, e, t);
    };
    this.rto = () => {
      this._9_ = false;
      this.geo.ClearPlotContent();
      this.Feo();
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
          this.J2n();
          ControllerHolder_1.ControllerHolder.FlowController.CountDownSkip(false);
        }
      }
    };
    this.Sto = e => {
      this.OpenParam = e;
      this.yto();
      this.Ito();
      this.Tto();
    };
  }
  SimulateClickSubtitle() {}
  SimulateClickOption() {}
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIScrollViewComponent]];
  }
  OnStart() {
    var e = this.GetScrollView(8);
    e?.SetCanScroll(false);
    e?.SetRayCastTargetForScrollView(false);
    this.geo = new PlotTextLogic_1.PlotTextCommonLogic(this.GetItem(4), this.GetText(0), this.GetText(1), this.GetText(2), this.GetItem(3), e);
    this.geo.SetPlotContentAnimFinishCallback(this.CZi);
    this.Tto();
    this.Ito();
    this.vto = false;
  }
  $eo() {
    this.Feo();
    var e = ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.EndWaitTimeLevelD * CommonDefine_1.MILLIONSECOND_PER_SECOND;
    this.xOi = TimerSystem_1.GameplayTimerSystem.Delay(this.Jeo, this.geo.PlayDelayTime <= e ? e : this.geo.PlayDelayTime);
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
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdatePlotSubtitle, this.Mto);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdatePortraitVisible, this.Weo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ClearPlotSubtitle, this.rto);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.HangPlotViewHud, this.Eto);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdatePlotUiParam, this.Sto);
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
    var e;
    var t = this.OpenParam;
    if (t && t.Position && t.ViewName && t.ViewName !== "BattleView") {
      e = this.GetItem(4);
      if (t.Position === 3) {
        e.SetUIParent(this.GetItem(6));
      } else if (t.Position === 2) {
        e.SetUIParent(this.GetItem(7));
      } else {
        e.SetUIParent(this.GetItem(5));
      }
      e.SetAnchorOffsetX(0);
    }
  }
  Ito() {
    var e;
    if (!Info_1.Info.IsInTouch()) {
      if ((e = this.OpenParam) && e.TextWidth) {
        this.GetText(2)?.SetWidth(e.TextWidth);
      }
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
            Log_1.Log.Debug("Plot", 26, "[PlotViewHud] 父界面已经隐藏，attach时子界面主动隐藏");
          }
          this.Hide();
        }
      } else {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Plot", 26, "[PlotViewHud] 父界面已经不在，子界面直接关闭", ["parent", t.ViewName]);
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
  SetEnableTranslucent(e) {
    if (e) {
      this.GetRootItem().SetAlpha(TRANSLUCENT_ALPHA);
    } else {
      this.GetRootItem().SetAlpha(1);
    }
  }
}
exports.PlotViewHud = PlotViewHud;
//# sourceMappingURL=PlotViewHud.js.map