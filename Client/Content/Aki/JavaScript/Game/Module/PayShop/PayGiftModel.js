"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PayGiftModel = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  PayPackageData_1 = require("./PayShopData/PayPackageData");
class PayGiftModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.Version = "", this.lFi = [], this._Fi = [], this.uFi = new Map, this.cFi = new Map, this.mFi = new Array
  }
  InitDataByServer(t, e = !1) {
    if (0 !== t.length) {
      this._Fi = [], this.lFi = [], this.mFi = [], this.uFi.clear(), this.cFi.clear();
      var r = new Array;
      for (const i of t) {
        var s = new PayPackageData_1.PayPackageData;
        s.Phrase(i), r.push(i.uBs), this.lFi.push(s), this._Fi.push(s.GetPayShopGoods()), this.uFi.set(s.Id, s.GetPayShopGoods()), this.cFi.set(s.Id, s), !this.mFi.includes(s.TabId) && s.ShowInShop() && this.mFi.push(s.TabId)
      }
      if (e) {
        var a = new Set;
        for (const o of this.mFi) a.add(o);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshGoodsList, a)
      }
    }
  }
  IfHaveFreeGift() {
    for (const t of this.lFi)
      if ("0" === t.Amount) return !0;
    return !1
  }
  GetTabList() {
    var t = new Set;
    for (const e of this.GetPayShopGoodsList()) e.GetGetPayGiftData().ShowInShop() && e.GetGetPayGiftData().CanShowInShopTab() && e.CheckGoodIfShow() && t.add(e.GetTabId());
    return Array.from(t)
  }
  GetPayShopGoodsById(t) {
    var e = this.uFi.get(t);
    return e || Log_1.Log.CheckError() && Log_1.Log.Error("Pay", 27, "找不到对应的商品，检查配置或者协议顺序", ["id", t]), e
  }
  GetPayGiftDataList() {
    return this.lFi
  }
  GetPayGiftDataById(t) {
    return this.cFi.get(t)
  }
  GetPayShopGoodsList() {
    return this._Fi
  }
  GetDataList() {
    return this.lFi
  }
}
exports.PayGiftModel = PayGiftModel;
//# sourceMappingURL=PayGiftModel.js.map