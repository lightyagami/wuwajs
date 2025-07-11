"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardShopBackpackPanelModel = undefined;
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const DockyardBackpackPanelModelBase_1 = require("../Base/DockyardBackpackPanelModelBase");
class DockyardShopBackpackPanelModel extends DockyardBackpackPanelModelBase_1.DockyardBackpackPanelModelBase {
  constructor() {
    super(...arguments);
    this.IsAllSellOpen = true;
    this.IsDeleteOpen = false;
  }
  GetIsTrawlOpen() {
    return ModelManager_1.ModelManager.FishingModel.IsInDock && ModelManager_1.ModelManager.DockyardModel.IsTrawlOpen;
  }
  GetIsBackToWareHouseOpen() {
    return false;
  }
}
exports.DockyardShopBackpackPanelModel = DockyardShopBackpackPanelModel;
//# sourceMappingURL=DockyardShopBackpackPanelModel.js.map