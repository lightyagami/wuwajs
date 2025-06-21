"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PayShopModel = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  PayShopGoods_1 = require("./PayShopData/PayShopGoods"),
  PayShopGoodsData_1 = require("./PayShopData/PayShopGoodsData"),
  PayShopDefine_1 = require("./PayShopDefine"),
  DEFAULTTAB = 1;
class PayShopModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.DFi = new Map, this.RFi = new Map, this.uFi = new Map, this.UFi = "", this.AFi = 0, this.PFi = !1, this.xFi = new Array, this.L4a = (e, o) => e.GetGoodsData().GetSortValue() !== o.GetGoodsData().GetSortValue() ? e.GetGoodsData().GetSortValue() - o.GetGoodsData().GetSortValue() : e.GetGoodsId() - o.GetGoodsId(), this.A4a = (e, o) => e.GetItemData().Quality !== o.GetItemData().Quality ? o.GetItemData().Quality - e.GetItemData().Quality : e.GetGoodsData().GetSortValue() !== o.GetGoodsData().GetSortValue() ? e.GetGoodsData().GetSortValue() - o.GetGoodsData().GetSortValue() : e.GetGoodsId() - o.GetGoodsId(), this.Qjs = (e, o) => {
      var t, r;
      return e.IsSoldOut() !== o.IsSoldOut() ? e.IsSoldOut() ? 1 : -1 : e.IfCanBuy() !== o.IfCanBuy() ? e.IfCanBuy() ? -1 : 1 : (t = e.GetItemData(), r = o.GetItemData(), t.Quality !== r.Quality ? r.Quality - t.Quality : e.GetGoodsData().GetSortValue() !== o.GetGoodsData().GetSortValue() ? e.GetGoodsData().GetSortValue() - o.GetGoodsData().GetSortValue() : e.GetGoodsId() - o.GetGoodsId())
    }, this.wFi = (e, o) => {
      var t, r;
      return e.IsSoldOut() !== o.IsSoldOut() ? e.IsSoldOut() ? 1 : -1 : e.IsLocked() !== o.IsLocked() ? e.IsLocked() ? 1 : -1 : e.GetGoodsData().GetSortValue() !== o.GetGoodsData().GetSortValue() ? e.GetGoodsData().GetSortValue() - o.GetGoodsData().GetSortValue() : (t = e.GetItemData(), r = o.GetItemData(), t.Quality !== r.Quality ? r.Quality - t.Quality : e.GetGoodsId() - o.GetGoodsId())
    }
  }
  set Version(e) {
    this.UFi = e
  }
  get Version() {
    return this.UFi
  }
  GetCurrentPayShopId() {
    return this.AFi
  }
  GetTabInfoByPayShopIdId(e) {
    var o;
    for (const t of this.GetPayShopIdList())
      if (t === e) return o = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(t), ConfigManager_1.ConfigManager.DynamicTabConfig.GetTabViewConfById(o.DynamicTabId)
  }
  SetPayShopInfoList(e) {
    for (const o of e) this.BFi(o);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshAllPayShop, Array.from(this.DFi.keys()))
  }
  SetPayShopInfo(e) {
    this.BFi(e), this.AFi = e.s5n
  }
  SetPayShopGoodsList(e) {
    var o, t, r = new Set;
    for (const a of e) {
      let e = this.uFi.get(a.s5n);
      e ? this.RefreshPayShopGoods(a) : (o = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(a.s5n).ShopId, (t = this.DFi.get(o) ?? new Set).add(a.s5n), this.DFi.set(o, t), e = this.qFi(a, o)), r.add(e.GetTabId())
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshGoodsList, r)
  }
  BFi(e) {
    var o = e.s5n,
      t = e.bMs,
      r = new Set;
    for (const a of t) r.add(a.s5n), this.qFi(a, o);
    this.DFi.set(o, r), this.RFi.set(o, MathUtils_1.MathUtils.LongToBigInt(e.Lxs)), this.PFi = !0, Log_1.Log.CheckInfo() && Log_1.Log.Info("Shop", 10, "PayShop:Root 刷新商城数据", ["ShopId", o], ["goodsLength", r.size])
  }
  RefreshPayShopGoods(e) {
    var o = new PayShopGoodsData_1.PayShopGoodsData;
    o.Phrase(e), this.uFi.get(e.s5n).SetGoodsData(o)
  }
  qFi(e, o) {
    var t = new PayShopGoodsData_1.PayShopGoodsData,
      e = (t.Phrase(e), new PayShopGoods_1.PayShopGoods(o));
    return e.SetGoodsData(t), this.uFi.set(t.Id, e), e
  }
  UnLockPayShopGoods(e) {
    var o = new Map;
    for (const r of e) {
      var t = this.uFi.get(r);
      t.SetUnLock();
      let e = o.get(t.PayShopId);
      (e = e || new Set).add(t.GetTabId()), o.set(t.PayShopId, e)
    }
    this.PFi = !0, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UnLockGoods, o)
  }
  GetPayShopIdList() {
    return this.PFi ? (this.PFi = !1, this.xFi = [], this.DFi.forEach((e, o) => {
      ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(o).Enable && this.xFi.push(o)
    }), this.xFi.sort((e, o) => {
      var t = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(e),
        r = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(o);
      return t.Sort !== r.Sort ? t.Sort - r.Sort : e - o
    })) : this.xFi
  }
  GetPayShopTabIdList(a, e = !0) {
    var o = new Set;
    if (1 === a)
      for (const i of ConfigManager_1.ConfigManager.PayShopConfig.GetRecommendData()) o.has(i.Id) || o.add(i.Id);
    else
      for (const s of this.DFi.get(a)) {
        var t = this.uFi.get(s),
          r = t.GetTabId();
        3 === a && PayShopDefine_1.giftBagShopSpecialTabList.includes(r) && !t.CheckGoodIfShow() || o.has(t.GetTabId()) || o.add(t.GetTabId())
      }
    if (3 === a)
      for (const h of ModelManager_1.ModelManager.PayGiftModel.GetTabList()) o.add(h);
    var n = Array.from(o);
    return e && n.sort((e, o) => {
      var t = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopTabConfig(a, e),
        r = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopTabConfig(a, o);
      return t.Sort !== r.Sort ? t.Sort - r.Sort : e - o
    }), n
  }
  GetPayShopFirstTabId(e) {
    var o = this.DFi.get(e);
    if (!o) return 0;
    let t = 0,
      r = 0;
    for (const i of o) {
      var a, n = this.uFi.get(i).GetTabId();
      0 === t && 0 === r ? (t = n, r = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopTabConfig(e, t).Sort) : (a = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopTabConfig(e, n).Sort, (r > a || r === a && t > n) && (t = n, r = a))
    }
    return t
  }
  GFi(e, o = 1) {
    return 3 === e && (o === DEFAULTTAB || o === PayShopDefine_1.CARNIVAL_TABID)
  }
  aUl(e) {
    return 6 === e
  }
  NFi(e, o = 1) {
    var t = [];
    if (this.GFi(e, o))
      for (const a of ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsList()) a.GetGetPayGiftData().ShowInShop() && a.GetGetPayGiftData().CanShowInShopTab() && t.push(a);
    else if (this.aUl(e))
      for (const n of ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsList()) n.GetTabId() === o && (n.GetGetPayGiftData().ShowInSkinShop() || n.GetGetPayGiftData().ShowInFlySkinShop()) && n.GetGetPayGiftData().CanShowInShopTab() && t.push(n);
    e = this.DFi.get(e);
    if (e)
      for (const i of e) {
        var r = this.uFi.get(i);
        t.push(r)
      }
    return t
  }
  GetGoodsInTab(e, o) {
    var t = [];
    for (const a of this.DFi.get(e)) {
      var r = this.uFi.get(a);
      t.push(r)
    }
    for (const n of t)
      if (n.GetItemData().ItemId === o)
        if (n.CheckGoodIfShow()) return n
  }
  GetPayShopTabData(e, o = 1, t = !0) {
    if (-1 === e || 0 === e) return [];
    var r = [];
    for (const a of this.NFi(e, o)) a.GetTabId() === o && a.CheckGoodIfShow() && r.push(a);
    return t ? this.R4a(e, r) : r
  }
  R4a(e, o) {
    if (1 === ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(e).SortRule) {
      var t = [],
        r = [],
        a = [];
      for (const n of o)(n.IsSoldOut() ? a : n.IfCanBuy() ? t : r).push(n);
      return t.sort(this.A4a), r.sort(this.L4a), a.sort(this.A4a), t.concat(r).concat(a)
    }
    e = this.$js(e);
    return o.sort(e)
  }
  $js(e) {
    return 1 !== ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(e).SortRule ? this.wFi : this.Qjs
  }
  GetPayShopGoods(e) {
    return this.uFi.get(e)
  }
  GetPayShopCountDownData(e) {
    var o, e = this.RFi.get(e);
    if (!(void 0 === e || e <= 0)) return e = Number(e), o = PayShopGoods_1.PayShopGoods.GetTimeTypeData(e), e = e - Math.ceil(TimeUtil_1.TimeUtil.GetServerTime()), 0 === o[0] ? {
      CountDownText: ConfigManager_1.ConfigManager.TextConfig.GetTextById("NotEnoughOneHour"),
      RemainingTime: e
    } : TimeUtil_1.TimeUtil.GetCountDownData(e)
  }
  GetPayShopUpdateTime(e) {
    e = this.RFi.get(e);
    return e ? Number(e) : 0
  }
  UpdatePayShopGoodsCount(e, o) {
    var t = this.uFi.get(e);
    t.IsLimitGoods() && (t.AddBoughtCount(o), t.IsSoldOut()) && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GoodsSoldOut, e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshGoods, e, t.PayShopId, t.GetTabId())
  }
  GetNeedCheckGoods(e) {
    var o = [];
    for (const t of this.NFi(e)) t.IsShowInShop() && (t.InUpdateTime() || t.InUnPermanentSellTime() || t.WillSell()) && o.push(t);
    return o
  }
  CheckPayShopEntranceHasRedDot() {
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10010))
      for (const e of this.GetPayShopIdList())
        if (this.CheckPayShopHasRedDot(e)) return !0;
    return !1
  }
  CheckPayShopHasRedDot(e) {
    if (1 === e) return ModelManager_1.ModelManager.MonthCardModel.GetPayButtonRedDotState();
    if (100 === e) return !LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PayShopRechargeRedDot, !1) && ModelManager_1.ModelManager.PayItemModel.HasBonusData();
    for (const o of this.GetPayShopTabIdList(e, !1))
      if (this.CheckPayShopTabHasRedDot(e, o) && PayShopDefine_1.payShopViewTabType.includes(e)) return !0;
    return !1
  }
  CheckPayShopTabHasRedDot(e, o = 1) {
    if (1 === e) return this.Hzl(e, o);
    for (const t of this.GetPayShopTabData(e, o, !1))
      if (t.GetIfNeedRemind()) return !0;
    return !1
  }
  Hzl(e, o = 1) {
    return !!this.GetPayShopTabIdList(e, !1).includes(o) && 1 === ConfigManager_1.ConfigManager.PayShopConfig.GetRecommendDataById(o).RecommendType && ModelManager_1.ModelManager.MonthCardModel.GetPayButtonRedDotState()
  }
  ReadShopItemCheckFlag(e, o = 1) {
    let t = [],
      r = !1;
    for (const a of t = this.GFi(e, o) ? ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsList() : this.GetPayShopTabData(e, o, !1)) a.IsSoldOut() || a.IsLocked() || !a.IfCanBuy() || ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.PayShopTabItemChecked, a.GetGoodsId()) || (ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.PayShopTabItemChecked, a.GetGoodsId()), r = !0);
    return r && ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(LocalStorageDefine_1.ELocalStoragePlayerKey.PayShopTabItemChecked), r
  }
  CheckShopItemCheckFlag(e, o = 1) {
    let t = [];
    for (const r of t = this.GFi(e, o) ? ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsList() : this.GetPayShopTabData(e, o, !1))
      if (!r.IsSoldOut() && !r.IsLocked() && r.IfCanBuy())
        if (!ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.PayShopTabItemChecked, r.GetGoodsId())) return !0;
    return !1
  }
  GetPayShopItemQualitySpriteByItemIdAndQuality(e, o) {
    return (13 === ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e) ? ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityById(o) : ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(o)).PayShopQualitySprite
  }
  ClearData() {
    this.DFi.clear(), this.uFi.clear(), this.RFi.clear()
  }
}
exports.PayShopModel = PayShopModel;
//# sourceMappingURL=PayShopModel.js.map