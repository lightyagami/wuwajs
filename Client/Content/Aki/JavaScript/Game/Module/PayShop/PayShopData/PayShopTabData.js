"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayShopTabData = undefined;
class PayShopTabData {
  constructor() {
    this.ShopId = 0;
    this.TabId = 0;
    this.Sort = 0;
    this.Name = "";
    this.Logic = 0;
    this.Enable = true;
  }
  Phrase(s) {
    this.ShopId = s.tjn;
    this.TabId = s.mBs;
    this.Sort = s.cBs;
    this.Name = s.H8n;
    this.Logic = s.Gkd;
    this.Enable = s.tWn;
  }
}
exports.PayShopTabData = PayShopTabData;
//# sourceMappingURL=PayShopTabData.js.map