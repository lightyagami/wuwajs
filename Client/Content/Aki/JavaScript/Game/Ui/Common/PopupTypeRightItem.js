"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopupTypeRightItem = undefined;
const UE = require("ue");
const CommonPopViewBehaviourBase_1 = require("./CommonPopViewBehaviourBase");
class PopupTypeRightItem extends CommonPopViewBehaviourBase_1.CommonPopViewBase {
  constructor() {
    super();
  }
  GetAttachParent() {
    return this.GetItem(1);
  }
  GetCostParent() {}
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIItem], [0, UE.UIButtonComponent], [2, UE.UITexture], [3, UE.UITexture], [4, UE.UITexture]];
    this.BtnBindInfo = [[0, this.OnClickCloseBtn]];
  }
  OnSetBackBtnShowState(e) {
    this.GetButton(0).RootUIComp.SetUIActive(e);
  }
  OnSetCloseBtnInteractive(e) {}
  OnSetHelpButtonActive(e) {}
  OnSetTitleByTextIdAndArg(e) {}
  OnRefreshCost(e) {}
  ShowMoraleBg(e) {
    this.omu(e);
    this.nmu(!e);
  }
  omu(e) {
    this.GetTexture(4)?.SetUIActive(e);
  }
  nmu(e) {
    this.GetTexture(3)?.SetUIActive(e);
  }
}
exports.PopupTypeRightItem = PopupTypeRightItem;
//# sourceMappingURL=PopupTypeRightItem.js.map