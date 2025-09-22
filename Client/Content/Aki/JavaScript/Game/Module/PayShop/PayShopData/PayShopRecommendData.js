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
    this.RecommendType = s.wUd;
    this.RecommendId = s.LUd;
    this.TabName = s.PUd;
    this.PrefabPath = s.AUd;
    this.Sort = s.cBs;
    this.Show = s.mJc;
  }
}
exports.PayShopRecommendData = PayShopRecommendData;
//# sourceMappingURL=PayShopRecommendData.js.map