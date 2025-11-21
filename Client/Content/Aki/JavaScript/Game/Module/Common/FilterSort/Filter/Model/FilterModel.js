"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterModel = undefined;
const ModelBase_1 = require("../../../../../../Core/Framework/ModelBase");
const LocalStorage_1 = require("../../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const FilterSortDefine_1 = require("../../FilterSortDefine");
const FilterLogic_1 = require("../Logic/FilterLogic");
class FilterModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.nDt = new Map();
    this.sDt = new FilterLogic_1.FilterLogic();
  }
  SetFilterResultData(e) {
    this.nDt.set(e.UniqueId, e);
  }
  DeleteFilterResultData(e) {
    if (e !== FilterSortDefine_1.FILTER_SORT_UNVALUE_UNIQUE_ID) {
      this.nDt.delete(e);
    }
  }
  GetFilterResultData(e) {
    if (e !== FilterSortDefine_1.FILTER_SORT_UNVALUE_UNIQUE_ID) {
      return this.nDt.get(e);
    }
  }
  ClearData(e) {
    if (e !== FilterSortDefine_1.FILTER_SORT_UNVALUE_UNIQUE_ID) {
      this.nDt.get(e)?.ClearSelectRuleData();
    }
  }
  GetFilterList(e, t, r) {
    var t = ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(t);
    var a = t.DataType;
    var i = t.IsSupportSelectAll;
    var t = t.IsSelectAllUnion;
    return this.sDt.GetFilterList(e, a, i, t, r);
  }
  GetFilterDataFuncByFilterType(e) {
    return this.sDt.GetDataFuncByType(e);
  }
  GetFilterItemDataList(e, t) {
    return this.sDt.GetFilterItemDataList(e, t);
  }
  GetFilterConfigData(e, t, r) {
    if (ConfigManager_1.ConfigManager.SortConfig.IsConfigSortSave(e, t)) {
      e = ConfigManager_1.ConfigManager.SortConfig.GetConfigSortFormatId(e, t, r);
      return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FilterConfig)?.get(e);
    }
  }
  SetFilterConfigData(t, r, a, i) {
    if (ConfigManager_1.ConfigManager.SortConfig.IsConfigSortSave(t, r)) {
      t = ConfigManager_1.ConfigManager.SortConfig.GetConfigSortFormatId(t, r, i);
      let e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FilterConfig);
      (e = e || new Map()).set(t, a);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FilterConfig, e);
    }
  }
  ClearFilterConfigData(e, t, r) {
    if (ConfigManager_1.ConfigManager.SortConfig.IsConfigSortSave(e, t) && (e = ConfigManager_1.ConfigManager.SortConfig.GetConfigSortFormatId(e, t, r), t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FilterConfig))) {
      t.delete(e);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FilterConfig, t);
    }
  }
}
exports.FilterModel = FilterModel;
//# sourceMappingURL=FilterModel.js.map