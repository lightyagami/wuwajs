"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AttributeSortGroup = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const GenericLayoutNew_1 = require("../../../../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class SortItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.pDt = 0;
    this.he = "";
    this.vUt = 1;
    this.j5e = undefined;
    this.MUt = undefined;
    this.gDt = t => {
      this.j5e?.(t, this.pDt, this.he);
    };
    this.Lke = () => {
      return this.GetExtendToggle(1).ToggleState === 1 || !this.MUt || this.MUt();
    };
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIExtendToggle], [2, UE.UITexture], [3, UE.UIText]];
    this.BtnBindInfo = [[1, this.gDt]];
  }
  OnStart() {
    this.GetExtendToggle(1).CanExecuteChange.Bind(this.Lke);
  }
  OnBeforeDestroy() {
    this.GetExtendToggle(1).CanExecuteChange.Unbind();
  }
  qWe() {
    this.he = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleName(this.pDt, this.vUt);
    this.GetText(0).SetText(this.he);
  }
  UTt() {
    var t = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleAttributeId(this.pDt, this.vUt);
    var i = t > 0;
    var t = i ? ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexIcon(t) : ConfigManager_1.ConfigManager.SortConfig.GetSortRuleIcon(this.pDt, this.vUt);
    var e = this.GetTexture(2);
    if (StringUtils_1.StringUtils.IsBlank(t)) {
      e.SetUIActive(false);
    } else {
      e.SetUIActive(true);
      this.SetTextureByPath(t, e);
      e.SetChangeColor(i, e.changeColor);
    }
  }
  EUt(t) {
    this.GetExtendToggle(1).SetToggleStateForce(t ? 1 : 0);
  }
  SetToggleFunction(t) {
    this.j5e = t;
  }
  SetCanExecuteChange(t) {
    this.MUt = t;
  }
  ShowSortItem(t, i, e) {
    this.pDt = t;
    this.vUt = i;
    this.qWe();
    this.UTt();
    this.EUt(e > 0);
    this.RefreshIndex(e);
  }
  RefreshIndex(t) {
    var i = this.GetText(3);
    if (t === 0) {
      i.SetUIActive(false);
    } else {
      i.SetUIActive(true);
      i.SetText(t.toString());
    }
  }
}
class AttributeSortGroup extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.eGe = undefined;
    this.SUt = new Map();
    this.Mne = 0;
    this.vUt = 1;
    this.yUt = 0;
    this.IUt = (t, i, e) => {
      var i = new SortItem(i);
      i.SetToggleFunction(this.TUt);
      i.SetCanExecuteChange(this.Lke);
      var s = this.LUt(t);
      i.ShowSortItem(t, this.vUt, s + 1);
      return {
        Key: t,
        Value: i
      };
    };
    this.TUt = (t, i, e) => {
      if (t === 1) {
        this.SUt.set(i, e);
      } else {
        this.SUt.delete(i);
        this.DUt(i);
      }
      this.RUt();
      this.RDt();
    };
    this.Lke = () => this.yUt === 0 || this.SUt.size < this.yUt;
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UILayoutBase], [2, UE.UIItem]];
  }
  OnStart() {
    this.eGe = new GenericLayoutNew_1.GenericLayoutNew(this.GetLayoutBase(1), this.IUt, this.GetItem(2));
  }
  OnBeforeDestroy() {}
  LUt(t) {
    let i = 0;
    for (const e of this.SUt.keys()) {
      if (e === t) {
        return i;
      }
      i++;
    }
    return -1;
  }
  DUt(t) {
    this.eGe.GetLayoutItemByKey(t).RefreshIndex(0);
  }
  RUt() {
    let t = 0;
    for (const i of this.SUt.keys()) {
      this.eGe.GetLayoutItemByKey(i).RefreshIndex(t + 1);
      t++;
    }
  }
  UUt() {
    var t = ModelManager_1.ModelManager.SortModel.GetSortResultData(this.Mne).GetSelectAttributeSort();
    if (t) {
      for (var [i, e] of t) {
        this.SUt.set(i, e);
      }
    }
  }
  AUt() {
    var t = ConfigManager_1.ConfigManager.SortConfig.GetSortConfig(this.Mne);
    this.yUt = t.LimitNum;
    this.vUt = t.DataId;
    this.eGe.RebuildLayoutByDataNew(t.AttributeSortList);
  }
  RDt() {
    var t = this.GetText(0);
    if (this.yUt === 0) {
      LguiUtil_1.LguiUtil.SetLocalText(t, "AttributeSortName");
    } else {
      LguiUtil_1.LguiUtil.SetLocalText(t, "AttributeSortLimitName", this.SUt.size, this.yUt);
    }
  }
  Init(t) {
    this.Mne = t;
    this.UUt();
    this.AUt();
    this.RDt();
  }
  Reset() {
    var t;
    var i;
    this.SUt.clear();
    for ([t, i] of this.eGe.GetLayoutItemMap()) {
      var e = t;
      i.ShowSortItem(e, this.vUt, 0);
    }
    this.RDt();
  }
  GetTempSelectMap() {
    return this.SUt;
  }
}
exports.AttributeSortGroup = AttributeSortGroup;
//# sourceMappingURL=AttributeSortGroup.js.map