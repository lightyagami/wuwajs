"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayShopTextData = undefined;
class GameplayShopTextData {
  constructor() {
    this.Content = "";
    this.Data = undefined;
  }
  SetContent(t) {
    this.Content = t;
    this.Data = undefined;
  }
  SetData(t) {
    this.Data = t;
    this.Content = "";
  }
}
exports.GameplayShopTextData = GameplayShopTextData;
//# sourceMappingURL=GameplayShopTextData.js.map