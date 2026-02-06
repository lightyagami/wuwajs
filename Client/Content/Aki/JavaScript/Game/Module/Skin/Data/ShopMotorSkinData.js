"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShopMotorSkinData = undefined;
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const MotorSkinData_1 = require("./MotorSkinData");
class ShopMotorSkinData {
  constructor() {
    this.vFi = undefined;
    this.q7f = new Map();
    this.O7f = 0;
    this.G7f = undefined;
  }
  static Create(t) {
    var r = new ShopMotorSkinData();
    r.InitData(t);
    return r;
  }
  InitData(t) {
    this.vFi = t;
    this.q7f.clear();
    var r = ConfigManager_1.ConfigManager.GiftPackageConfig.GetGiftPackageConfig(t.GetPackageRewardId());
    if (r) {
      this.O7f = t.GetPackageRewardId();
      var e = ConfigManager_1.ConfigManager.SkinConfig.GetMotorSkinShowConfig(this.O7f);
      if (e) {
        for (const a of r.Content) {
          var i = a[0];
          if (i === e.FreeItem) {
            this.G7f = {
              ItemId: i,
              Count: a[1]
            };
          } else {
            this.q7f.set(i, a[1]);
          }
        }
      }
    }
  }
  GetIfCanBuy() {
    return !!this.GetPayShopGoods().IfCanBuy() && (!this.GetPayShopGoods().GetGoodsData()?.HasBuyLimit() || this.GetPayShopGoods().GetGoodsData()?.GetRemainingCount() !== 0);
  }
  GetCurrentGoodsData() {
    return this.vFi;
  }
  GetItemId() {
    return this.vFi.GetPackageRewardId();
  }
  GetAllReward() {
    var t = [];
    t.push(...this.GetMainReward());
    if (this.G7f) {
      t.push([{
        ItemId: this.G7f.ItemId,
        IncId: 0
      }, this.G7f.Count]);
    }
    return t;
  }
  GetMainReward() {
    var t;
    var r;
    var e = [];
    for ([t, r] of this.q7f) {
      var i = [{
        IncId: 0,
        ItemId: t
      }, r];
      e.push(i);
    }
    return e;
  }
  GetOtherReward() {
    if (this.G7f) {
      return [{
        ItemId: this.G7f.ItemId,
        IncId: 0
      }, this.G7f.Count];
    }
  }
  GetPayShopGoods() {
    return this.vFi;
  }
  GetDiscountText() {
    var t = this.GetCurrentGoodsData();
    if (t.HasDiscount() && (t = t.GetDiscount()) > 0) {
      return StringUtils_1.StringUtils.Format("-{0}%", t.toString());
    } else {
      return "";
    }
  }
  GetDiscountTimeData() {
    var t = this.GetCurrentGoodsData();
    if (t.HasDiscount() && (t = t.GetCountDownData())[0] === 1) {
      return t[1];
    } else {
      return undefined;
    }
  }
  GetPriceData() {
    return this.GetCurrentGoodsData().GetPriceData();
  }
  GetIfDirect() {
    return this.GetCurrentGoodsData().IsDirect();
  }
  GetDirectPriceText() {
    return this.GetCurrentGoodsData().GetDirectPriceText();
  }
  GetMotorSkinData() {
    return new MotorSkinData_1.MotorSkinData(this.O7f);
  }
}
exports.ShopMotorSkinData = ShopMotorSkinData;
//# sourceMappingURL=ShopMotorSkinData.js.map