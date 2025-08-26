"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PowerModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ItemInfoById_1 = require("../../../Core/Define/ConfigQuery/ItemInfoById");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const ItemDefines_1 = require("../Item/Data/ItemDefines");
const PowerData_1 = require("./PowerData");
const PowerDefines_1 = require("./PowerDefines");
const OVERPOWERSHOPID = 17;
class PowerModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.VXs = new Map();
    this.CurrentNeedPower = 0;
    this.PowerItemKeyArray = new Array(ItemDefines_1.EItemId.Power, ItemDefines_1.EItemId.OverPower);
    this.HXs = new Map();
    this.roo = undefined;
    this.v_l = true;
  }
  get PowerItemInfoList() {
    if (this.roo === undefined) {
      this.roo = [];
      var e = ConfigManager_1.ConfigManager.PowerConfig.GetConfSortRule();
      var r = new Array();
      for (const f of e.keys()) {
        var t = ItemInfoById_1.configItemInfoById.GetConfig(f);
        if (t) {
          r.push(t);
        }
      }
      for (const h of r) {
        var o = new PowerDefines_1.PowerItemInfo(h.Id);
        o.ItemName = h.Name;
        o.IsHideWhenZero = Boolean(e.get(o.ItemId));
        this.roo.push(o);
      }
      const a = Array.from(e.keys());
      this.roo.sort((e, r) => {
        return a.indexOf(e.ItemId) - a.indexOf(r.ItemId);
      });
    }
    for (const I of this.roo) {
      var n;
      var i = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(I.ItemId);
      I.StackValue = i || 0;
      var i = this.Eoo(I.ShopId);
      if (i.findIndex((e, r, t) => !e.IsSoldOut() && e.Price.has(I.ItemId)) === -1) {
        n = i[i.length - 1];
        I.RenewValue = I.ItemId === ItemDefines_1.EItemId.OverPower ? 0 : n.StackSize ?? 0;
        I.CostValue = n.GetPrice(I.ItemId);
        I.GoodsId = n.Id;
        I.RemainCount = I.ItemId === ItemDefines_1.EItemId.OverPower ? I.StackValue : 0;
      }
      n = i.findIndex((e, r, t) => e.IsUnlocked() && !e.IsSoldOut() && e.Price.has(I.ItemId));
      var s = i[n];
      if (s) {
        I.RenewValue = I.ItemId === ItemDefines_1.EItemId.OverPower ? 0 : s.StackSize ?? 0;
        I.CostValue = s.GetPrice(I.ItemId);
        I.GoodsId = s.Id;
        s = s.BuyLimit < 0 ? s.BuyLimit : i.length - n;
        I.RemainCount = s;
      }
    }
    return this.roo;
  }
  GetPowerItemInfos(e) {
    for (const r of this.PowerItemInfoList) {
      if (r.ItemId === e) {
        return r;
      }
    }
  }
  get NeedUpdateCountDown() {
    return this.GetPowerDataById(ItemDefines_1.EItemId.Power).GetNeedUpdateFlag();
  }
  get PowerCount() {
    return this.GetPowerDataById(ItemDefines_1.EItemId.Power).GetCurrentPower();
  }
  get PowerWithConvertedCount() {
    var e = this.GetPowerDataById(ItemDefines_1.EItemId.Power);
    var r = this.GetPowerDataById(ItemDefines_1.EItemId.OverPower);
    return e.GetCurrentPower() + r.GetCurrentPower();
  }
  OnInit() {
    this.VXs.set(10800, ItemDefines_1.EItemId.Power);
    this.VXs.set(ItemDefines_1.EItemId.OverPower, ItemDefines_1.EItemId.OverPower);
    return this.v_l = true;
  }
  OnClear() {
    return !(this.v_l = false);
  }
  UpdatePowerRenewTimer() {
    for (var [, e] of this.HXs) {
      e.CheckPowerUpdate();
    }
  }
  UpdatePowerData(e) {
    if (e) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PowerModule", 27, "当前体力数据", ["data", e]);
      }
      for (const r of e) {
        this.RefreshPowerInfos(r);
      }
    }
  }
  RefreshPowerInfos(e) {
    var r;
    if (e) {
      r = e.s5n;
      this.GetPowerDataById(r).Phrase(r, e.UPs, e.wPs);
    }
  }
  CheckItemIfPowerItem(e) {
    return this.PowerItemKeyArray.includes(e);
  }
  GetPowerDataById(e) {
    let r = e;
    if (this.VXs.has(e)) {
      r = this.VXs.get(e);
    }
    let t = this.HXs.get(r);
    if (!t) {
      t = new (e === ItemDefines_1.EItemId.OverPower ? PowerData_1.OverPowerData : PowerData_1.PowerData)();
      this.HXs.set(r, t);
    }
    return t;
  }
  Eoo(e) {
    e = ModelManager_1.ModelManager.ShopModel.GetShopItemList(e);
    if (e && e.length !== 0) {
      e.sort((e, r) => e.Id - r.Id);
      return e;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PowerModule", 49, "体力系统获取商店数据失败");
      }
      return [];
    }
  }
  IsPowerEnough(e) {
    return !e || this.PowerCount >= e;
  }
  IsPowerWithConvertedEnough(e) {
    return !e || this.PowerWithConvertedCount >= e;
  }
  GetCurrentNeedPower(e) {
    if (!this.IsPowerEnough(e) && e) {
      return e - this.PowerCount;
    } else {
      return 0;
    }
  }
  GetOverPowerShopConfig() {
    return ConfigManager_1.ConfigManager.ShopConfig.GetShopFixedInfoByItemId(PowerDefines_1.EPowerShopType.BuyWithItem, OVERPOWERSHOPID);
  }
  GetCanShowPowerTip() {
    return this.v_l;
  }
  SetCanShowPowerTip(e) {
    this.v_l = e;
  }
}
exports.PowerModel = PowerModel;
//# sourceMappingURL=PowerModel.js.map