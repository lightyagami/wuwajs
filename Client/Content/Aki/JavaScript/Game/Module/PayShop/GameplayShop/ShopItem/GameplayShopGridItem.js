"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayShopGridItem = undefined;
const GameplayShopItem_1 = require("./GameplayShopItem");
class GameplayShopGridItem extends GameplayShopItem_1.GameplayShopItem {
  constructor() {
    super(...arguments);
    this.ScrollViewDelegate = undefined;
    this.GridIndex = 0;
    this.DisplayIndex = 0;
  }
  Refresh(e, t, s) {
    super.RefreshByData(e);
  }
  Clear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, t) {
    return t;
  }
}
exports.GameplayShopGridItem = GameplayShopGridItem;
//# sourceMappingURL=GameplayShopGridItem.js.map