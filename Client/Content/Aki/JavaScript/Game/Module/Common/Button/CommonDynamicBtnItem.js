"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonDynamicBtnItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class CommonDynamicBtnItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Gvr = () => {};
    this.Fr = () => {
      if (this.Gvr) {
        this.Gvr();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.Fr]];
  }
  SetFunction(e) {
    this.Gvr = e;
  }
}
exports.CommonDynamicBtnItem = CommonDynamicBtnItem;
//# sourceMappingURL=CommonDynamicBtnItem.js.map