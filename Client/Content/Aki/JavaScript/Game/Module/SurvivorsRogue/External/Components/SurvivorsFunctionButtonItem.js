"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsFunctionButtonItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class SurvivorsFunctionButtonItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnBtnClickedCallback = undefined;
    this.bGd = () => {
      this.OnBtnClickedCallback?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText]];
    this.BtnBindInfo = [[0, this.bGd]];
  }
  OnStart() {
    this.SetNewItemVisible(false);
    this.SetRedDotVisible(false);
  }
  SetRedDotVisible(t) {
    this.GetItem(1).SetUIActive(t);
  }
  SetNewItemVisible(t) {
    this.GetItem(2).SetUIActive(t);
  }
  SetDescText(t, ...e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t, ...e);
  }
  SetFunction(t) {
    this.OnBtnClickedCallback = t;
  }
}
exports.SurvivorsFunctionButtonItem = SurvivorsFunctionButtonItem;
//# sourceMappingURL=SurvivorsFunctionButtonItem.js.map