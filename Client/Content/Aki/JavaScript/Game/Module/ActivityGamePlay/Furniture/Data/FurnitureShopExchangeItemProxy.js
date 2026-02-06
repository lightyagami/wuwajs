"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureShopExchangeItemProxy = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CommonGameplayExchangeShopItemProxy_1 = require("../../../PayShop/GameplayShop/Data/CommonGameplayExchangeShopItemProxy");
class FurnitureShopExchangeItemProxy {
  constructor() {
    this.FurnitureShopItemProxy = new CommonGameplayExchangeShopItemProxy_1.CommonGameplayExchangeShopItemProxy();
    this.AtmosphereText = "";
  }
  UpdateFromPayShopGoods(e) {
    this.FurnitureShopItemProxy.UpdateFromPayShopGoods(e);
    e = ModelManager_1.ModelManager.FurnitureModel.GetFurnitureConfigByGoodsData(e);
    if (e) {
      this.AtmosphereText = e.Atmosphere.toString();
    }
  }
}
exports.FurnitureShopExchangeItemProxy = FurnitureShopExchangeItemProxy;
//# sourceMappingURL=FurnitureShopExchangeItemProxy.js.map