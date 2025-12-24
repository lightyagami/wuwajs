"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabComponent = undefined;
const UE = require("ue");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const CommonTabItemBase_1 = require("./TabItem/CommonTabItemBase");
class TabComponent extends UiPanelBase_1.UiPanelBase {
  constructor(e, t, i, s) {
    super();
    this.ProxyCreate = t;
    this.ToggleCallBack = i;
    this.eGe = undefined;
    this.NOe = CommonDefine_1.INVALID_VALUE;
    this.qbt = undefined;
    this.MUt = undefined;
    this.C5e = () => {
      var e = this.ProxyCreate(undefined, undefined);
      e.InitTabItem();
      e.SetSelectedCallBack(this.gDt);
      e.SetCanExecuteChange(this.Lke);
      return e;
    };
    this.gDt = e => {
      this.bbt();
      this.NOe = e;
      this.ToggleCallBack(e);
    };
    this.Lke = (e, t) => (this.NOe !== e || !!t) && (!this.MUt || this.MUt(e, t));
    this.qbt = s;
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILayoutBase]];
  }
  OnStart() {
    var e = this.qbt ? this.qbt.GetOwner() : undefined;
    this.eGe = new GenericLayout_1.GenericLayout(this.GetLayoutBase(0), this.C5e, e);
  }
  OnBeforeDestroy() {
    this.qbt = undefined;
  }
  bbt() {
    var e;
    if (this.NOe !== CommonDefine_1.INVALID_VALUE && (e = this.eGe.GetLayoutItemByKey(this.NOe))) {
      e.SetForceSwitch(0);
    }
  }
  RefreshTabItem(e, t) {
    if (this.NOe !== CommonDefine_1.INVALID_VALUE) {
      this.eGe.GetLayoutItemByIndex(this.NOe)?.SetForceSwitch(0);
    }
    this.NOe = CommonDefine_1.INVALID_VALUE;
    this.eGe.RefreshByData(e, t);
  }
  async RefreshTabItemAsync(e, t = true) {
    if (t) {
      if (this.NOe !== CommonDefine_1.INVALID_VALUE) {
        this.eGe.GetLayoutItemByIndex(this.NOe)?.SetForceSwitch(0);
      }
      this.NOe = CommonDefine_1.INVALID_VALUE;
    }
    await this.eGe.RefreshByDataAsync(e);
  }
  RefreshTabItemByLength(t, e) {
    var i = new Array();
    for (let e = 0; e < t; e++) {
      var s = new CommonTabItemBase_1.CommonTabItemData();
      s.Index = e;
      i.push(s);
    }
    this.RefreshTabItem(i, e);
  }
  async RefreshTabItemByLengthAsync(t) {
    var i = new Array();
    for (let e = 0; e < t; e++) {
      var s = new CommonTabItemBase_1.CommonTabItemData();
      s.Index = e;
      i.push(s);
    }
    await this.RefreshTabItemAsync(i);
  }
  ResetLastSelectTab() {
    var e = this.eGe.GetLayoutItemByKey(this.NOe);
    if (e) {
      e.SetForceSwitch(0);
    }
  }
  SelectToggleByIndex(e, t = false, i = true) {
    if (t) {
      this.ResetSelectIndex();
    }
    if (e !== this.NOe && (t = this.eGe.GetLayoutItemByKey(e))) {
      t.SetForceSwitch(1, i);
    }
  }
  GetSelectedIndex() {
    return this.NOe;
  }
  TryGetSelectedIndex(e) {
    if (this.NOe === CommonDefine_1.INVALID_VALUE) {
      return e;
    } else {
      return this.NOe;
    }
  }
  ResetSelectIndex() {
    this.ResetLastSelectTab();
    this.NOe = CommonDefine_1.INVALID_VALUE;
  }
  GetTabItemByIndex(e) {
    return this.eGe.GetLayoutItemByKey(e);
  }
  GetTabItemMap() {
    return this.eGe.GetLayoutItemMap();
  }
  GetLayout() {
    return this.eGe;
  }
  SetCanChange(e) {
    this.MUt = e;
  }
}
exports.TabComponent = TabComponent;
//# sourceMappingURL=TabComponent.js.map