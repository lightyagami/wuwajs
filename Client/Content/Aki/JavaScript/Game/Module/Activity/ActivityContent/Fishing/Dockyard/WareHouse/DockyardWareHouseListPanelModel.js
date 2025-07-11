"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardWareHouseListPanelModel = undefined;
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const DockyardItemListPanelModel_1 = require("../List/DockyardItemListPanelModel");
class DockyardWareHouseListPanelModel extends DockyardItemListPanelModel_1.DockyardItemListPanelModel {
  OnInit() {
    this.ComponentData.TitleText = "Fishing_CageText1";
  }
  GetShowItemList() {
    return ModelManager_1.ModelManager.DockyardModel.GetWareHouseDataList();
  }
}
exports.DockyardWareHouseListPanelModel = DockyardWareHouseListPanelModel;
//# sourceMappingURL=DockyardWareHouseListPanelModel.js.map