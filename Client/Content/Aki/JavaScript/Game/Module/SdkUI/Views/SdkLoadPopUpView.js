"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SdkLoadPopUpView = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiLayer_1 = require("../../../Ui/UiLayer");
const TIMERGAP = 1000;
class SdkLoadPopUpView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.TDe = undefined;
    this.qnl = 0;
  }
  OnStart() {
    if (this.OpenParam) {
      this.Pe = this.OpenParam;
    }
    this.Gnl();
  }
  R6t() {
    if (this.TDe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
  Gnl() {
    var e = this.Pe?.ForceCloseTime;
    if (e && e > 0) {
      this.qnl = e;
      this.R6t();
      this.TDe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
        this.qnl--;
        if (this.qnl < 0 && (this.CloseMe(), Log_1.Log.CheckWarn())) {
          Log_1.Log.Warn("KuroSdk", 27, "SDK:读取中弹窗触发自动关闭", ["reason", this.Pe.OpenReason]);
        }
      }, TIMERGAP);
    }
  }
  OnBeforeShow() {
    UiLayer_1.UiLayer.SetShowMaskLayer("SdkLoading", true);
  }
  OnBeforeHide() {
    UiLayer_1.UiLayer.SetShowMaskLayer("SdkLoading", false);
    this.R6t();
  }
}
exports.SdkLoadPopUpView = SdkLoadPopUpView;
//# sourceMappingURL=SdkLoadPopUpView.js.map