"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortModel = undefined;
const ModelBase_1 = require("../../../../../../Core/Framework/ModelBase");
const LocalStorage_1 = require("../../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const FilterSortDefine_1 = require("../../FilterSortDefine");
const SortLogic_1 = require("../Logic/SortLogic");
class SortModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.dUt = new Map();
    this.CUt = new SortLogic_1.SortLogic();
  }
  SetSortResultData(e) {
    this.dUt.set(e.UniqueId, e);
  }
  DeleteSortResultData(e) {
    if (e !== FilterSortDefine_1.FILTER_SORT_UNVALUE_UNIQUE_ID) {
      this.dUt.delete(e);
    }
  }
  GetSortResultData(e) {
    if (e !== FilterSortDefine_1.FILTER_SORT_UNVALUE_UNIQUE_ID) {
      return this.dUt.get(e);
    }
  }
  SortDataList(e, o, a, ...t) {
    this.CUt.SortDataList(e, o, a, ...t);
  }
  SortDataByData(e, o, a, t) {
    this.CUt.SortDataByData(e, o, a, t);
  }
  GetSortConfigData(e, o, a) {
    if (ConfigManager_1.ConfigManager.SortConfig.IsConfigSortSave(e, o)) {
      e = ConfigManager_1.ConfigManager.SortConfig.GetConfigSortFormatId(e, o, a);
      return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SortConfig)?.get(e);
    }
  }
  SetSortConfigData(o, a, t, r) {
    if (ConfigManager_1.ConfigManager.SortConfig.IsConfigSortSave(o, a)) {
      o = ConfigManager_1.ConfigManager.SortConfig.GetConfigSortFormatId(o, a, r);
      let e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SortConfig);
      (e = e || new Map()).set(o, t);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SortConfig, e);
    }
  }
  ClearSortConfigData(e, o, a) {
    if (ConfigManager_1.ConfigManager.SortConfig.IsConfigSortSave(e, o) && (e = ConfigManager_1.ConfigManager.SortConfig.GetConfigSortFormatId(e, o, a), o = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SortConfig))) {
      o.delete(e);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SortConfig, o);
    }
  }
}
exports.SortModel = SortModel;
//# sourceMappingURL=SortModel.js.map