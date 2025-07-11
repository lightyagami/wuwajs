"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardInteractBackpackPanelModel = undefined;
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const DockyardBackpackPanelModelBase_1 = require("../Base/DockyardBackpackPanelModelBase");
class DockyardInteractBackpackPanelModel extends DockyardBackpackPanelModelBase_1.DockyardBackpackPanelModelBase {
  constructor() {
    super(...arguments);
    this.InteractPanelModel = undefined;
    this.ConfigId = 0;
  }
  RegisterInteractPanel(e) {
    this.InteractPanelModel = e;
  }
  IsQuickSellOpen() {
    return false;
  }
  GetIsBackToWareHouseOpen() {
    return false;
  }
  ShowScrollingTips() {
    ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Fishing_CantPutDown");
  }
}
exports.DockyardInteractBackpackPanelModel = DockyardInteractBackpackPanelModel;
//# sourceMappingURL=DockyardInteractBackpackPanelModel.js.map