"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonCurrencyItemListComponent = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const PowerCurrencyItem_1 = require("../Power/SubViews/PowerCurrencyItem");
const CommonCurrencyItem_1 = require("./CommonCurrencyItem");
class CommonCurrencyItemListComponent {
  constructor(e) {
    this.PTt = undefined;
    this.nGe = [];
    this.xTt = undefined;
    this.xTt = e;
  }
  qXs(e) {
    return new (ModelManager_1.ModelManager.PowerModel.CheckItemIfPowerItem(e) ? PowerCurrencyItem_1.PowerCurrencyItem : CommonCurrencyItem_1.CommonCurrencyItem)();
  }
  async SetCurrencyItemList(t) {
    if (!this.PTt) {
      this.PTt = new Array();
      this.nGe = [];
    }
    let r = undefined;
    for (let e = this.PTt.length; e < t.length; e++) {
      const r = this.qXs(t[e]);
      this.PTt.push(r);
      var o = r.CreateThenShowByResourceIdAsync("UIItem_CommonCurrencyItem", this.xTt);
      this.nGe.push(o);
    }
    await Promise.all(this.nGe);
    for (let e = 0; e < t.length; e++) {
      const r = this.PTt[e];
      r.RefreshTemp(t[e]);
      r.SetActive(true);
      r.RefreshAddButtonActive();
    }
    for (let e = t.length; e < this.PTt.length; e++) {
      (r = this.PTt[e]).SetActive(false);
    }
  }
  GetCurrencyItemList() {
    return this.PTt;
  }
}
exports.CommonCurrencyItemListComponent = CommonCurrencyItemListComponent;
//# sourceMappingURL=CommonCurrencyItemListComponent.js.map