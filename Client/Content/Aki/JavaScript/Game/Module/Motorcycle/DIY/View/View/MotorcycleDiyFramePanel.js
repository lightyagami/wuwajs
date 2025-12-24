"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDiyFramePanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class MotorcycleDiyFramePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.JCf = () => {};
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UITexture], [3, UE.UITexture]];
    this.BtnBindInfo = [[0, this.JCf]];
  }
}
exports.MotorcycleDiyFramePanel = MotorcycleDiyFramePanel;
//# sourceMappingURL=MotorcycleDiyFramePanel.js.map