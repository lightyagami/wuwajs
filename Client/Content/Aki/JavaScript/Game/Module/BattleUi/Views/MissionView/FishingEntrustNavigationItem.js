"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingEntrustNavigationItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
class FishingEntrustNavigationItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.qU_ = () => {
      UiManager_1.UiManager.OpenView("FishingQuestView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.qU_]];
  }
}
exports.FishingEntrustNavigationItem = FishingEntrustNavigationItem;
//# sourceMappingURL=FishingEntrustNavigationItem.js.map