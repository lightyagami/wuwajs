"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonGameplayExchangeShopItemProxy = undefined;
const LanguageSystem_1 = require("../../../../../Core/Common/LanguageSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const AbstractGameplayShopItemProxy_1 = require("./AbstractGameplayShopItemProxy");
class CommonGameplayExchangeShopItemProxy extends AbstractGameplayShopItemProxy_1.AbstractGameplayShopItemProxy {
  constructor() {
    super(...arguments);
    this.GoodsData = undefined;
  }
  UpdateFromPayShopGoods(t) {
    this.GoodsData = t;
    this.UpdateBottomBgVisible();
    this.UpdateRaycastTarget();
    this.UpdateRedDot();
    this.UpdatePriceData();
    this.UpdateItemName();
    this.UpdateQualityData();
    this.UpdateItemIconData();
    this.UpdateSoldOutData();
  }
  UpdateBottomBgVisible() {
    this.BottomBgVisible = false;
  }
  UpdateRaycastTarget() {
    this.RaycastTarget = false;
  }
  UpdateRedDot() {
    this.RedDotVisible = false;
  }
  UpdatePriceData() {
    this.PriceItemVisible = false;
  }
  UpdateItemName() {
    if (this.GoodsData) {
      this.ItemNameTextData.SetContent(this.GoodsData.GetGoodsData().GetGoodsName(LanguageSystem_1.LanguageSystem.PackageLanguage));
    }
  }
  UpdateQualityData() {
    var t;
    if (this.GoodsData && (t = this.GoodsData.GetItemData())) {
      t = ModelManager_1.ModelManager.PayShopModel.GetPayShopItemQualitySpriteByItemIdAndQuality(t.ItemId, t.Quality);
      this.QualitySpritePath = t;
    }
  }
  UpdateItemIconData() {
    if (this.GoodsData) {
      this.ItemId = this.GoodsData.GetGoodsData().ItemId;
    }
  }
  UpdateSoldOutData() {
    if (this.GoodsData && (this.SoldOutItemVisible = this.GoodsData.IsLimitGoods() && this.GoodsData.IsSoldOut(), this.SoldOutItemVisible)) {
      this.SoldOutTextData.SetContent(this.GoodsData.GetDownTipsText());
    }
  }
}
exports.CommonGameplayExchangeShopItemProxy = CommonGameplayExchangeShopItemProxy;
//# sourceMappingURL=CommonGameplayExchangeShopItemProxy.js.map