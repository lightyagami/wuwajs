"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseSortGroup = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const GenericLayoutNew_1 = require("../../../../Util/Layout/GenericLayoutNew");
class SortItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.pDt = 0;
    this.vUt = 1;
    this.he = "";
    this.j5e = undefined;
    this.MUt = undefined;
    this.gDt = t => {
      if (t === 1) {
        this.j5e?.(this.pDt, this.he);
      }
    };
    this.Lke = () => !this.MUt || this.MUt(this.pDt);
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIExtendToggle], [2, UE.UITexture]];
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
  SetToggleFunction(t) {
    this.j5e = t;
  }
  SetCanExecuteChange(t) {
    this.MUt = t;
  }
  SetToggleStateForce(t) {
    this.GetExtendToggle(1).SetToggleStateForce(t ? 1 : 0);
  }
  ShowSortItem(t, i, e) {
    this.pDt = t;
    this.vUt = i;
    this.qWe();
    this.UTt();
    this.SetToggleStateForce(e);
  }
}
class BaseSortGroup extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.eGe = undefined;
    this.PUt = undefined;
    this.Mne = 0;
    this.wTt = 0;
    this.vUt = 1;
    this.IUt = (t, i, e) => {
      i = new SortItem(i);
      i.SetToggleFunction(this.TUt);
      i.SetCanExecuteChange(this.Lke);
      i.ShowSortItem(t, this.vUt, this.PUt[0] === t);
      return {
        Key: t,
        Value: i
      };
    };
    this.TUt = (t, i) => {
      this.xUt();
      this.PUt = [t, i];
    };
    this.Lke = t => this.PUt[0] !== t;
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILayoutBase], [1, UE.UIItem]];
  }
  OnStart() {
    this.eGe = new GenericLayoutNew_1.GenericLayoutNew(this.GetLayoutBase(0), this.IUt, this.GetItem(1));
  }
  OnBeforeDestroy() {}
  xUt() {
    this.eGe.GetLayoutItemByKey(this.PUt[0]).SetToggleStateForce(false);
  }
  mDt() {
    var t = ModelManager_1.ModelManager.SortModel.GetSortResultData(this.wTt);
    this.Mne = t.ConfigId;
  }
  wUt() {
    var t = ModelManager_1.ModelManager.SortModel.GetSortResultData(this.wTt);
    this.PUt = t.GetSelectBaseSort();
  }
  AUt() {
    var t = ConfigManager_1.ConfigManager.SortConfig.GetSortConfig(this.Mne);
    this.vUt = t.DataId;
    this.eGe.RebuildLayoutByDataNew(t.BaseSortList);
  }
  Init(t) {
    this.wTt = t;
    this.mDt();
    this.wUt();
    this.AUt();
  }
  Reset() {
    var t;
    var i;
    var e = ConfigManager_1.ConfigManager.SortConfig.GetSortConfig(this.Mne).BaseSortList[0];
    var s = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleName(e, this.vUt);
    this.PUt = [e, s];
    var s = this.eGe.GetLayoutItemMap();
    for ([t, i] of s) {
      var h = t;
      i.ShowSortItem(h, this.vUt, e === h);
    }
  }
  GetTempSelect() {
    return this.PUt;
  }
}
exports.BaseSortGroup = BaseSortGroup;
//# sourceMappingURL=BaseSortGroup.js.map