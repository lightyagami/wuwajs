"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterModel = undefined;
const ModelBase_1 = require("../../../../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const FilterLogic_1 = require("../Logic/FilterLogic");
class FilterModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.nDt = new Map();
    this.sDt = new FilterLogic_1.FilterLogic();
  }
  SetFilterResultData(e, t) {
    this.nDt.set(e, t);
  }
  DeleteFilterResultData(e) {
    this.nDt.delete(e);
  }
  GetFilterResultData(e) {
    return this.nDt.get(e);
  }
  ClearData(e) {
    this.nDt.get(e)?.ClearSelectRuleData();
  }
  GetFilterList(e, t, a) {
    var t = ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(t);
    var r = t.DataType;
    var o = t.IsSupportSelectAll;
    var t = t.IsSelectAllUnion;
    return this.sDt.GetFilterList(e, r, o, t, a);
  }
  GetFilterDataFuncByFilterType(e) {
    return this.sDt.GetDataFuncByType(e);
  }
  GetFilterItemDataList(e, t) {
    return this.sDt.GetFilterItemDataList(e, t);
  }
  UpdateFilterData(e, t) {
    this.GetFilterResultData(e).SetRuleData(t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFilterDataUpdate, e);
  }
  GetFilterConfigData(e, t, a) {
    if (ConfigManager_1.ConfigManager.SortConfig.IsConfigSortSave(e, t)) {
      e = ConfigManager_1.ConfigManager.SortConfig.GetConfigSortFormatId(e, t, a);
      return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FilterConfig)?.get(e);
    }
  }
  SetFilterConfigData(t, a, r, o) {
    if (ConfigManager_1.ConfigManager.SortConfig.IsConfigSortSave(t, a)) {
      t = ConfigManager_1.ConfigManager.SortConfig.GetConfigSortFormatId(t, a, o);
      let e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FilterConfig);
      (e = e || new Map()).set(t, r);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FilterConfig, e);
    }
  }
  ClearFilterConfigData(e, t, a) {
    if (ConfigManager_1.ConfigManager.SortConfig.IsConfigSortSave(e, t) && (e = ConfigManager_1.ConfigManager.SortConfig.GetConfigSortFormatId(e, t, a), t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FilterConfig))) {
      t.delete(e);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FilterConfig, t);
    }
  }
}
exports.FilterModel = FilterModel;
//# sourceMappingURL=FilterModel.js.map