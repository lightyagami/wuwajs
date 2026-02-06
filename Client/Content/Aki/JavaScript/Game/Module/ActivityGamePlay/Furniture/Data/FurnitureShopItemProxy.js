"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureShopItemProxy = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const CommonGameplayShopItemProxy_1 = require("../../../PayShop/GameplayShop/Data/CommonGameplayShopItemProxy");
const FurnitureShopExchangePopViewProxy_1 = require("./FurnitureShopExchangePopViewProxy");
class FurnitureShopItemProxy extends CommonGameplayShopItemProxy_1.CommonGameplayShopItemProxy {
  UpdateLeftTime() {
    this.LeftTimeItemVisible = false;
  }
  UpdateBuyLimitCountText() {
    this.BuyLimitCountTextVisible = false;
  }
  UpdateRedDot() {
    if (this.GoodsData) {
      this.RedDotVisible = ModelManager_1.ModelManager.FurnitureModel.CheckFurnitureShopItemRedDotByData(this.GoodsData);
    }
  }
  OnBuyButtonClick() {
    var e;
    if (this.GoodsData) {
      (e = new FurnitureShopExchangePopViewProxy_1.FurnitureShopExchangePopViewProxy()).UpdateFromPayShopGoods(this.GoodsData);
      UiManager_1.UiManager.OpenView("GameplayExchangePopView", e);
    }
  }
}
exports.FurnitureShopItemProxy = FurnitureShopItemProxy;
//# sourceMappingURL=FurnitureShopItemProxy.js.map