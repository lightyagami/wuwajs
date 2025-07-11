"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionTabComponent = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class VisionTabComponent extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.aWi = undefined;
    this.hWi = undefined;
    this.lWi = () => {
      this.aWi?.();
    };
    this._Wi = () => {
      this.hWi?.();
    };
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIExtendToggle]];
    this.BtnBindInfo = [[0, this.lWi], [1, this._Wi]];
  }
  SetToggleOneButtonClick(e) {
    this.aWi = e;
  }
  SetToggleTwoButtonClick(e) {
    this.hWi = e;
  }
}
exports.VisionTabComponent = VisionTabComponent;
//# sourceMappingURL=VisionTabComponent.js.map