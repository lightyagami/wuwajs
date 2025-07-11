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
    this.xTt = undefined;
    this.xTt = e;
  }
  qXs(e) {
    return new (ModelManager_1.ModelManager.PowerModel.CheckItemIfPowerItem(e) ? PowerCurrencyItem_1.PowerCurrencyItem : CommonCurrencyItem_1.CommonCurrencyItem)();
  }
  async SetCurrencyItemList(r) {
    this.PTt ||= new Array();
    let t = undefined;
    var o = [];
    for (let e = this.PTt.length; e < r.length; e++) {
      const t = this.qXs(r[e]);
      this.PTt.push(t);
      var n = t.CreateThenShowByResourceIdAsync("UIItem_CommonCurrencyItem", this.xTt);
      o.push(n);
    }
    await Promise.all(o);
    for (let e = 0; e < r.length; e++) {
      const t = this.PTt[e];
      t.RefreshTemp(r[e]);
      t.SetActive(true);
      t.RefreshAddButtonActive();
    }
    for (let e = r.length; e < this.PTt.length; e++) {
      (t = this.PTt[e]).SetActive(false);
    }
  }
  GetCurrencyItemList() {
    return this.PTt;
  }
}
exports.CommonCurrencyItemListComponent = CommonCurrencyItemListComponent;
//# sourceMappingURL=CommonCurrencyItemListComponent.js.map