"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoPilotTrackBtnGroup = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class AutoPilotTrackBtnGroup extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.BtnGoQuickCallback = undefined;
    this.BtnCancelCallback = undefined;
    this.d01 = () => {
      this.BtnCancelCallback?.();
    };
    this.i9m = () => {
      this.BtnGoQuickCallback?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.d01], [1, this.i9m]];
  }
  SetBtnGoQuickEnable(t) {
    this.GetButton(1)?.SetSelfInteractive(t);
  }
}
exports.AutoPilotTrackBtnGroup = AutoPilotTrackBtnGroup;
//# sourceMappingURL=AutoPilotTrackBtnGroup.js.map