"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterEntrance = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const FilterSortController_1 = require("../../FilterSortController");
const FilterSortDefine_1 = require("../../FilterSortDefine");
const FilterViewData_1 = require("../Model/FilterViewData");
class FilterEntrance extends UiPanelBase_1.UiPanelBase {
  constructor(t, i) {
    super();
    this.UpdateDataListFunction = i;
    this.kCm = new Map();
    this.rRt = FilterSortDefine_1.FILTER_SORT_UNVALUE_UNIQUE_ID;
    this.hDt = undefined;
    this.ypt = [];
    this.lDt = [];
    this._Dt = undefined;
    this.Mne = 0;
    this.$Fa = undefined;
    this._7c = "";
    this.OnBtnClearClickCallback = undefined;
    this.uDt = () => {
      var t = new FilterViewData_1.FilterViewData(this.hDt.UniqueId, this.vTt);
      FilterSortController_1.FilterSortController.OpenFilterView(t);
    };
    this.vTt = () => {
      this.XFa();
      this.P5e();
      this.qpt(false);
    };
    this.Ncm = () => {
      this.OnBtnClearClickCallback?.();
      this.gPe();
    };
    this.gPe = () => {
      ModelManager_1.ModelManager.FilterModel.ClearData(this.hDt.UniqueId);
      this.GetItem(1).SetUIActive(false);
      this.XFa();
      this.qpt(false);
    };
    this.cDt = t => {
      if (this.Mne === t) {
        this.qpt(true);
        this.P5e();
      }
    };
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.uDt], [3, this.Ncm]];
  }
  TryClearData() {
    var t;
    return !(this.Mne <= 0) && !(t = this.hDt.ShowAllFilterContent(), StringUtils_1.StringUtils.IsBlank(t)) && !(this.gPe(), 0);
  }
  OnStart() {
    this.GetItem(1).SetUIActive(false);
    this.AddEventListener();
  }
  OnBeforeDestroy() {
    for (const t of this.kCm.values()) {
      ModelManager_1.ModelManager.FilterModel.DeleteFilterResultData(t);
    }
    this.kCm.clear();
    this.RemoveEventListener();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFilterDataUpdate, this.cDt);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFilterDataUpdate, this.cDt);
  }
  P5e() {
    var t = this.hDt.ShowAllFilterContent();
    var i = this.GetItem(1);
    if (StringUtils_1.StringUtils.IsBlank(t)) {
      i.SetUIActive(false);
    } else {
      i.SetUIActive(true);
      this.GetText(2).SetText(t);
    }
  }
  qpt(t) {
    var i;
    var e = this.hDt.GetSelectRuleData();
    var e = ModelManager_1.ModelManager.FilterModel.GetFilterList(this.ypt, this.Mne, e);
    var s = ModelManager_1.ModelManager.SortModel.GetSortResultData(this.rRt);
    if (s) {
      i = ConfigManager_1.ConfigManager.SortConfig.GetSortId(this._Dt);
      ModelManager_1.ModelManager.SortModel.SortDataList(e, i, s, ...this.lDt);
    }
    this.UpdateDataListFunction?.(e, t, 0);
  }
  GetSelectRuleDataMap() {
    return this.hDt.GetSelectRuleData();
  }
  mDt(t, i, e) {
    this._Dt = t;
    this.Mne = ConfigManager_1.ConfigManager.FilterConfig.GetFilterId(t);
    this.$Fa = i ?? undefined;
    this._7c = e ?? "";
  }
  XFa() {
    var t;
    if (this.$Fa && this._Dt !== 0) {
      t = this.hDt.ConvertToStorageData();
      ModelManager_1.ModelManager.FilterModel.SetFilterConfigData(this.$Fa, this._Dt, t, this._7c);
    }
  }
  dDt(t) {
    var i = this.GetUniqueIdByGroupId(this._Dt);
    this.hDt = ModelManager_1.ModelManager.FilterModel.GetFilterResultData(i);
    if (!this.hDt) {
      this.hDt = new FilterViewData_1.FilterResultData();
      this.hDt.SetConfigId(this.Mne);
      const s = new Map();
      t?.SelectRuleMap.forEach((t, i) => {
        const e = new Map();
        ModelManager_1.ModelManager.FilterModel.GetFilterDataFuncByFilterType(i)(t).forEach(t => {
          e.set(t.FilterId, t.Content);
        });
        s.set(i, e);
      });
      this.hDt.SetRuleData(s);
      ModelManager_1.ModelManager.FilterModel.SetFilterResultData(this.hDt);
      this.kCm.set(this._Dt, this.hDt.UniqueId);
    }
  }
  CDt() {
    this.SetActive(this.Mne > 0);
  }
  UpdateData(t, i, ...e) {
    this.mDt(t);
    this.CDt();
    if (!(this.Mne <= 0)) {
      this.ypt = i;
      this.lDt = e;
      this.dDt();
      this.P5e();
      if (ConfigManager_1.ConfigManager.SortConfig.GetSortId(this._Dt) === 0) {
        this.qpt(true);
      }
    }
  }
  UpdateDataWithConfig(t, i, e, s = "", ...r) {
    var h = ConfigManager_1.ConfigManager.SortConfig.GetSortFilterConfig(i);
    if (h.SaveMode === 1 || h.SaveMode === 3) {
      this.UpdateData(t, e, ...r);
    } else {
      this.XFa();
      this.mDt(t, i, s);
      this.CDt();
      if (!(this.Mne <= 0)) {
        this.ypt = e;
        this.lDt = r;
        h = ModelManager_1.ModelManager.FilterModel.GetFilterConfigData(i, this._Dt, s);
        this.dDt(h);
        this.P5e();
        if (ConfigManager_1.ConfigManager.SortConfig.GetSortId(this._Dt) === 0) {
          this.qpt(true);
        }
      }
    }
  }
  SelectSingleById(i) {
    this.hDt?.ClearSelectRuleData();
    for (const s of ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(this.Mne).RuleList) {
      var t = ConfigManager_1.ConfigManager.FilterConfig.GetFilterRuleConfig(s).FilterType;
      var e = ModelManager_1.ModelManager.FilterModel.GetFilterItemDataList(s, this.Mne).find(t => t.FilterId === i);
      if (e) {
        this.hDt.AddSingleRuleData(t, i, e.Content ?? "");
        this.vTt();
        return true;
      }
    }
    return false;
  }
  GetUniqueIdByGroupId(t) {
    return this.kCm.get(t) ?? FilterSortDefine_1.FILTER_SORT_UNVALUE_UNIQUE_ID;
  }
  SetSortUniqueId(t) {
    this.rRt = t;
  }
}
exports.FilterEntrance = FilterEntrance;
//# sourceMappingURL=FilterEntrance.js.map