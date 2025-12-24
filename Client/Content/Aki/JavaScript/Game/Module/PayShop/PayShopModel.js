"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayShopModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const HonamiStoryUtil_1 = require("../HonamiStory/HonamiStoryUtil");
const PayShopGoods_1 = require("./PayShopData/PayShopGoods");
const PayShopGoodsData_1 = require("./PayShopData/PayShopGoodsData");
const PayShopInfoData_1 = require("./PayShopData/PayShopInfoData");
const PayShopRecommendData_1 = require("./PayShopData/PayShopRecommendData");
const PayShopTabData_1 = require("./PayShopData/PayShopTabData");
const PayShopDefine_1 = require("./PayShopDefine");
const DEFAULTTAB = 1;
class PayShopModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.m2d = new Map();
    this.DFi = new Map();
    this.uFi = new Map();
    this.f2d = new Array();
    this.g2d = new Map();
    this.UFi = "";
    this.AFi = 0;
    this.PFi = false;
    this.xFi = new Array();
    this.BusinessCompliance = false;
    this.L4a = (e, t) => e.GetGoodsData().GetSortValue() !== t.GetGoodsData().GetSortValue() ? e.GetGoodsData().GetSortValue() - t.GetGoodsData().GetSortValue() : e.GetGoodsId() - t.GetGoodsId();
    this.A4a = (e, t) => e.GetItemData().Quality !== t.GetItemData().Quality ? t.GetItemData().Quality - e.GetItemData().Quality : e.GetGoodsData().GetSortValue() !== t.GetGoodsData().GetSortValue() ? e.GetGoodsData().GetSortValue() - t.GetGoodsData().GetSortValue() : e.GetGoodsId() - t.GetGoodsId();
    this.Qjs = (e, t) => {
      var o;
      var a;
      if (e.IsSoldOut() !== t.IsSoldOut()) {
        if (e.IsSoldOut()) {
          return 1;
        } else {
          return -1;
        }
      } else if (e.IfCanBuy() !== t.IfCanBuy()) {
        if (e.IfCanBuy()) {
          return -1;
        } else {
          return 1;
        }
      } else {
        o = e.GetItemData();
        a = t.GetItemData();
        if (o.Quality !== a.Quality) {
          return a.Quality - o.Quality;
        } else if (e.GetGoodsData().GetSortValue() !== t.GetGoodsData().GetSortValue()) {
          return e.GetGoodsData().GetSortValue() - t.GetGoodsData().GetSortValue();
        } else {
          return e.GetGoodsId() - t.GetGoodsId();
        }
      }
    };
    this.wFi = (e, t) => {
      var o;
      var a;
      if (e.IsSoldOut() !== t.IsSoldOut()) {
        if (e.IsSoldOut()) {
          return 1;
        } else {
          return -1;
        }
      } else if (e.IsLocked() !== t.IsLocked()) {
        if (e.IsLocked()) {
          return 1;
        } else {
          return -1;
        }
      } else if (e.GetGoodsData().GetSortValue() !== t.GetGoodsData().GetSortValue()) {
        return e.GetGoodsData().GetSortValue() - t.GetGoodsData().GetSortValue();
      } else {
        o = e.GetItemData();
        a = t.GetItemData();
        if (o.Quality !== a.Quality) {
          return a.Quality - o.Quality;
        } else {
          return e.GetGoodsId() - t.GetGoodsId();
        }
      }
    };
  }
  set Version(e) {
    this.UFi = e;
  }
  get Version() {
    return this.UFi;
  }
  GetCurrentPayShopId() {
    return this.AFi;
  }
  GetTabInfoByPayShopIdId(e) {
    var t;
    for (const o of this.GetPayShopIdList()) {
      if (o === e) {
        t = this.GetPayShopInfoDynamicTabId(o);
        return ConfigManager_1.ConfigManager.DynamicTabConfig.GetTabViewConfById(t);
      }
    }
  }
  SetPayShopInfoList(e) {
    for (const t of e) {
      this.BFi(t);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshAllPayShop, Array.from(this.DFi.keys()));
  }
  SetPayShopRecommendData(e) {
    for (const a of e) {
      var t = a.s5n;
      var o = this.g2d.get(t);
      if (o) {
        o.Phrase(a);
      } else {
        (o = new PayShopRecommendData_1.PayShopRecommendData()).Phrase(a);
        this.g2d.set(t, o);
      }
    }
  }
  SetPayShopTabData(e) {
    if (e.length !== 0) {
      this.f2d = [];
      for (const o of e) {
        var t = new PayShopTabData_1.PayShopTabData();
        t.Phrase(o);
        this.f2d.push(t);
      }
    }
  }
  SetPayShopInfo(e) {
    this.BFi(e);
    this.AFi = e.s5n;
  }
  SetPayShopGoodsList(e) {
    var t;
    var o;
    var a = new Set();
    for (const r of e) {
      let e = this.uFi.get(r.s5n);
      if (e) {
        this.RefreshPayShopGoods(r);
      } else {
        t = r.tjn;
        (o = this.DFi.get(t) ?? new Set()).add(r.s5n);
        this.DFi.set(t, o);
        e = this.qFi(r, t);
      }
      a.add(e.GetTabId());
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshGoodsList, a);
  }
  GetPayShopInfoById(e) {
    if (this.m2d.get(e)) {
      return this.m2d.get(e);
    }
  }
  BFi(e) {
    var t = e.s5n;
    var o = e.bMs;
    var a = new Set();
    for (const r of o) {
      a.add(r.s5n);
      this.qFi(r, t);
    }
    this.DFi.set(t, a);
    o = this.m2d.get(t) ?? new PayShopInfoData_1.PayShopInfoData();
    o.Phrase(e);
    this.m2d.set(t, o);
    this.PFi = true;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Shop", 10, "PayShop:Root 刷新商城数据", ["ShopId", t], ["goodsLength", a.size]);
    }
  }
  RefreshPayShopGoods(e) {
    var t = new PayShopGoodsData_1.PayShopGoodsData();
    t.Phrase(e);
    this.uFi.get(e.s5n).SetGoodsData(t);
  }
  qFi(e, t) {
    var o = new PayShopGoodsData_1.PayShopGoodsData();
    o.Phrase(e);
    var e = new PayShopGoods_1.PayShopGoods(t);
    e.SetGoodsData(o);
    this.uFi.set(o.Id, e);
    return e;
  }
  UnLockPayShopGoods(e) {
    var t = new Map();
    for (const a of e) {
      var o = this.uFi.get(a);
      o.SetUnLock();
      let e = t.get(o.PayShopId);
      (e = e || new Set()).add(o.GetTabId());
      t.set(o.PayShopId, e);
    }
    this.PFi = true;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UnLockGoods, t);
  }
  GetPayShopIdList() {
    if (this.PFi) {
      this.PFi = false;
      this.xFi = [];
      this.DFi.forEach((e, t) => {
        this.xFi.push(t);
      });
      return this.xFi.sort((e, t) => {
        var o = this.GetPayShopInfoSort(e);
        var a = this.GetPayShopInfoSort(t);
        if (o !== a) {
          return o - a;
        } else {
          return e - t;
        }
      });
    } else {
      return this.xFi;
    }
  }
  GetPayShopTabIdList(r, e = true) {
    var t = new Set();
    if (r === 1) {
      for (const i of this.GetNeedShowRecommendData()) {
        if (!t.has(i.Id)) {
          t.add(i.Id);
        }
      }
    } else {
      for (const s of this.DFi.get(r)) {
        var o = this.uFi.get(s);
        var a = o.GetTabId();
        if ((r !== 3 || !PayShopDefine_1.giftBagShopSpecialTabList.includes(a) || !!o.CheckGoodIfShow()) && !t.has(o.GetTabId())) {
          t.add(o.GetTabId());
        }
      }
    }
    if (r === 3) {
      for (const h of ModelManager_1.ModelManager.PayGiftModel.GetTabList()) {
        t.add(h);
      }
    }
    if (r === 6) {
      for (const f of ModelManager_1.ModelManager.PayGiftModel.GetSkinTabList()) {
        t.add(f);
      }
    }
    var n = Array.from(t);
    if (e) {
      n.sort((e, t) => {
        var o = this.GetPayShopTabDataByPayShopIdAndTabId(r, e);
        var a = this.GetPayShopTabDataByPayShopIdAndTabId(r, t);
        var o = o ? o.Sort : 0;
        var a = a ? a.Sort : 0;
        if (o !== a) {
          return o - a;
        } else {
          return e - t;
        }
      });
    }
    return n;
  }
  GetPayShopFirstTabId(e) {
    var t = this.DFi.get(e);
    if (!t) {
      return 0;
    }
    let o = 0;
    let a = 0;
    for (const s of t) {
      var r;
      var n;
      var i = this.uFi.get(s).GetTabId();
      if (o === 0 && a === 0) {
        o = i;
        r = this.GetPayShopTabDataByPayShopIdAndTabId(e, o);
        a = r ? r.Sort : 0;
      } else {
        n = (r = this.GetPayShopTabDataByPayShopIdAndTabId(e, o)) ? r.Sort : 0;
        if (a > n || a === n && o > i) {
          o = i;
          a = n;
        }
      }
    }
    return o;
  }
  GFi(e, t = 1) {
    return e === 3 && (t === DEFAULTTAB || t === PayShopDefine_1.CARNIVAL_TABID);
  }
  aUl(e) {
    return e === 6;
  }
  GetPayShopGoodsByTabType(e, t = 1) {
    var o = [];
    if (this.GFi(e, t)) {
      for (const r of ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsList()) {
        if (r.GetGetPayGiftData().ShowInShop() && r.GetGetPayGiftData().CanShowInShopTab()) {
          o.push(r);
        }
      }
    } else if (this.aUl(e)) {
      for (const n of ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsList()) {
        if (n.GetTabId() === t && (n.GetGetPayGiftData().ShowInSkinShop() || n.GetGetPayGiftData().ShowInFlySkinShop() || n.GetGetPayGiftData().ShowInMotorSkinShop()) && n.GetGetPayGiftData().CanShowInShopTab()) {
          o.push(n);
        }
      }
    }
    e = this.DFi.get(e);
    if (e) {
      for (const i of e) {
        var a = this.uFi.get(i);
        o.push(a);
      }
    }
    return o;
  }
  GetGoodsInTab(e, t) {
    var o = [];
    for (const r of this.DFi.get(e)) {
      var a = this.uFi.get(r);
      o.push(a);
    }
    for (const n of o) {
      if (n.GetItemData().ItemId === t) {
        if (n.CheckGoodIfShow()) {
          return n;
        }
      }
    }
  }
  GetPayShopTabData(e, t = 1, o = true) {
    if (e === -1 || e === 0) {
      return [];
    }
    var a = [];
    for (const r of this.GetPayShopGoodsByTabType(e, t)) {
      if (r.GetTabId() === t && r.CheckGoodIfShow()) {
        a.push(r);
      }
    }
    if (o) {
      return this.R4a(e, a);
    } else {
      return a;
    }
  }
  R4a(e, t) {
    if (this.GetPayShopInfoSortRule(e) === 1) {
      var o = [];
      var a = [];
      var r = [];
      for (const n of t) {
        (n.IsSoldOut() ? r : n.IfCanBuy() ? o : a).push(n);
      }
      o.sort(this.A4a);
      a.sort(this.L4a);
      r.sort(this.A4a);
      return o.concat(a).concat(r);
    }
    e = this.$js(e);
    return t.sort(e);
  }
  $js(e) {
    if (this.GetPayShopInfoSortRule(e) !== 1) {
      return this.wFi;
    } else {
      return this.Qjs;
    }
  }
  GetPayShopGoods(e) {
    return this.uFi.get(e);
  }
  GetPayShopCountDownData(e) {
    var t;
    var e = this.GetPayShopUpdateTime(e);
    if (e !== undefined && !(e <= 0)) {
      e = Number(e);
      t = PayShopGoods_1.PayShopGoods.GetTimeTypeData(e);
      e = e - Math.ceil(TimeUtil_1.TimeUtil.GetServerTime());
      if (t[0] === 0) {
        return {
          CountDownText: ConfigManager_1.ConfigManager.TextConfig.GetTextById("NotEnoughOneHour"),
          RemainingTime: e
        };
      } else {
        return TimeUtil_1.TimeUtil.GetCountDownData(e);
      }
    }
  }
  GetPayShopUpdateTime(e) {
    e = this.GetPayShopInfoById(e);
    if (e) {
      return Number(e.UpdateTime);
    } else {
      return 0;
    }
  }
  UpdatePayShopGoodsCount(e, t) {
    var o = this.uFi.get(e);
    if (o.IsLimitGoods() && (o.AddBoughtCount(t), o.IsSoldOut())) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GoodsSoldOut, e);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshGoods, e, o.PayShopId, o.GetTabId());
  }
  GetNeedCheckGoods(e) {
    var t = [];
    for (const o of this.GetPayShopGoodsByTabType(e)) {
      if (o.IsShowInShop() && (o.InUpdateTime() || o.InUnPermanentSellTime() || o.WillSell())) {
        t.push(o);
      }
    }
    return t;
  }
  CheckPayShopEntranceHasRedDot() {
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10010)) {
      for (const e of this.GetPayShopIdList()) {
        if (this.CheckPayShopHasRedDot(e)) {
          return true;
        }
      }
    }
    return false;
  }
  CheckPayShopHasRedDot(e) {
    if (e === 1) {
      return ModelManager_1.ModelManager.MonthCardModel.GetPayButtonRedDotState();
    }
    if (e === 100) {
      return !LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PayShopRechargeRedDot, false) && ModelManager_1.ModelManager.PayItemModel.HasBonusData();
    }
    for (const t of this.GetPayShopTabIdList(e, false)) {
      if (this.CheckPayShopTabHasRedDot(e, t) && PayShopDefine_1.payShopViewTabType.includes(e)) {
        return true;
      }
    }
    return false;
  }
  CheckPayShopTabHasRedDot(e, t = 1) {
    if (e === 1) {
      return this.Hzl(e, t);
    }
    if (e === 6 && t !== 1) {
      for (const a of ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsList()) {
        if (a.GetTabId() === t) {
          var o = a.GetGetPayGiftData();
          if ((o.ShowInSkinShop() || o.ShowInFlySkinShop() || o.ShowInMotorSkinShop()) && o.CanShowInShopTab() && a.GetIfNeedRemind()) {
            return true;
          }
        }
      }
    }
    for (const r of this.GetPayShopTabData(e, t, false)) {
      if (r.GetIfNeedRemind()) {
        return true;
      }
    }
    return false;
  }
  Hzl(e, t = 1) {
    return !!this.GetPayShopTabIdList(e, false).includes(t) && this.GetRecommendDataById(t).RecommendType === 1 && ModelManager_1.ModelManager.MonthCardModel.GetPayButtonRedDotState();
  }
  ReadShopItemCheckFlag(e, t = 1) {
    let o = [];
    let a = false;
    for (const r of o = this.GFi(e, t) ? ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsList() : this.GetPayShopTabData(e, t, false)) {
      if (!r.IsSoldOut() && !r.IsLocked() && !!r.IfCanBuy() && !ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.PayShopTabItemChecked, r.GetGoodsId())) {
        ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.PayShopTabItemChecked, r.GetGoodsId());
        a = true;
      }
    }
    if (a) {
      ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(LocalStorageDefine_1.ELocalStoragePlayerKey.PayShopTabItemChecked);
    }
    return a;
  }
  CheckShopItemCheckFlag(e, t = 1) {
    let o = [];
    for (const a of o = this.GFi(e, t) ? ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsList() : this.GetPayShopTabData(e, t, false)) {
      if (!a.IsSoldOut() && !a.IsLocked() && a.IfCanBuy()) {
        if (!ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.PayShopTabItemChecked, a.GetGoodsId())) {
          return true;
        }
      }
    }
    return false;
  }
  GetPayShopItemQualitySpriteByItemIdAndQuality(e, t) {
    var o = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e);
    return (o === 13 ? ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityById(t) : o === 17 || HonamiStoryUtil_1.HonamiStoryUtil.CheckIsPluginBoxItem(e) ? ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryQuality(t) : ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(t)).PayShopQualitySprite;
  }
  GetPayShopInfoTabViewType(e) {
    e = this.GetPayShopInfoById(e);
    if (e) {
      return e.ShopTabViewType;
    } else {
      return 0;
    }
  }
  GetPayShopInfoDynamicTabId(e) {
    e = this.GetPayShopInfoById(e);
    if (e) {
      return e.DynamicTabId;
    } else {
      return 0;
    }
  }
  GetPayShopInfoSortRule(e) {
    e = this.GetPayShopInfoById(e);
    if (e) {
      return e.SortRule;
    } else {
      return 0;
    }
  }
  GetPayShopInfoSort(e) {
    e = this.GetPayShopInfoById(e);
    if (e) {
      return e.Sort;
    } else {
      return 0;
    }
  }
  GetPayShopInfoMoney(e) {
    e = this.GetPayShopInfoById(e);
    if (e) {
      return e.Money;
    } else {
      return [];
    }
  }
  GetPayShopTableList(e) {
    var t = new Array();
    for (const a of this.f2d) {
      if (a.ShopId === e) {
        t.push(a);
      }
    }
    var o = [];
    t.sort((e, t) => e.Sort - t.Sort);
    for (const r of t) {
      if (r.Enable) {
        o.push(r.TabId);
      }
    }
    return o;
  }
  GetPayShopTabDataByPayShopIdAndTabId(e, t) {
    for (const o of this.f2d) {
      if (o.ShopId === e && o.TabId === t) {
        return o;
      }
    }
  }
  GetRecommendData() {
    var e;
    var t = new Array();
    for ([, e] of this.g2d) {
      t.push(e);
    }
    return t;
  }
  GetNeedShowRecommendData() {
    var e;
    var t = new Array();
    for ([, e] of this.g2d) {
      if (e.Show) {
        t.push(e);
      }
    }
    return t;
  }
  GetRecommendDataById(e) {
    return this.g2d.get(e);
  }
  ClearData() {
    this.DFi.clear();
    this.uFi.clear();
  }
}
exports.PayShopModel = PayShopModel;
//# sourceMappingURL=PayShopModel.js.map