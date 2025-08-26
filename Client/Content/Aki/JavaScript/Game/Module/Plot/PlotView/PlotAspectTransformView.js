"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotAspectTransformView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class PlotAspectTransformView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.WI = false;
    this.Knd = undefined;
    this.Xnd = undefined;
    this.Ynd = 0;
    this.cwr = 0;
    this.r1t = 0;
    this.Ist = 0;
    this.qte = 0;
    this.znd = false;
    this.LDe = -1;
    this.J_ = t => {
      if (this.r1t > this.cwr) {
        this.Hide();
      } else {
        this.r1t += t;
        this.qte += t * this.Ist;
        if (this.znd) {
          this.Knd?.SetStretchRight(this.qte);
          this.Xnd?.SetStretchLeft(this.qte);
        } else {
          this.Knd?.SetStretchTop(this.qte);
          this.Xnd?.SetStretchBottom(this.qte);
        }
      }
    };
    this.Jnd = () => {
      var t;
      var s;
      var i;
      var e;
      if (this.WI) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Test", 26, "打印宽高尺寸.StartTransform");
        }
        this.WI = false;
        this.Knd?.SetUIActive(true);
        this.Xnd?.SetUIActive(true);
        t = this.RootItem.GetWidth();
        s = this.RootItem.GetHeight();
        this.Knd?.SetStretchRight(0);
        this.Xnd?.SetStretchRight(0);
        this.Knd?.SetStretchLeft(0);
        this.Xnd?.SetStretchLeft(0);
        this.Knd?.SetStretchTop(0);
        this.Xnd?.SetStretchTop(0);
        this.Knd?.SetStretchBottom(0);
        this.Xnd?.SetStretchBottom(0);
        i = t / s;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Test", 26, "打印宽高尺寸.OnBeforeShow", ["X", t], ["Y", s], ["uiRatio", i], ["Cache.Ratio", this.Ynd]);
        }
        if (this.Ynd < i) {
          this.znd = true;
          i = s * this.Ynd;
          this.Knd?.SetStretchRight(e = t / 2 + i / 2);
          this.Xnd?.SetStretchLeft(e);
          this.Ist = (t - i) / 2 / this.cwr;
          this.qte = e;
        } else {
          this.znd = false;
          i = t / this.Ynd;
          this.Knd?.SetStretchTop(e = s / 2 + i / 2);
          this.Xnd?.SetStretchBottom(e);
          this.Ist = (s - i) / 2 / this.cwr;
          this.qte = e;
        }
        this.LDe = ControllerHolder_1.ControllerHolder.PlotController.AddTick(this.J_);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture]];
  }
  OnStart() {
    this.Knd = this.GetTexture(0);
    this.Knd?.SetUIActive(false);
    this.Knd?.SetAlpha(1);
    this.Xnd = this.GetTexture(1);
    this.Xnd?.SetUIActive(false);
    this.Xnd?.SetAlpha(1);
    this.GetRootItem().GetRenderCanvas().bPostTickUpdate = true;
    this.GetRootItem().SetRaycastTarget(false);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UIViewPortSizeChanged, this.Jnd);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UIViewPortSizeChanged, this.Jnd);
  }
  OnBeforeShow() {}
  OnAfterShow() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Test", 26, "打印宽高尺寸.OnAfterShow");
    }
  }
  OnBeforeHide() {
    ControllerHolder_1.ControllerHolder.PlotController.RemoveTick(this.LDe);
    this.LDe = -1;
  }
  EnableOnce(t) {
    this.WI = true;
    this.Ynd = this.RootItem.GetWidth() / this.RootItem.GetHeight();
    this.cwr = t;
  }
}
exports.PlotAspectTransformView = PlotAspectTransformView;
//# sourceMappingURL=PlotAspectTransformView.js.map