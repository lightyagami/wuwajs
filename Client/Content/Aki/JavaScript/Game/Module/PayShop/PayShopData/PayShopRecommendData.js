"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayShopRecommendData = undefined;
class PayShopRecommendData {
  constructor() {
    this.Id = 0;
    this.RecommendType = 0;
    this.RecommendId = 0;
    this.TabName = "";
    this.PrefabPath = "";
    this.Sort = 0;
    this.Show = true;
  }
  Phrase(s) {
    this.Id = s.s5n;
    this.RecommendType = s.Fkd;
    this.RecommendId = s.Nkd;
    this.TabName = s.Vkd;
    this.PrefabPath = s.jkd;
    this.Sort = s.cBs;
    this.Show = s.mJc;
  }
}
exports.PayShopRecommendData = PayShopRecommendData;
//# sourceMappingURL=PayShopRecommendData.js.map