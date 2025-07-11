"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShopFlySkinData = undefined;
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
class ShopFlySkinData {
  constructor() {
    this.vFi = undefined;
    this.fNc = undefined;
    this.mNc = undefined;
    this.pyl = new Map();
  }
  static Create(t) {
    var e = new ShopFlySkinData();
    e.InitData(t);
    return e;
  }
  InitData(t) {
    this.vFi = t;
    this.pyl.clear();
    t = ConfigManager_1.ConfigManager.GiftPackageConfig.GetGiftPackageConfig(t.GetPackageRewardId());
    if (t) {
      for (const r of t.Content) {
        var e = r[0];
        if (ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e) === 14) {
          if (ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinConfig(e).SkinType === 0) {
            this.fNc = e;
          } else {
            this.mNc = e;
          }
        } else {
          this.pyl.set(e, r[1]);
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
    return this.fNc;
  }
  GetSoarWingSkinId() {
    return this.fNc;
  }
  GetParaglidingSkinId() {
    return this.mNc;
  }
  GetAllReward() {
    var t = [];
    var e = {
      IncId: 0,
      ItemId: this.GetSoarWingSkinId()
    };
    t.push([e, 1]);
    e = {
      IncId: 0,
      ItemId: this.GetParaglidingSkinId()
    };
    t.push([e, 1]);
    t.push(...this.GetOtherReward());
    return t;
  }
  GetOtherReward() {
    var t;
    var e;
    var r = [];
    for ([t, e] of this.pyl) {
      var i = [{
        IncId: 0,
        ItemId: t
      }, e];
      r.push(i);
    }
    return r;
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
  GetFlySkinData() {
    return ModelManager_1.ModelManager.FlySkinModel.GetFlySkinData(this.GetItemId());
  }
  GetPreviewTextureInPayShop() {
    return this.GetFlySkinData().GetPreviewTextureInPayShop();
  }
  GetPreviewTextureInPop() {
    return this.GetFlySkinData().GetPreviewTextureInPop();
  }
}
exports.ShopFlySkinData = ShopFlySkinData;
//# sourceMappingURL=ShopFlySkinData.js.map