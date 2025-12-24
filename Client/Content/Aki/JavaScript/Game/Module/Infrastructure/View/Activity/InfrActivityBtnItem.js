"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrActivityBtnItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class InfrActivityBtnItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Gke = undefined;
    this.ije = () => {
      this.Gke?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.ije]];
  }
  SetFunction(t) {
    this.Gke = t;
  }
  SetText(t) {
    this.GetText(1).ShowTextNew(t);
  }
  SetRedPointVisible(t) {
    this.GetItem(2).SetUIActive(t);
  }
}
exports.InfrActivityBtnItem = InfrActivityBtnItem;
//# sourceMappingURL=InfrActivityBtnItem.js.map