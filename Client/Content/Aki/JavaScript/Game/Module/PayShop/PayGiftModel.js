"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayGiftModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const PayPackageData_1 = require("./PayShopData/PayPackageData");
class PayGiftModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Version = "";
    this.lFi = [];
    this._Fi = [];
    this.uFi = new Map();
    this.cFi = new Map();
    this.mFi = new Array();
  }
  InitDataByServer(t, e = false) {
    if (t.length !== 0) {
      this._Fi = [];
      this.lFi = [];
      this.mFi = [];
      this.uFi.clear();
      this.cFi.clear();
      var r = new Array();
      for (const i of t) {
        var a = new PayPackageData_1.PayPackageData();
        a.Phrase(i);
        r.push(i.uBs);
        this.lFi.push(a);
        this._Fi.push(a.GetPayShopGoods());
        this.uFi.set(a.Id, a.GetPayShopGoods());
        this.cFi.set(a.Id, a);
        if (!this.mFi.includes(a.TabId) && a.ShowInShop()) {
          this.mFi.push(a.TabId);
        }
      }
      if (e) {
        var s = new Set();
        for (const o of this.mFi) {
          s.add(o);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshGoodsList, s);
      }
    }
  }
  IfHaveFreeGift() {
    for (const t of this.lFi) {
      if (t.Amount === "0") {
        return true;
      }
    }
    return false;
  }
  GetTabList() {
    var t = new Set();
    for (const e of this.GetPayShopGoodsList()) {
      if (e.GetGetPayGiftData().ShowInShop() && e.GetGetPayGiftData().CanShowInShopTab() && e.CheckGoodIfShow()) {
        t.add(e.GetTabId());
      }
    }
    return Array.from(t);
  }
  GetSkinTabList() {
    var t = new Set();
    for (const e of this.GetDataList()) {
      if ((e.ShowInSkinShop() || e.ShowInFlySkinShop() || e.ShowInMotorSkinShop()) && e.CanShowInShopTab()) {
        t.add(e.TabId);
      }
    }
    return Array.from(t);
  }
  GetPayShopGoodsById(t) {
    var e = this.uFi.get(t);
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Pay", 27, "找不到对应的商品，检查配置或者协议顺序", ["id", t]);
      }
    }
    return e;
  }
  GetPayGiftDataList() {
    return this.lFi;
  }
  GetPayGiftDataById(t) {
    return this.cFi.get(t);
  }
  GetPayGiftDataByType(e) {
    return this.lFi.filter(t => t.Type === e);
  }
  GetPayShopGoodsList() {
    return this._Fi;
  }
  GetDataList() {
    return this.lFi;
  }
}
exports.PayGiftModel = PayGiftModel;
//# sourceMappingURL=PayGiftModel.js.map