"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoPilotTrackToggle = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class AutoPilotTrackToggle extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.nx = t;
    this.t7m = undefined;
    this.i7m = t => {
      this.t7m?.(t === 1);
      this.gno(t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIItem], [3, UE.UISprite]];
    this.BtnBindInfo = [[0, this.i7m]];
  }
  SetTrackToggleCallback(t) {
    this.t7m = t;
  }
  SetTrackToggleState(t, i) {
    this.GetExtendToggle(0)?.SetToggleStateForce(t, i);
    if (!i) {
      this.gno(t);
    }
  }
  gno(t) {
    switch (t) {
      case 1:
        LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(1), "AutoPilot_NavigationCancel");
        this.GetSprite(3)?.SetUIActive(false);
        this.GetExtendToggle(0)?.SetSelfInteractive(true);
        break;
      case 0:
        LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(1), this.nx.IsNeedCustomMarkCreate() ? "AutoPilot_MarkToGuide" : "AutoPilot_NavigationConfirm");
        this.GetSprite(3)?.SetUIActive(true);
        this.GetExtendToggle(0)?.SetSelfInteractive(true);
        break;
      case 2:
        LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(1), this.nx.IsNeedCustomMarkCreate() ? "AutoPilot_MarkToGuide" : "AutoPilot_NavigationConfirm");
        this.GetSprite(3)?.SetUIActive(true);
        this.GetExtendToggle(0)?.SetSelfInteractive(false);
    }
  }
  GetIsInteractive() {
    return !!this.RootItem && !!this.RootItem.IsUIActiveSelf() && this.GetExtendToggle(0)?.GetToggleState() !== 2;
  }
}
exports.AutoPilotTrackToggle = AutoPilotTrackToggle;
//# sourceMappingURL=AutoPilotTrackToggle.js.map