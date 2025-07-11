"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardWareHouseViewModel = undefined;
const Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const DockyardWareHouseViewModelBase_1 = require("../Base/DockyardWareHouseViewModelBase");
const DockyardWareHouseBackpackPanelModel_1 = require("./DockyardWareHouseBackpackPanelModel");
const DockyardWareHouseListPanelModel_1 = require("./DockyardWareHouseListPanelModel");
class DockyardWareHouseViewModel extends DockyardWareHouseViewModelBase_1.DockyardWareHouseViewModelBase {
  constructor() {
    super(...arguments);
    this.BackpackPanelModel = new DockyardWareHouseBackpackPanelModel_1.DockyardWareHouseBackpackPanelModel();
    this.ListPanelModel = new DockyardWareHouseListPanelModel_1.DockyardWareHouseListPanelModel();
    this.InGameplayFlow = false;
    this.RequestCabinType = Protocol_1.Aki.Protocol.IXl.Proto_TempCabin;
    this.OnCloseClick = () => {
      if (this.InGameplayFlow) {
        this.View?.CloseMe();
      } else {
        ControllerHolder_1.ControllerHolder.FishingController.ShowConfirmBoxAndRequestFishingExit(e => {
          if (e) {
            this.View?.CloseMe();
          }
        });
      }
    };
  }
  OnInit() {
    this.ViewTitle = "Fishing_CageText4";
  }
  async BeforeStartAsync() {
    if (this.InGameplayFlow) {
      await this.View?.CreateQteSkipPanel();
    } else {
      await this.View?.CreateQuestPanel(true);
    }
  }
  GetItemBlockData(e) {
    return ModelManager_1.ModelManager.DockyardModel.GetItemBlockData(e);
  }
}
exports.DockyardWareHouseViewModel = DockyardWareHouseViewModel;
//# sourceMappingURL=DockyardWareHouseViewModel.js.map