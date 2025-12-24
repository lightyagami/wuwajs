"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoPilotTrackBtnGroup = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const WorldMapController_1 = require("../../WorldMapController");
class AutoPilotTrackBtnGroup extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.J6m = undefined;
    this.Z6m = () => {
      WorldMapController_1.WorldMapController.CloseWorldMap();
    };
    this.e7m = () => {
      this.J6m?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.Z6m], [1, this.e7m]];
  }
  SetBtnGoQuickCallBack(t) {
    this.J6m = t;
  }
  SetBtnGoQuickEnable(t) {
    this.GetButton(1)?.SetSelfInteractive(t);
  }
}
exports.AutoPilotTrackBtnGroup = AutoPilotTrackBtnGroup;
//# sourceMappingURL=AutoPilotTrackBtnGroup.js.map