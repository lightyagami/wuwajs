"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchRarityData = undefined;
const GOLD_RARITY_ID = 4;
class FloroRanchRarityData {
  constructor(t) {
    this.Lo = undefined;
    this.Lo = t;
  }
  GetRarityName() {
    return this.Lo.Name;
  }
  GetRarityColor() {
    return this.Lo.Color;
  }
  GetRarityDetailCardBigBg() {
    return this.Lo.DetailCardBigBg;
  }
  GetRarityDetailCardSmallBg() {
    return this.Lo.DetailCardSmallBg;
  }
  GetRaritySmallBg() {
    return this.Lo.SmallCardBg;
  }
  GetRarityShopItemBg() {
    return this.Lo.ShopCardBg;
  }
  GetSelectTexture() {
    return this.Lo.SelectTexture;
  }
  IsGoldRarity() {
    return this.Lo.Id === GOLD_RARITY_ID;
  }
}
exports.FloroRanchRarityData = FloroRanchRarityData;
//# sourceMappingURL=FloroRanchRarityData.js.map