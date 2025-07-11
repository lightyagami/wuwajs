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
    this.L4a = (e, o) => e.GetGoodsData().GetSortValue() !== o.GetGoodsData().GetSortValue() ? e.GetGoodsData().GetSortValue() - o.GetGoodsData().GetSortValue() : e.GetGoodsId() - o.GetGoodsId();
    this.A4a = (e, o) => e.GetItemData().Quality !== o.GetItemData().Quality ? o.GetItemData().Quality - e.GetItemData().Quality : e.GetGoodsData().GetSortValue() !== o.GetGoodsData().GetSortValue() ? e.GetGoodsData().GetSortValue() - o.GetGoodsData().GetSortValue() : e.GetGoodsId() - o.GetGoodsId();
    this.Qjs = (e, o) => {
      var t;
      var r;
      if (e.IsSoldOut() !== o.IsSoldOut()) {
        if (e.IsSoldOut()) {
          return 1;
        } else {
          return -1;
        }
      } else if (e.IfCanBuy() !== o.IfCanBuy()) {
        if (e.IfCanBuy()) {
          return -1;
        } else {
          return 1;
        }
      } else {
        t = e.GetItemData();
        r = o.GetItemData();
        if (t.Quality !== r.Quality) {
          return r.Quality - t.Quality;
        } else if (e.GetGoodsData().GetSortValue() !== o.GetGoodsData().GetSortValue()) {
          return e.GetGoodsData().GetSortValue() - o.GetGoodsData().GetSortValue();
        } else {
          return e.GetGoodsId() - o.GetGoodsId();
        }
      }
    };
    this.wFi = (e, o) => {
      var t;
      var r;
      if (e.IsSoldOut() !== o.IsSoldOut()) {
        if (e.IsSoldOut()) {
          return 1;
        } else {
          return -1;
        }
      } else if (e.IsLocked() !== o.IsLocked()) {
        if (e.IsLocked()) {
          return 1;
        } else {
          return -1;
        }
      } else if (e.GetGoodsData().GetSortValue() !== o.GetGoodsData().GetSortValue()) {
        return e.GetGoodsData().GetSortValue() - o.GetGoodsData().GetSortValue();
      } else {
        t = e.GetItemData();
        r = o.GetItemData();
        if (t.Quality !== r.Quality) {
          return r.Quality - t.Quality;
        } else {
          return e.GetGoodsId() - o.GetGoodsId();
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
    var o;
    for (const t of this.GetPayShopIdList()) {
      if (t === e) {
        o = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(t);
        return ConfigManager_1.ConfigManager.DynamicTabConfig.GetTabViewConfById(o.DynamicTabId);
      }
    }
  }
  SetPayShopInfoList(e) {
    for (const o of e) {
      this.BFi(o);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshAllPayShop, Array.from(this.DFi.keys()));
  }
  SetPayShopInfo(e) {
    this.BFi(e);
    this.AFi = e.s5n;
  }
  SetPayShopGoodsList(e) {
    var o;
    var t;
    var r = new Set();
    for (const a of e) {
      let e = this.uFi.get(a.s5n);
      if (e) {
        this.RefreshPayShopGoods(a);
      } else {
        o = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(a.s5n).ShopId;
        (t = this.DFi.get(o) ?? new Set()).add(a.s5n);
        this.DFi.set(o, t);
        e = this.qFi(a, o);
      }
      r.add(e.GetTabId());
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshGoodsList, r);
  }
  BFi(e) {
    var o = e.s5n;
    var t = e.bMs;
    var r = new Set();
    for (const a of t) {
      r.add(a.s5n);
      this.qFi(a, o);
    }
    this.DFi.set(o, r);
    this.RFi.set(o, MathUtils_1.MathUtils.LongToBigInt(e.Lxs));
    this.PFi = true;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Shop", 10, "PayShop:Root 刷新商城数据", ["ShopId", o], ["goodsLength", r.size]);
    }
  }
  RefreshPayShopGoods(e) {
    var o = new PayShopGoodsData_1.PayShopGoodsData();
    o.Phrase(e);
    this.uFi.get(e.s5n).SetGoodsData(o);
  }
  qFi(e, o) {
    var t = new PayShopGoodsData_1.PayShopGoodsData();
    t.Phrase(e);
    var e = new PayShopGoods_1.PayShopGoods(o);
    e.SetGoodsData(t);
    this.uFi.set(t.Id, e);
    return e;
  }
  UnLockPayShopGoods(e) {
    var o = new Map();
    for (const r of e) {
      var t = this.uFi.get(r);
      t.SetUnLock();
      let e = o.get(t.PayShopId);
      (e = e || new Set()).add(t.GetTabId());
      o.set(t.PayShopId, e);
    }
    this.PFi = true;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UnLockGoods, o);
  }
  GetPayShopIdList() {
    if (this.PFi) {
      this.PFi = false;
      this.xFi = [];
      this.DFi.forEach((e, o) => {
        if (ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(o).Enable) {
          this.xFi.push(o);
        }
      });
      return this.xFi.sort((e, o) => {
        var t = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(e);
        var r = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(o);
        if (t.Sort !== r.Sort) {
          return t.Sort - r.Sort;
        } else {
          return e - o;
        }
      });
    } else {
      return this.xFi;
    }
  }
  GetPayShopTabIdList(a, e = true) {
    var o = new Set();
    if (a === 1) {
      for (const i of ConfigManager_1.ConfigManager.PayShopConfig.GetNeedShowRecommendData()) {
        if (!o.has(i.Id)) {
          o.add(i.Id);
        }
      }
    } else {
      for (const s of this.DFi.get(a)) {
        var t = this.uFi.get(s);
        var r = t.GetTabId();
        if ((a !== 3 || !PayShopDefine_1.giftBagShopSpecialTabList.includes(r) || !!t.CheckGoodIfShow()) && !o.has(t.GetTabId())) {
          o.add(t.GetTabId());
        }
      }
    }
    if (a === 3) {
      for (const h of ModelManager_1.ModelManager.PayGiftModel.GetTabList()) {
        o.add(h);
      }
    }
    var n = Array.from(o);
    if (e) {
      n.sort((e, o) => {
        var t = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopTabConfig(a, e);
        var r = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopTabConfig(a, o);
        if (t.Sort !== r.Sort) {
          return t.Sort - r.Sort;
        } else {
          return e - o;
        }
      });
    }
    return n;
  }
  GetPayShopFirstTabId(e) {
    var o = this.DFi.get(e);
    if (!o) {
      return 0;
    }
    let t = 0;
    let r = 0;
    for (const i of o) {
      var a;
      var n = this.uFi.get(i).GetTabId();
      if (t === 0 && r === 0) {
        t = n;
        r = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopTabConfig(e, t).Sort;
      } else {
        a = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopTabConfig(e, n).Sort;
        if (r > a || r === a && t > n) {
          t = n;
          r = a;
        }
      }
    }
    return t;
  }
  GFi(e, o = 1) {
    return e === 3 && (o === DEFAULTTAB || o === PayShopDefine_1.CARNIVAL_TABID);
  }
  aUl(e) {
    return e === 6;
  }
  NFi(e, o = 1) {
    var t = [];
    if (this.GFi(e, o)) {
      for (const a of ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsList()) {
        if (a.GetGetPayGiftData().ShowInShop() && a.GetGetPayGiftData().CanShowInShopTab()) {
          t.push(a);
        }
      }
    } else if (this.aUl(e)) {
      for (const n of ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsList()) {
        if (n.GetTabId() === o && (n.GetGetPayGiftData().ShowInSkinShop() || n.GetGetPayGiftData().ShowInFlySkinShop()) && n.GetGetPayGiftData().CanShowInShopTab()) {
          t.push(n);
        }
      }
    }
    e = this.DFi.get(e);
    if (e) {
      for (const i of e) {
        var r = this.uFi.get(i);
        t.push(r);
      }
    }
    return t;
  }
  GetGoodsInTab(e, o) {
    var t = [];
    for (const a of this.DFi.get(e)) {
      var r = this.uFi.get(a);
      t.push(r);
    }
    for (const n of t) {
      if (n.GetItemData().ItemId === o) {
        if (n.CheckGoodIfShow()) {
          return n;
        }
      }
    }
  }
  GetPayShopTabData(e, o = 1, t = true) {
    if (e === -1 || e === 0) {
      return [];
    }
    var r = [];
    for (const a of this.NFi(e, o)) {
      if (a.GetTabId() === o && a.CheckGoodIfShow()) {
        r.push(a);
      }
    }
    if (t) {
      return this.R4a(e, r);
    } else {
      return r;
    }
  }
  R4a(e, o) {
    if (ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(e).SortRule === 1) {
      var t = [];
      var r = [];
      var a = [];
      for (const n of o) {
        (n.IsSoldOut() ? a : n.IfCanBuy() ? t : r).push(n);
      }
      t.sort(this.A4a);
      r.sort(this.L4a);
      a.sort(this.A4a);
      return t.concat(r).concat(a);
    }
    e = this.$js(e);
    return o.sort(e);
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
    var o;
    var e = this.RFi.get(e);
    if (e !== undefined && !(e <= 0)) {
      e = Number(e);
      o = PayShopGoods_1.PayShopGoods.GetTimeTypeData(e);
      e = e - Math.ceil(TimeUtil_1.TimeUtil.GetServerTime());
      if (o[0] === 0) {
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
  UpdatePayShopGoodsCount(e, o) {
    var t = this.uFi.get(e);
    if (t.IsLimitGoods() && (t.AddBoughtCount(o), t.IsSoldOut())) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GoodsSoldOut, e);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshGoods, e, t.PayShopId, t.GetTabId());
  }
  GetNeedCheckGoods(e) {
    var o = [];
    for (const t of this.NFi(e)) {
      if (t.IsShowInShop() && (t.InUpdateTime() || t.InUnPermanentSellTime() || t.WillSell())) {
        o.push(t);
      }
    }
    return o;
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
    for (const o of this.GetPayShopTabIdList(e, false)) {
      if (this.CheckPayShopTabHasRedDot(e, o) && PayShopDefine_1.payShopViewTabType.includes(e)) {
        return true;
      }
    }
    return false;
  }
  CheckPayShopTabHasRedDot(e, o = 1) {
    if (e === 1) {
      return this.Hzl(e, o);
    }
    for (const t of this.GetPayShopTabData(e, o, false)) {
      if (t.GetIfNeedRemind()) {
        return true;
      }
    }
    return false;
  }
  Hzl(e, o = 1) {
    return !!this.GetPayShopTabIdList(e, false).includes(o) && ConfigManager_1.ConfigManager.PayShopConfig.GetRecommendDataById(o).RecommendType === 1 && ModelManager_1.ModelManager.MonthCardModel.GetPayButtonRedDotState();
  }
  ReadShopItemCheckFlag(e, o = 1) {
    let t = [];
    let r = false;
    for (const a of t = this.GFi(e, o) ? ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsList() : this.GetPayShopTabData(e, o, false)) {
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
  CheckShopItemCheckFlag(e, o = 1) {
    let t = [];
    for (const r of t = this.GFi(e, o) ? ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsList() : this.GetPayShopTabData(e, o, false)) {
      if (!r.IsSoldOut() && !r.IsLocked() && r.IfCanBuy()) {
        if (!ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.PayShopTabItemChecked, r.GetGoodsId())) {
          return true;
        }
      }
    }
    return false;
  }
  GetPayShopItemQualitySpriteByItemIdAndQuality(e, o) {
    return (ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e) === 13 ? ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityById(o) : ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(o)).PayShopQualitySprite;
  }
  ClearData() {
    this.DFi.clear();
    this.uFi.clear();
    this.RFi.clear();
  }
}
exports.PayShopModel = PayShopModel;
//# sourceMappingURL=PayShopModel.js.map