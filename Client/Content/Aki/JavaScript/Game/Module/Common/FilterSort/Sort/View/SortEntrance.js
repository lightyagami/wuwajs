"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortEntrance = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const DynamicMaskButton_1 = require("../../../../DynamicMask/DynamicMaskButton");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew");
const FilterSortController_1 = require("../../FilterSortController");
const SortViewData_1 = require("../Model/SortViewData");
class SortItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.BUt = undefined;
    this.he = "";
    this.j5e = undefined;
    this.MUt = undefined;
    this.gDt = t => {
      if (t === 1) {
        this.j5e?.(this.BUt.RuleId, this.he);
      }
    };
    this.Lke = () => !this.MUt || this.MUt(this.BUt.RuleId);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIExtendToggle]];
    this.BtnBindInfo = [[1, this.gDt]];
  }
  OnStart() {
    this.GetExtendToggle(1).CanExecuteChange.Bind(this.Lke);
  }
  qWe() {
    this.he = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleName(this.BUt.RuleId, this.BUt.DataType);
    this.GetText(0).SetText(this.he);
  }
  bUt(t) {
    this.GetExtendToggle(1).SetToggleStateForce(t ? 1 : 0, false);
  }
  SetToggleFunction(t) {
    this.j5e = t;
  }
  SetCanExecuteChange(t) {
    this.MUt = t;
  }
  SetToggleStateForce(t) {
    this.GetExtendToggle(1).SetToggleStateForce(t ? 1 : 0, false);
  }
  Refresh(t, i, s) {
    this.BUt = t;
    this.qWe();
    this.bUt(this.BUt.SelectedRule === this.BUt.RuleId);
  }
  GetKey(t, i) {
    return t.RuleId;
  }
}
class SortEntrance extends UiPanelBase_1.UiPanelBase {
  constructor(t, i) {
    super();
    this.UpdateDataListFunction = i;
    this.hDt = undefined;
    this.Ufa = false;
    this._Dt = 1;
    this.Mne = 0;
    this.$Fa = undefined;
    this.lSu = "";
    this.vUt = 1;
    this.ypt = [];
    this.lDt = [];
    this.qUt = undefined;
    this.GUt = false;
    this.lLt = undefined;
    this.NUt = () => {
      var t;
      if (this.GUt) {
        this.GetExtendToggle(0).SetToggleState(0);
        t = new SortViewData_1.SortViewData(this.Mne, this.vTt);
        FilterSortController_1.FilterSortController.OpenSortView(t);
      } else {
        t = this.GetScrollViewWithScrollbar(3).RootUIComp.bIsUIActive;
        this.OUt(!t);
      }
    };
    this.vTt = () => {
      this.kUt();
      this.qpt(false);
    };
    this.BUt = t => {
      this.hDt.SetIsAscending(t === 1);
      this.qpt(false);
    };
    this.FUt = () => {
      this.GetExtendToggle(0).SetToggleState(0, true);
    };
    this.IUt = () => {
      var t = new SortItem();
      t.SetToggleFunction(this.TUt);
      t.SetCanExecuteChange(this.Lke);
      return t;
    };
    this.TUt = (t, i) => {
      this.xUt();
      this.hDt.SetSelectBaseSort([t, i]);
      this.kUt();
      this.qpt(false);
      this.GetExtendToggle(0).SetToggleState(0, true);
    };
    this.Lke = t => {
      return this.hDt.GetSelectBaseSort()[0] !== t;
    };
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [3, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIExtendToggle], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.NUt], [2, this.BUt]];
  }
  OnStart() {
    this.hDt = new SortViewData_1.SortResultData();
    this.qUt = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(3), this.IUt, this.GetItem(4).GetOwner());
    this.GetExtendToggle(0).SetToggleStateForce(0, false);
  }
  OnBeforeDestroy() {
    this.lLt?.Destroy();
    this.XFa();
    ModelManager_1.ModelManager.SortModel.DeleteSortResultData(this.Mne);
  }
  XFa() {
    var t;
    if (this.$Fa && this._Dt !== 0) {
      t = this.hDt.ConvertToStorageData();
      ModelManager_1.ModelManager.SortModel.SetSortConfigData(this.$Fa, this._Dt, t, this.lSu);
    }
  }
  mDt(t, i, s) {
    this._Dt = t;
    this.Mne = ConfigManager_1.ConfigManager.SortConfig.GetSortId(t);
    this.$Fa = i ?? undefined;
    this.lSu = s ?? "";
  }
  VUt() {
    var t = ConfigManager_1.ConfigManager.SortConfig.GetSortConfig(this.Mne);
    this.GUt = t.AttributeSortList.length > 0;
  }
  HUt() {
    var t = ConfigManager_1.ConfigManager.SortConfig.GetSortConfig(this.Mne);
    this.vUt = t.DataId;
  }
  dDt(t) {
    this.hDt = ModelManager_1.ModelManager.SortModel.GetSortResultData(this.Mne);
    if (!this.hDt || this.Ufa) {
      var i = ConfigManager_1.ConfigManager.SortConfig.GetSortConfig(this.Mne);
      var i = t?.SelectBaseSort ?? i.BaseSortList[0];
      if (this.hDt === undefined) {
        var s = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleName(i, this.vUt);
        this.hDt = new SortViewData_1.SortResultData();
        this.hDt.SetConfigId(this.Mne);
        this.hDt.SetSelectBaseSort([i, s]);
        var i = this.GetExtendToggle(2);
        if (t?.IsAscending !== undefined) {
          this.hDt.SetIsAscending(t?.IsAscending);
        } else {
          this.hDt.SetIsAscending(i.GetToggleState() === 1);
        }
        if (t?.SelectAttributeSort && t.SelectAttributeSort.length > 0) {
          var e = new Map();
          for (const a of t.SelectAttributeSort) {
            var h = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleName(a, this.vUt);
            e.set(a, h);
          }
          this.hDt.SetSelectAttributeSort(e);
        }
        ModelManager_1.ModelManager.SortModel.SetSortResultData(this.Mne, this.hDt);
      }
      if (this.Ufa) {
        if (s = this.hDt.GetSelectBaseSort()) {
          i = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleName(s[0], this.vUt);
          s[1] = i;
        }
        this.Ufa = false;
      }
    }
  }
  OUt(t) {
    this.qUt.SetActive(t);
    if (t) {
      this.MLt();
    } else {
      this.TLt();
    }
  }
  AUt() {
    this.OUt(false);
    if (!this.GUt) {
      var t = ConfigManager_1.ConfigManager.SortConfig.GetSortConfig(this.Mne);
      var i = [];
      var s = this.hDt.GetSelectBaseSort()[0];
      for (const e of t.BaseSortList) {
        i.push({
          RuleId: e,
          DataType: this.vUt,
          SelectedRule: s
        });
      }
      this.qUt.RefreshByData(i);
    }
  }
  jUt() {
    var t = this.GetExtendToggle(2);
    var i = this.hDt.GetIsAscending() ? 1 : 0;
    t.SetToggleState(i, false);
  }
  xUt() {
    var t = this.hDt.GetSelectBaseSort();
    this.qUt.GetScrollItemByKey(t[0]).SetToggleStateForce(false);
  }
  kUt() {
    var t = this.hDt.ShowAllSortContent();
    this.GetText(1).SetText(t);
  }
  qpt(t) {
    var i = ConfigManager_1.ConfigManager.FilterConfig.GetFilterId(this._Dt);
    let s = this.ypt;
    var e = ModelManager_1.ModelManager.FilterModel.GetFilterResultData(i);
    if (e) {
      e = e.GetSelectRuleData();
      s = ModelManager_1.ModelManager.FilterModel.GetFilterList(s, i, e);
    }
    ModelManager_1.ModelManager.SortModel.SortDataList(s, this.Mne, this.hDt, ...this.lDt);
    this.UpdateDataListFunction?.(s, t, 1);
  }
  async MLt() {
    if (!this.lLt) {
      this.lLt = new DynamicMaskButton_1.DynamicMaskButton();
      this.lLt.SetButtonFunction(this.FUt);
      await this.lLt.Init();
    }
    this.lLt.SetAttachChildItem(this.RootItem);
    this.lLt.SetActive(true);
  }
  TLt() {
    if (this.lLt) {
      this.lLt.ResetItemParent();
      this.lLt.SetActive(false);
    }
  }
  WUt() {
    this.SetActive(this.Mne > 0);
  }
  UpdateData(t, i, ...s) {
    this.mDt(t);
    this.WUt();
    if (!(this.Mne <= 0)) {
      this.ypt = i;
      this.lDt = s;
      this.VUt();
      this.HUt();
      this.dDt();
      this.AUt();
      this.jUt();
      this.kUt();
      this.qpt(true);
    }
  }
  UpdateDataWithConfig(t, i, s, e = "", ...h) {
    this.XFa();
    this.mDt(t, i, e);
    this.WUt();
    if (!(this.Mne <= 0)) {
      this.ypt = s;
      this.lDt = h;
      t = ModelManager_1.ModelManager.SortModel.GetSortConfigData(i, this._Dt, e);
      this.VUt();
      this.HUt();
      this.dDt(t);
      this.AUt();
      this.jUt();
      this.kUt();
      this.qpt(true);
    }
  }
  SetResultDataDirty() {
    this.Ufa = true;
  }
  SetSortToggleState(t) {
    t = t ? 1 : 0;
    this.GetExtendToggle(2).SetToggleStateForce(t);
  }
}
exports.SortEntrance = SortEntrance;
//# sourceMappingURL=SortEntrance.js.map