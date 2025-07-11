"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardCageViewModel = undefined;
const Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const DockyardWareHouseViewModelBase_1 = require("../Base/DockyardWareHouseViewModelBase");
const DockyardCageBackpackPanelModel_1 = require("./DockyardCageBackpackPanelModel");
const DockyardCageListPanelModel_1 = require("./DockyardCageListPanelModel");
class DockyardCageViewModel extends DockyardWareHouseViewModelBase_1.DockyardWareHouseViewModelBase {
  constructor() {
    super(...arguments);
    this.BackpackPanelModel = new DockyardCageBackpackPanelModel_1.DockyardCageBackpackPanelModel();
    this.ListPanelModel = new DockyardCageListPanelModel_1.DockyardCageListPanelModel();
    this.RequestCabinType = Protocol_1.Aki.Protocol.IXl.sb_;
    this.ConfigId = 0;
  }
  get RequestId() {
    return this.ConfigId;
  }
  OnInit() {
    this.ViewTitle = "Fishing_CageText3";
    this.BackpackPanelModel.Init(this.ConfigId);
    this.ListPanelModel.Init(this.ConfigId);
  }
  GetItemBlockData(e) {
    var a = ModelManager_1.ModelManager.DockyardModel.GetItemBlockData(e);
    return a || ModelManager_1.ModelManager.FishingModel.GetDataByCage(this.ConfigId, e);
  }
}
exports.DockyardCageViewModel = DockyardCageViewModel;
//# sourceMappingURL=DockyardCageViewModel.js.map