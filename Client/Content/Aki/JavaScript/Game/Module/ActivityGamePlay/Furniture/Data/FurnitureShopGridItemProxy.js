"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureShopGridItemProxy = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FurnitureShopItemProxy_1 = require("./FurnitureShopItemProxy");
class FurnitureShopGridItemProxy {
  constructor() {
    this.FurnitureShopItemProxy = new FurnitureShopItemProxy_1.FurnitureShopItemProxy();
    this.AtmosphereText = "";
  }
  UpdateFromPayShopGoods(r) {
    this.FurnitureShopItemProxy.UpdateFromPayShopGoods(r);
    r = ModelManager_1.ModelManager.FurnitureModel.GetFurnitureConfigByGoodsData(r);
    if (r) {
      this.AtmosphereText = r.Atmosphere.toString();
    }
  }
}
exports.FurnitureShopGridItemProxy = FurnitureShopGridItemProxy;
//# sourceMappingURL=FurnitureShopGridItemProxy.js.map