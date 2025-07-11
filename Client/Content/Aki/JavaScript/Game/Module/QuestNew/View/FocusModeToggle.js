"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FocusModeToggle = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class FocusModeToggle extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.RH1 = false;
    this.A5e = () => {
      var e = this.GetExtendToggle(0)?.GetToggleState();
      return this.RH1 || e === 1;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText]];
  }
  OnStart() {
    this.GetExtendToggle(0).SetToggleState(0);
  }
  OnBeforeDestroy() {
    var e = this.GetExtendToggle(0);
    e.OnStateChange.Clear();
    e.OnPointUpCallBack.Unbind();
    e.CanExecuteChange.Unbind();
  }
  BindToggleCallback(e, t) {
    var s = this.GetExtendToggle(0);
    s.OnStateChange.Add(e);
    s.OnPointUpCallBack.Bind(t);
    s.CanExecuteChange.Bind(this.A5e);
  }
  SetToggleState(e) {
    this.RH1 = true;
    var t = this.GetExtendToggle(0)?.SetToggleState(e ? 1 : 0, true);
    this.RH1 = false;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Temp", 18, "FocusModeToggle", ["ret", t], ["active", e]);
    }
  }
  SetButtonText(e) {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), e);
  }
}
exports.FocusModeToggle = FocusModeToggle;
//# sourceMappingURL=FocusModeToggle.js.map