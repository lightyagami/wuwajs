"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureExchangeShopItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GameplayShopItem_1 = require("../../../PayShop/GameplayShop/ShopItem/GameplayShopItem");
const FurnitureShopExchangeItemProxy_1 = require("../Data/FurnitureShopExchangeItemProxy");
class FurnitureExchangeShopItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.GDg = new FurnitureShopExchangeItemProxy_1.FurnitureShopExchangeItemProxy();
    this._yl = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText]];
  }
  OnStart() {
    this._yl = new GameplayShopItem_1.GameplayShopItem();
    this._yl.CreateThenShowByActor(this.GetItem(0).GetOwner());
  }
  RefreshByData(e) {
    this.GDg = e;
    this._yl.RefreshByData(this.GDg.FurnitureShopItemProxy);
    this.RefreshAtmosphereText();
  }
  RefreshAtmosphereText() {
    this.GetText(2).SetText(this.GDg.AtmosphereText);
  }
}
exports.FurnitureExchangeShopItem = FurnitureExchangeShopItem;
//# sourceMappingURL=FurnitureExchangeShopItem.js.map