"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterSortEntrance = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const FilterEntrance_1 = require("./Filter/View/FilterEntrance");
const SortEntrance_1 = require("./Sort/View/SortEntrance");
class FilterSortEntrance extends UiPanelBase_1.UiPanelBase {
  constructor(t, e) {
    super();
    this.UpdateList = e;
    this.vpt = undefined;
    this.Mpt = undefined;
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  OnStart() {
    this.vpt = new FilterEntrance_1.FilterEntrance(this.GetItem(0), this.UpdateList);
    this.Mpt = new SortEntrance_1.SortEntrance(this.GetItem(1), this.UpdateList);
  }
  UpdateData(t, e, ...i) {
    this.vpt.UpdateData(t, e, ...i);
    var r = this.vpt.GetUniqueIdByGroupId(t);
    this.Mpt.SetFilterUniqueId(r);
    this.Mpt.UpdateData(t, e, ...i);
    var r = this.Mpt.GetUniqueIdByGroupId(t);
    this.vpt.SetSortUniqueId(r);
  }
  UpdateDataWithConfig(t, e, i) {
    this.vpt.UpdateDataWithConfig(t, e, i);
    var r = this.vpt.GetUniqueIdByGroupId(t);
    this.Mpt.SetFilterUniqueId(r);
    this.Mpt.UpdateDataWithConfig(t, e, i);
    var r = this.Mpt.GetUniqueIdByGroupId(t);
    this.vpt.SetSortUniqueId(r);
  }
  ClearData(t) {
    var e = this.vpt.GetUniqueIdByGroupId(t);
    ModelManager_1.ModelManager.FilterModel.ClearData(e);
    this.Mpt.DeleteUniqueIdByGroupId(t);
  }
}
exports.FilterSortEntrance = FilterSortEntrance;
//# sourceMappingURL=FilterSortEntrance.js.map