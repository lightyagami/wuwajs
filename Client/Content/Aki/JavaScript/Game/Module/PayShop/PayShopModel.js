"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayShopModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const PayShopGoods_1 = require("./PayShopData/PayShopGoods");
const PayShopGoodsData_1 = require("./PayShopData/PayShopGoodsData");
const PayShopDefine_1 = require("./PayShopDefine");
const DEFAULTTAB = 1;
class PayShopModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.DFi = new Map();
    this.RFi = new Map();
    this.uFi = new Map();
    this.UFi = "";
    this.AFi = 0;
    this.PFi = false;
    this.xFi = new Array();
    this.L4a = (e, t) => e.GetGoodsData().GetSortValue() !== t.GetGoodsData().GetSortValue() ? e.GetGoodsData().GetSortValue() - t.GetGoodsData().GetSortValue() : e.GetGoodsId() - t.GetGoodsId();
    this.A4a = (e, t) => e.GetItemData().Quality !== t.GetItemData().Quality ? t.GetItemData().Quality - e.GetItemData().Quality : e.GetGoodsData().GetSortValue() !== t.GetGoodsData().GetSortValue() ? e.GetGoodsData().GetSortValue() - t.GetGoodsData().GetSortValue() : e.GetGoodsId() - t.GetGoodsId();
    this.Qjs = (e, t) => {
      var o;
      var r;
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
        r = t.GetItemData();
        if (o.Quality !== r.Quality) {
          return r.Quality - o.Quality;
        } else if (e.GetGoodsData().GetSortValue() !== t.GetGoodsData().GetSortValue()) {
          return e.GetGoodsData().GetSortValue() - t.GetGoodsData().GetSortValue();
        } else {
          return e.GetGoodsId() - t.GetGoodsId();
        }
      }
    };
    this.wFi = (e, t) => {
      var o;
      var r;
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
        r = t.GetItemData();
        if (o.Quality !== r.Quality) {
          return r.Quality - o.Quality;
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
        t = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(o);
        return ConfigManager_1.ConfigManager.DynamicTabConfig.GetTabViewConfById(t.DynamicTabId);
      }
    }
  }
  SetPayShopInfoList(e) {
    for (const t of e) {
      this.BFi(t);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshAllPayShop, Array.from(this.DFi.keys()));
  }
  SetPayShopInfo(e) {
    this.BFi(e);
    this.AFi = e.s5n;
  }
  SetPayShopGoodsList(e) {
    var t;
    var o;
    var r = new Set();
    for (const a of e) {
      let e = this.uFi.get(a.s5n);
      if (e) {
        this.RefreshPayShopGoods(a);
      } else {
        t = a.tjn;
        (o = this.DFi.get(t) ?? new Set()).add(a.s5n);
        this.DFi.set(t, o);
        e = this.qFi(a, t);
      }
      r.add(e.GetTabId());
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshGoodsList, r);
  }
  BFi(e) {
    var t = e.s5n;
    var o = e.bMs;
    var r = new Set();
    for (const a of o) {
      r.add(a.s5n);
      this.qFi(a, t);
    }
    this.DFi.set(t, r);
    this.RFi.set(t, MathUtils_1.MathUtils.LongToBigInt(e.Lxs));
    this.PFi = true;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Shop", 10, "PayShop:Root 刷新商城数据", ["ShopId", t], ["goodsLength", r.size]);
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
    for (const r of e) {
      var o = this.uFi.get(r);
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
        if (ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(t).Enable) {
          this.xFi.push(t);
        }
      });
      return this.xFi.sort((e, t) => {
        var o = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(e);
        var r = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(t);
        if (o.Sort !== r.Sort) {
          return o.Sort - r.Sort;
        } else {
          return e - t;
        }
      });
    } else {
      return this.xFi;
    }
  }
  GetPayShopTabIdList(a, e = true) {
    var t = new Set();
    if (a === 1) {
      for (const i of ConfigManager_1.ConfigManager.PayShopConfig.GetNeedShowRecommendData()) {
        if (!t.has(i.Id)) {
          t.add(i.Id);
        }
      }
    } else {
      for (const s of this.DFi.get(a)) {
        var o = this.uFi.get(s);
        var r = o.GetTabId();
        if ((a !== 3 || !PayShopDefine_1.giftBagShopSpecialTabList.includes(r) || !!o.CheckGoodIfShow()) && !t.has(o.GetTabId())) {
          t.add(o.GetTabId());
        }
      }
    }
    if (a === 3) {
      for (const h of ModelManager_1.ModelManager.PayGiftModel.GetTabList()) {
        t.add(h);
      }
    }
    var n = Array.from(t);
    if (e) {
      n.sort((e, t) => {
        var o = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopTabConfig(a, e);
        var r = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopTabConfig(a, t);
        if (o.Sort !== r.Sort) {
          return o.Sort - r.Sort;
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
    let r = 0;
    for (const i of t) {
      var a;
      var n = this.uFi.get(i).GetTabId();
      if (o === 0 && r === 0) {
        o = n;
        r = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopTabConfig(e, o).Sort;
      } else {
        a = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopTabConfig(e, n).Sort;
        if (r > a || r === a && o > n) {
          o = n;
          r = a;
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
  NFi(e, t = 1) {
    var o = [];
    if (this.GFi(e, t)) {
      for (const a of ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsList()) {
        if (a.GetGetPayGiftData().ShowInShop() && a.GetGetPayGiftData().CanShowInShopTab()) {
          o.push(a);
        }
      }
    } else if (this.aUl(e)) {
      for (const n of ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsList()) {
        if (n.GetTabId() === t && (n.GetGetPayGiftData().ShowInSkinShop() || n.GetGetPayGiftData().ShowInFlySkinShop()) && n.GetGetPayGiftData().CanShowInShopTab()) {
          o.push(n);
        }
      }
    }
    e = this.DFi.get(e);
    if (e) {
      for (const i of e) {
        var r = this.uFi.get(i);
        o.push(r);
      }
    }
    return o;
  }
  GetGoodsInTab(e, t) {
    var o = [];
    for (const a of this.DFi.get(e)) {
      var r = this.uFi.get(a);
      o.push(r);
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
    var r = [];
    for (const a of this.NFi(e, t)) {
      if (a.GetTabId() === t && a.CheckGoodIfShow()) {
        r.push(a);
      }
    }
    if (o) {
      return this.R4a(e, r);
    } else {
      return r;
    }
  }
  R4a(e, t) {
    if (ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(e).SortRule === 1) {
      var o = [];
      var r = [];
      var a = [];
      for (const n of t) {
        (n.IsSoldOut() ? a : n.IfCanBuy() ? o : r).push(n);
      }
      o.sort(this.A4a);
      r.sort(this.L4a);
      a.sort(this.A4a);
      return o.concat(r).concat(a);
    }
    e = this.$js(e);
    return t.sort(e);
  }
  $js(e) {
    if (ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(e).SortRule !== 1) {
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
    var e = this.RFi.get(e);
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
    e = this.RFi.get(e);
    if (e) {
      return Number(e);
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
    for (const o of this.NFi(e)) {
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
    for (const o of this.GetPayShopTabData(e, t, false)) {
      if (o.GetIfNeedRemind()) {
        return true;
      }
    }
    return false;
  }
  Hzl(e, t = 1) {
    return !!this.GetPayShopTabIdList(e, false).includes(t) && ConfigManager_1.ConfigManager.PayShopConfig.GetRecommendDataById(t).RecommendType === 1 && ModelManager_1.ModelManager.MonthCardModel.GetPayButtonRedDotState();
  }
  ReadShopItemCheckFlag(e, t = 1) {
    let o = [];
    let r = false;
    for (const a of o = this.GFi(e, t) ? ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsList() : this.GetPayShopTabData(e, t, false)) {
      if (!a.IsSoldOut() && !a.IsLocked() && !!a.IfCanBuy() && !ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.PayShopTabItemChecked, a.GetGoodsId())) {
        ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.PayShopTabItemChecked, a.GetGoodsId());
        r = true;
      }
    }
    if (r) {
      ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(LocalStorageDefine_1.ELocalStoragePlayerKey.PayShopTabItemChecked);
    }
    return r;
  }
  CheckShopItemCheckFlag(e, t = 1) {
    let o = [];
    for (const r of o = this.GFi(e, t) ? ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsList() : this.GetPayShopTabData(e, t, false)) {
      if (!r.IsSoldOut() && !r.IsLocked() && r.IfCanBuy()) {
        if (!ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.PayShopTabItemChecked, r.GetGoodsId())) {
          return true;
        }
      }
    }
    return false;
  }
  GetPayShopItemQualitySpriteByItemIdAndQuality(e, t) {
    return (ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e) === 13 ? ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityById(t) : ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(t)).PayShopQualitySprite;
  }
  ClearData() {
    this.DFi.clear();
    this.uFi.clear();
    this.RFi.clear();
  }
}
exports.PayShopModel = PayShopModel;
//# sourceMappingURL=PayShopModel.js.map