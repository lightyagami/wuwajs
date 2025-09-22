"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotViewManager = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const PlotBattleTipsView_1 = require("../TipsTalk/PlotBattleTipsView");
const PlotPhotoTipsView_1 = require("../TipsTalk/PlotPhotoTipsView");
const PlotTipsView_1 = require("../TipsTalk/PlotTipsView");
class ViewHandle {
  constructor(e = undefined, t = undefined, i = undefined) {
    this.ViewName = e;
    this.Param = t;
    this.Callback = i;
  }
}
class PlotViewManager {
  constructor() {
    this.Lto = undefined;
    this.Dto = new Set();
    this.ui = false;
    this.Rto = false;
    this.Rjt = false;
    this.Ato = new Array();
    this.wto = (e, t) => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 26, "[PlotView] ViewChange", ["name", e], ["isShow", t]);
      }
      if (this.Lto === e && (!t || !!this.Rto)) {
        this.ui = t;
        if (this.ui) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Plot", 26, "[PlotView] 界面显示，打开完成", ["open", this.Lto]);
          }
          this.Bto(true);
          this.bto();
        }
      }
    };
    this.FQe = (e, t) => {};
    this.$Ge = (e, t) => {
      this.vj1(e);
    };
    this.yj1 = e => {
      if (this.Rto && e === this.Lto) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Plot", 26, "[PlotView] 剧情界面打开失败");
        }
        this.Lto = undefined;
        this.ui = false;
        this.Rto = false;
        this.Rjt = true;
        this.Bto(false);
        ControllerHolder_1.ControllerHolder.FlowController.BackgroundFlow("剧情界面打开失败 跳过剧情", false);
        this.bto();
      }
    };
    this.OnUpdateSubtitle = e => {
      ModelManager_1.ModelManager.PlotModel.CurTalkItem = e;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotShowTalk, e, true);
      ControllerHolder_1.ControllerHolder.FlowController.RecordTalkItem(e);
    };
    this.pea = e => {
      if (e) {
        ModelManager_1.ModelManager.PlotModel.HangViewHud = true;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Plot", 26, "[PlotView] 引导界面打开挂起HUD剧情");
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HangPlotViewHud, true);
      } else {
        ModelManager_1.ModelManager.PlotModel.HangViewHud = false;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Plot", 26, "[PlotView] 引导界面解除挂起HUD剧情");
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HangPlotViewHud, false);
      }
    };
    this.iSd = e => {
      if (this.GetCurrentViewName() === "PlotViewHUD") {
        UiManager_1.UiManager.GetViewByName("PlotViewHUD")?.SetEnableTranslucent(e);
      }
      ModelManager_1.ModelManager.PlotModel.TranslucentHud = e;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[PlotView] 半透D级剧情剧情", ["visible", e]);
      }
    };
    this.Fqd = undefined;
    this.Bto = t => {
      var e = this.Dto;
      this.Dto = new Set();
      e.forEach(e => {
        e?.(t);
      });
    };
  }
  RegisterEvent() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotViewChange, this.wto);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, this.FQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpdatePlotSubtitle, this.OnUpdateSubtitle);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTutorialTipExistChanged, this.pea);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenViewFail, this.yj1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiSlowTimeVisibleChanged, this.iSd);
  }
  UnRegisterEvent() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotViewChange, this.wto);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenView, this.FQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdatePlotSubtitle, this.OnUpdateSubtitle);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTutorialTipExistChanged, this.pea);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenViewFail, this.yj1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiSlowTimeVisibleChanged, this.iSd);
  }
  GetCurrentViewName() {
    return this.Lto;
  }
  OnSubmitSubtitle() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotShowTalk, ModelManager_1.ModelManager.PlotModel.CurTalkItem, false);
    ModelManager_1.ModelManager.PlotModel.CurTalkItem = undefined;
  }
  vj1(e) {
    if (this.Lto === e) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 26, "[PlotView] 剧情界面关闭", ["viewName", this.Lto]);
      }
      this.Lto = undefined;
      this.ui = false;
      if (this.Rto) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Plot", 26, "[PlotView] 剧情界面意外关闭，跳过当前剧情");
        }
        this.Rto = false;
        this.Rjt = true;
        this.Bto(false);
        ControllerHolder_1.ControllerHolder.FlowController.BackgroundFlow("剧情界面意外关闭 跳过剧情", false);
      }
      this.bto();
    }
  }
  OpenPlotView(e, t, i) {
    this.Ao(e, i, t);
  }
  ClosePlotView() {
    this.tpi();
  }
  async OpenTipsView(e, t) {
    if (!this.Fqd) {
      if (e === IAction_1.EPromptStyle.Default) {
        this.Fqd = new PlotTipsView_1.PlotTipsView();
      } else if (e === IAction_1.EPromptStyle.Battle) {
        this.Fqd = new PlotBattleTipsView_1.PlotBattleTipsView();
      } else {
        if (e !== IAction_1.EPromptStyle.Photo) {
          ControllerHolder_1.ControllerHolder.FlowController.BackgroundFlow("剧情界面打开失败 跳过剧情", false);
          return;
        }
        this.Fqd = new PlotPhotoTipsView_1.PlotPhotoTipsView();
      }
      if (!(await this.Fqd.OpenAsync(t))) {
        ControllerHolder_1.ControllerHolder.FlowController.BackgroundFlow("剧情界面打开失败 跳过剧情", false);
      }
    }
  }
  CloseTipsView() {
    if (this.Fqd) {
      this.Fqd.CloseAsync();
    }
    this.Fqd = undefined;
  }
  Ao(e, t, i) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 26, "[PlotView] 请求打开界面", ["new", e], ["current", this.Lto]);
    }
    if (this.Rjt) {
      this.Nto(new ViewHandle(e, t, i));
    } else if (this.Lto === e) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdatePlotUiParam, t);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 26, "[PlotView] 重复打开");
      }
      this.WaitOpenCallback(i);
    } else if (this.Lto) {
      this.Nto(new ViewHandle(e, t, i));
      this.tpi();
    } else {
      this.Rjt = true;
      this.Rto = true;
      this.Lto = e;
      this.WaitOpenCallback(i);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 26, "[PlotView] 打开", ["open", e]);
      }
      if (e === "PlotViewHUD") {
        UiManager_1.UiManager.OpenView(e, t);
      } else {
        UiManager_1.UiManager.OpenViewByPlot(e, t);
      }
    }
  }
  tpi() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 26, "[PlotView] 请求关闭界面", ["current", this.Lto]);
    }
    if (this.Rjt) {
      this.Nto(new ViewHandle());
    } else if (this.Lto) {
      this.Rjt = true;
      this.Rto = false;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 26, "[PlotView] 关闭", ["close", this.Lto]);
      }
      UiManager_1.UiManager.CloseView(this.Lto);
    }
  }
  WaitOpenCallback(e) {
    if (e) {
      if (this.Rto) {
        if (this.ui) {
          e(true);
        } else {
          this.Dto.add(e);
        }
      } else {
        e(false);
      }
    }
  }
  RemoveCallback(e) {
    if (e) {
      this.Dto.delete(e);
    }
  }
  bto() {
    var e;
    this.Rjt = false;
    if (this.Ato.length !== 0) {
      if ((e = this.Ato.shift()).ViewName) {
        this.Ao(e.ViewName, e.Param, e.Callback);
      } else {
        this.tpi();
      }
    }
  }
  Nto(e) {
    var t;
    if (this.Ato.length > 0) {
      t = this.Ato[this.Ato.length - 1];
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 26, "[PlotView] 上一次操作被废弃", ["viewName", t.ViewName], ["hasCallback", t.Callback !== undefined]);
      }
      this.Ato.pop();
    }
    this.Ato.push(e);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 26, "[PlotView] 操作进入缓存", ["Handle", e.ViewName ?? "CloseView"]);
    }
  }
}
exports.PlotViewManager = PlotViewManager;
//# sourceMappingURL=PlotViewManager.js.map