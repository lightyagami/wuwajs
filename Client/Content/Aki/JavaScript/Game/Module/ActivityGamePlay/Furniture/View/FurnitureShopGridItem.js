"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureShopGridItem = undefined;
const UE = require("ue");
const GameplayShopItem_1 = require("../../../PayShop/GameplayShop/ShopItem/GameplayShopItem");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class FurnitureShopGridItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this._yl = undefined;
    this.Pe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText]];
  }
  OnStart() {
    this._yl = new GameplayShopItem_1.GameplayShopItem();
    this._yl.CreateThenShowByActor(this.GetItem(0).GetOwner());
  }
  Refresh(t, e, r) {
    this.Pe = t;
    this._yl.RefreshByData(this.Pe.FurnitureShopItemProxy);
    this.RefreshAtmosphereText();
  }
  RefreshAtmosphereText() {
    this.GetText(2).SetText(this.Pe.AtmosphereText);
  }
}
exports.FurnitureShopGridItem = FurnitureShopGridItem;
//# sourceMappingURL=FurnitureShopGridItem.js.map