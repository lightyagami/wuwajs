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
    this.Rld = undefined;
    this.wld = undefined;
    this.Lld = 0;
    this.cwr = 0;
    this.r1t = 0;
    this.Ist = 0;
    this.qte = 0;
    this.Pld = false;
    this.LDe = -1;
    this.J_ = t => {
      if (this.r1t > this.cwr) {
        this.Hide();
      } else {
        this.r1t += t;
        this.qte += t * this.Ist;
        if (this.Pld) {
          this.Rld?.SetStretchRight(this.qte);
          this.wld?.SetStretchLeft(this.qte);
        } else {
          this.Rld?.SetStretchTop(this.qte);
          this.wld?.SetStretchBottom(this.qte);
        }
      }
    };
    this.Ald = () => {
      var t;
      var s;
      var i;
      var e;
      if (this.WI) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Test", 26, "打印宽高尺寸.StartTransform");
        }
        this.WI = false;
        this.Rld?.SetUIActive(true);
        this.wld?.SetUIActive(true);
        t = this.RootItem.GetWidth();
        s = this.RootItem.GetHeight();
        this.Rld?.SetStretchRight(0);
        this.wld?.SetStretchRight(0);
        this.Rld?.SetStretchLeft(0);
        this.wld?.SetStretchLeft(0);
        this.Rld?.SetStretchTop(0);
        this.wld?.SetStretchTop(0);
        this.Rld?.SetStretchBottom(0);
        this.wld?.SetStretchBottom(0);
        i = t / s;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Test", 26, "打印宽高尺寸.OnBeforeShow", ["X", t], ["Y", s], ["uiRatio", i], ["Cache.Ratio", this.Lld]);
        }
        if (this.Lld < i) {
          this.Pld = true;
          i = s * this.Lld;
          this.Rld?.SetStretchRight(e = t / 2 + i / 2);
          this.wld?.SetStretchLeft(e);
          this.Ist = (t - i) / 2 / this.cwr;
          this.qte = e;
        } else {
          this.Pld = false;
          i = t / this.Lld;
          this.Rld?.SetStretchTop(e = s / 2 + i / 2);
          this.wld?.SetStretchBottom(e);
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
    this.Rld = this.GetTexture(0);
    this.Rld?.SetUIActive(false);
    this.Rld?.SetAlpha(1);
    this.wld = this.GetTexture(1);
    this.wld?.SetUIActive(false);
    this.wld?.SetAlpha(1);
    this.GetRootItem().GetRenderCanvas().bPostTickUpdate = true;
    this.GetRootItem().SetRaycastTarget(false);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UIViewPortSizeChanged, this.Ald);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UIViewPortSizeChanged, this.Ald);
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
    this.Lld = this.RootItem.GetWidth() / this.RootItem.GetHeight();
    this.cwr = t;
  }
}
exports.PlotAspectTransformView = PlotAspectTransformView;
//# sourceMappingURL=PlotAspectTransformView.js.map