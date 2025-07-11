"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterSortEntrance = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const FilterEntrance_1 = require("./Filter/View/FilterEntrance");
const SortEntrance_1 = require("./Sort/View/SortEntrance");
class FilterSortEntrance extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super();
    this.UpdateList = t;
    this.vpt = undefined;
    this.Mpt = undefined;
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  OnStart() {
    this.vpt = new FilterEntrance_1.FilterEntrance(this.GetItem(0), this.UpdateList);
    this.Mpt = new SortEntrance_1.SortEntrance(this.GetItem(1), this.UpdateList);
  }
  UpdateData(e, t, ...r) {
    this.vpt.UpdateData(e, t, ...r);
    this.Mpt.UpdateData(e, t, ...r);
  }
  UpdateDataWithConfig(e, t, r) {
    this.vpt.UpdateDataWithConfig(e, t, r);
    this.Mpt.UpdateDataWithConfig(e, t, r);
  }
  ClearData(e) {
    var t = ConfigManager_1.ConfigManager.FilterConfig.GetFilterId(e);
    if (t) {
      ModelManager_1.ModelManager.FilterModel.ClearData(t);
    }
    var t = ConfigManager_1.ConfigManager.SortConfig.GetSortId(e);
    if (t) {
      ModelManager_1.ModelManager.SortModel.DeleteSortResultData(t);
    }
  }
}
exports.FilterSortEntrance = FilterSortEntrance;
//# sourceMappingURL=FilterSortEntrance.js.map