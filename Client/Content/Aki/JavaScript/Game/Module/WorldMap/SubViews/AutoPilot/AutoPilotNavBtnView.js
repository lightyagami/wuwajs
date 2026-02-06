"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoPilotNavBtnView = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class AutoPilotNavBtnView extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.nx = t;
    this.OnBtnClickCallback = undefined;
    this.eje = () => {
      this.OnBtnClickCallback?.();
      this.RefreshUi(true);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem], [3, UE.UISprite], [4, UE.UIItem], [5, UE.UIText]];
    this.BtnBindInfo = [[0, this.eje]];
  }
  RefreshUi(t, i = true) {
    this.GetButton(0)?.RootUIComp.SetUIActive(!t);
    this.GetButton(0)?.SetSelfInteractive(i);
    this.GetItem(4)?.SetUIActive(t);
    if (!t) {
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(1), this.nx.IsNeedCustomMarkCreate() ? "AutoPilot_MarkToGuide" : "AutoPilot_NavigationConfirm");
    }
  }
  GetIsInteractive() {
    return !!this.RootItem && !!this.RootItem.IsUIActiveSelf() && (this.GetButton(0)?.GetSelfInteractive() ?? false);
  }
}
exports.AutoPilotNavBtnView = AutoPilotNavBtnView;
//# sourceMappingURL=AutoPilotNavBtnView.js.map