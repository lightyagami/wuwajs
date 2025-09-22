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
    this.ead = undefined;
    this.tad = undefined;
    this.iad = 0;
    this.cwr = 0;
    this.r1t = 0;
    this.Ist = 0;
    this.qte = 0;
    this.oad = false;
    this.LDe = -1;
    this.J_ = t => {
      if (this.r1t > this.cwr) {
        this.Hide();
      } else {
        this.r1t += t;
        this.qte += t * this.Ist;
        if (this.oad) {
          this.ead?.SetStretchRight(this.qte);
          this.tad?.SetStretchLeft(this.qte);
        } else {
          this.ead?.SetStretchTop(this.qte);
          this.tad?.SetStretchBottom(this.qte);
        }
      }
    };
    this.nad = () => {
      var t;
      var s;
      var i;
      var e;
      if (this.WI) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Test", 26, "打印宽高尺寸.StartTransform");
        }
        this.WI = false;
        this.ead?.SetUIActive(true);
        this.tad?.SetUIActive(true);
        t = this.RootItem.GetWidth();
        s = this.RootItem.GetHeight();
        this.ead?.SetStretchRight(0);
        this.tad?.SetStretchRight(0);
        this.ead?.SetStretchLeft(0);
        this.tad?.SetStretchLeft(0);
        this.ead?.SetStretchTop(0);
        this.tad?.SetStretchTop(0);
        this.ead?.SetStretchBottom(0);
        this.tad?.SetStretchBottom(0);
        i = t / s;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Test", 26, "打印宽高尺寸.OnBeforeShow", ["X", t], ["Y", s], ["uiRatio", i], ["Cache.Ratio", this.iad]);
        }
        if (this.iad < i) {
          this.oad = true;
          i = s * this.iad;
          this.ead?.SetStretchRight(e = t / 2 + i / 2);
          this.tad?.SetStretchLeft(e);
          this.Ist = (t - i) / 2 / this.cwr;
          this.qte = e;
        } else {
          this.oad = false;
          i = t / this.iad;
          this.ead?.SetStretchTop(e = s / 2 + i / 2);
          this.tad?.SetStretchBottom(e);
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
    this.ead = this.GetTexture(0);
    this.ead?.SetUIActive(false);
    this.ead?.SetAlpha(1);
    this.tad = this.GetTexture(1);
    this.tad?.SetUIActive(false);
    this.tad?.SetAlpha(1);
    this.GetRootItem().GetRenderCanvas().bPostTickUpdate = true;
    this.GetRootItem().SetRaycastTarget(false);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UIViewPortSizeChanged, this.nad);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UIViewPortSizeChanged, this.nad);
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
    this.iad = this.RootItem.GetWidth() / this.RootItem.GetHeight();
    this.cwr = t;
  }
}
exports.PlotAspectTransformView = PlotAspectTransformView;
//# sourceMappingURL=PlotAspectTransformView.js.map