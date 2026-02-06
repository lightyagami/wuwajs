"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TotalTopUpPageGetScoreBtnItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class TotalTopUpPageGetScoreBtnItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnClickCallback = undefined;
    this.hoc = () => {
      this.OnClickCallback?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem]];
    this.BtnBindInfo = [[0, this.hoc]];
  }
  OnStart() {
    this.GetItem(1)?.SetUIActive(false);
  }
}
exports.TotalTopUpPageGetScoreBtnItem = TotalTopUpPageGetScoreBtnItem;
//# sourceMappingURL=TotalTopUpPageGetScoreBtnItem.js.map