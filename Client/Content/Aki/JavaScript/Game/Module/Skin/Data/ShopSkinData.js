"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShopSkinData = undefined;
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
class ShopSkinData {
  constructor() {
    this.vFi = undefined;
    this.gyl = undefined;
    this.pyl = new Map();
  }
  static Create(t) {
    var e = new ShopSkinData();
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
        if (ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e) === 11) {
          this.gyl = e;
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
    return this.gyl;
  }
  GetAllReward() {
    var t = [];
    var e = {
      IncId: 0,
      ItemId: this.GetItemId()
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
  GetRoleSkinData() {
    return ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(this.GetItemId());
  }
  GetPayShopPreviewRoleTexturePath() {
    return this.GetRoleSkinData().GetPayShopPreviewRoleTexturePath();
  }
  GetPayShopPreviewRoleTextureBgPath() {
    return this.GetRoleSkinData().GetPayShopPreviewRoleTextureBgPath();
  }
  GetPayShopPreviewWeaponTexturePath() {
    return this.GetRoleSkinData().GetPayShopPreviewWeaponTexturePath();
  }
  GetPayShopPreviewBuyRoleTexturePath() {
    return this.GetRoleSkinData().GetPayShopPreviewBuyRoleTexturePath();
  }
  GetPayShopPreviewBuyRoleSuitWeaponTexturePath() {
    return this.GetRoleSkinData().GetPayShopPreviewBuyRoleSuitWeaponTexturePath();
  }
}
exports.ShopSkinData = ShopSkinData;
//# sourceMappingURL=ShopSkinData.js.map