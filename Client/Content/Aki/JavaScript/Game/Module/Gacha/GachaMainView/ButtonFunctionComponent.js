"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ButtonFunctionComponent = void 0;
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class ButtonFunctionComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.Gvr = () => {}, this.Fr = () => {
      this.Gvr()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent]
    ], this.BtnBindInfo = [
      [0, this.Fr]
    ]
  }
  SetFunction(e) {
    this.Gvr = e
  }
}
exports.ButtonFunctionComponent = ButtonFunctionComponent;
//# sourceMappingURL=ButtonFunctionComponent.js.map