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
const FilterViewData_1 = require("../Model/FilterViewData");
class FilterEntrance extends UiPanelBase_1.UiPanelBase {
  constructor(t, i) {
    super();
    this.UpdateDataListFunction = i;
    this.hDt = undefined;
    this.ypt = [];
    this.lDt = [];
    this._Dt = undefined;
    this.Mne = 0;
    this.$Fa = undefined;
    this._7c = "";
    this.uDt = () => {
      var t = new FilterViewData_1.FilterViewData(this.Mne, this.vTt);
      FilterSortController_1.FilterSortController.OpenFilterView(t);
    };
    this.vTt = () => {
      this.XFa();
      this.P5e();
      this.qpt(false);
    };
    this.gPe = () => {
      ModelManager_1.ModelManager.FilterModel.ClearData(this.Mne);
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
    this.BtnBindInfo = [[0, this.uDt], [3, this.gPe]];
  }
  TryClearData() {
    var t;
    return !(this.Mne <= 0) && !(t = this.hDt.ShowAllFilterContent(), StringUtils_1.StringUtils.IsBlank(t)) && !(this.gPe(), 0);
  }
  OnStart() {
    this.hDt = new FilterViewData_1.FilterResultData();
    this.GetItem(1).SetUIActive(false);
    this.AddEventListener();
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.FilterModel.DeleteFilterResultData(this.Mne);
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
    var i = this.hDt.GetSelectRuleData();
    var i = ModelManager_1.ModelManager.FilterModel.GetFilterList(this.ypt, this.Mne, i);
    var e = ConfigManager_1.ConfigManager.SortConfig.GetSortId(this._Dt);
    var s = ModelManager_1.ModelManager.SortModel.GetSortResultData(e);
    if (s) {
      ModelManager_1.ModelManager.SortModel.SortDataList(i, e, s, ...this.lDt);
    }
    this.UpdateDataListFunction?.(i, t, 0);
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
    this.hDt = ModelManager_1.ModelManager.FilterModel.GetFilterResultData(this.Mne);
    if (!this.hDt) {
      if (this.hDt === undefined) {
        this.hDt = new FilterViewData_1.FilterResultData();
        const s = new Map();
        t?.SelectRuleMap.forEach((t, i) => {
          const e = new Map();
          ModelManager_1.ModelManager.FilterModel.GetFilterDataFuncByFilterType(i)(t).forEach(t => {
            e.set(t.FilterId, t.Content);
          });
          s.set(i, e);
        });
        this.hDt.SetRuleData(s);
      }
      this.hDt.SetConfigId(this.Mne);
      ModelManager_1.ModelManager.FilterModel.SetFilterResultData(this.Mne, this.hDt);
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
  UpdateDataWithConfig(t, i, e, s = "", ...a) {
    var r = ConfigManager_1.ConfigManager.SortConfig.GetSortFilterConfig(i);
    if (r.SaveMode === 1 || r.SaveMode === 3) {
      this.UpdateData(t, e, ...a);
    } else {
      this.XFa();
      this.mDt(t, i, s);
      this.CDt();
      if (!(this.Mne <= 0)) {
        this.ypt = e;
        this.lDt = a;
        r = ModelManager_1.ModelManager.FilterModel.GetFilterConfigData(i, this._Dt, s);
        this.dDt(r);
        this.P5e();
        if (ConfigManager_1.ConfigManager.SortConfig.GetSortId(this._Dt) === 0) {
          this.qpt(true);
        }
      }
    }
  }
}
exports.FilterEntrance = FilterEntrance;
//# sourceMappingURL=FilterEntrance.js.map