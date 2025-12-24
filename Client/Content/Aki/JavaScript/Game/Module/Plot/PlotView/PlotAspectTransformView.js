"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotAspectTransformView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const TickSystem_1 = require("../../../../Core/Tick/TickSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class PlotAspectTransformView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.HIf = false;
    this.Rld = undefined;
    this.wld = undefined;
    this.jIf = 0;
    this.$If = 0;
    this.cwr = 0;
    this.r1t = 0;
    this.Ist = 0;
    this.qte = 0;
    this.Pld = false;
    this.LDe = -1;
    this.WIf = false;
    this.B7 = undefined;
    this.J_ = t => {
      if (this.r1t > this.cwr) {
        if (this.WIf) {
          ControllerHolder_1.ControllerHolder.PlotController.RemoveAspectTransformView();
        } else {
          this.Hide();
        }
        this.B7?.();
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
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "[Aspect] OnTick", ["Duration", this.r1t], ["BlendTime", this.cwr]);
        }
      }
    };
    this.QIf = () => {
      var t;
      var i;
      if (this.HIf) {
        t = this.RootItem.GetWidth();
        i = this.RootItem.GetHeight();
        this.$If = t / i;
        this.HIf = false;
        this.Ald();
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
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UIViewPortSizeChanged, this.QIf);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UIViewPortSizeChanged, this.QIf);
  }
  OnBeforeShow() {}
  OnAfterShow() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 26, "[Aspect] OnAfterShow");
    }
  }
  OnBeforeHide() {
    TickSystem_1.TickSystem.Remove(this.LDe);
    this.LDe = -1;
  }
  EnableAutoBlendOut(t) {
    this.cwr = t;
    this.jIf = this.RootItem.GetWidth() / this.RootItem.GetHeight();
    this.HIf = true;
  }
  ManualBlendOut(t, i, s, h = true) {
    this.cwr = t;
    this.B7 = s;
    this.WIf = h;
    this.jIf = i;
    this.$If = this.RootItem.GetWidth() / this.RootItem.GetHeight();
    this.Ald();
  }
  SetAspectRatio(t) {
    this.Rld?.SetUIActive(true);
    this.wld?.SetUIActive(true);
    this.Rld?.SetStretchRight(0);
    this.wld?.SetStretchRight(0);
    this.Rld?.SetStretchLeft(0);
    this.wld?.SetStretchLeft(0);
    this.Rld?.SetStretchTop(0);
    this.wld?.SetStretchTop(0);
    this.Rld?.SetStretchBottom(0);
    this.wld?.SetStretchBottom(0);
    var i;
    var s = this.RootItem.GetWidth();
    var h = this.RootItem.GetHeight();
    if (t < s / h) {
      this.Rld?.SetStretchRight(i = s / 2 + h * t / 2);
      this.wld?.SetStretchLeft(i);
    } else {
      this.Rld?.SetStretchTop(i = h / 2 + s / t / 2);
      this.wld?.SetStretchBottom(i);
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 26, "[Aspect] SetAspectRatio", ["Ratio", t]);
    }
  }
  Ald() {
    this.Rld?.SetUIActive(true);
    this.wld?.SetUIActive(true);
    this.Rld?.SetStretchRight(0);
    this.wld?.SetStretchRight(0);
    this.Rld?.SetStretchLeft(0);
    this.wld?.SetStretchLeft(0);
    this.Rld?.SetStretchTop(0);
    this.wld?.SetStretchTop(0);
    this.Rld?.SetStretchBottom(0);
    this.wld?.SetStretchBottom(0);
    var t;
    var i;
    var s = this.RootItem.GetWidth();
    var h = this.RootItem.GetHeight();
    if (this.jIf < this.$If) {
      this.Pld = true;
      t = h * this.jIf;
      this.Rld?.SetStretchRight(i = s / 2 + t / 2);
      this.wld?.SetStretchLeft(i);
      this.Ist = (s - t) / 2 / this.cwr;
      this.qte = i;
    } else {
      this.Pld = false;
      t = s / this.jIf;
      this.Rld?.SetStretchTop(i = h / 2 + t / 2);
      this.wld?.SetStretchBottom(i);
      this.Ist = (h - t) / 2 / this.cwr;
      this.qte = i;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 26, "[Aspect] 过渡宽高比", ["BeforeRatio", this.jIf], ["AfterRatio", this.$If]);
    }
    this.LDe = TickSystem_1.TickSystem.Add(this.J_, "PlotAspectTransformView").Id;
  }
}
exports.PlotAspectTransformView = PlotAspectTransformView;
//# sourceMappingURL=PlotAspectTransformView.js.map