"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardTrawlBackpackPanelModel = undefined;
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const DockyardBackpackPanelModelBase_1 = require("../Base/DockyardBackpackPanelModelBase");
class DockyardTrawlBackpackPanelModel extends DockyardBackpackPanelModelBase_1.DockyardBackpackPanelModelBase {
  GetIsTrawlOpen() {
    return ModelManager_1.ModelManager.FishingModel.IsInDock && ModelManager_1.ModelManager.DockyardModel.IsTrawlOpen;
  }
  GetIsBackToWareHouseOpen() {
    return this.ViewModel?.IsTrawlInteractive?.() ?? false;
  }
}
exports.DockyardTrawlBackpackPanelModel = DockyardTrawlBackpackPanelModel;
//# sourceMappingURL=DockyardTrawlBackpackPanelModel.js.map