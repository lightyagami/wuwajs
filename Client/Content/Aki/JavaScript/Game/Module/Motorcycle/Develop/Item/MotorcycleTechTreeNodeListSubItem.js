"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleTechTreeNodeListSubItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const MotorcycleTechTreeNodeItem_1 = require("./MotorcycleTechTreeNodeItem");
class MotorcycleTechTreeNodeListSubItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.lmf = undefined;
    this.sGe = () => new MotorcycleTechTreeNodeItem_1.MotorcycleTechTreeNodeItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem], [2, UE.UIItem]];
  }
  OnStart() {
    this.lmf = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.sGe, this.GetItem(2).GetOwner());
    this.GetItem(1).SetUIActive(false);
  }
  async RefreshAsync(e) {
    const r = [];
    e.forEach((e, t) => {
      e = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetTechNodeById(e);
      if (e) {
        r.push(e);
      }
    });
    await this.lmf.RefreshByDataAsync(r);
  }
  GetSubLayoutItemList() {
    return this.lmf.GetLayoutItemList();
  }
}
exports.MotorcycleTechTreeNodeListSubItem = MotorcycleTechTreeNodeListSubItem;
//# sourceMappingURL=MotorcycleTechTreeNodeListSubItem.js.map