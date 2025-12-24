"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDiyDecoratePanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class MotorcycleDiyDecoratePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.JCf = () => {};
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIHorizontalLayout], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.JCf]];
  }
}
exports.MotorcycleDiyDecoratePanel = MotorcycleDiyDecoratePanel;
//# sourceMappingURL=MotorcycleDiyDecoratePanel.js.map