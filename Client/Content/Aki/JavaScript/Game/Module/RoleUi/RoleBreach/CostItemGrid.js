"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CostItemGrid = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ItemGridVariantSelect_1 = require("../../Common/ItemGrid/ItemGridVariantSelect");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class CostItemGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(t = undefined) {
    super();
    this.ebt = undefined;
    if (t) {
      this.CreateThenShowByActor(t.GetOwner());
    }
  }
  Refresh(t, e, r) {
    this.RefreshBySelectedData(t);
  }
  OnStart() {
    this.ebt = new ItemGridVariantSelect_1.ItemGridVariantSelect(this.RootItem.GetOwner());
    this.ebt.SetToggleClickEvent((t, e) => {
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.ebt.GetConfigId());
      this.ebt.GetClickToggle().SetToggleState(0, false);
    });
    this.ebt.GetAddButton().RootUIComp.SetUIActive(false);
    this.ebt.GetReduceButton().RootUIComp.SetUIActive(false);
    this.ebt.RefreshItemShowState(true);
  }
  RefreshBySelectedData(t) {
    this.ebt.RefreshByItemId(t.ItemId);
    this.RefreshCountBySelectedData(t);
  }
  OnBeforeDestroy() {
    this.ebt?.Destroy();
  }
  RefreshCountBySelectedData(t) {
    var e = t.SelectedCount;
    var t = t.Count;
    let r = e < t ? "Text_ItemNotEnoughText_Text" : "Text_ItemEnoughText_Text";
    this.ebt.RefreshTextDownByTextId(true, r, e, t);
  }
}
exports.CostItemGrid = CostItemGrid;
//# sourceMappingURL=CostItemGrid.js.map