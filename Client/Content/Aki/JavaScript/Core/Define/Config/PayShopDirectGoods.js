"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayShopDirectGoods = undefined;
class PayShopDirectGoods {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get GoodsId() {
    return this.goodsid();
  }
  get PayId() {
    return this.payid();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsPayShopDirectGoods(t, s) {
    return (s || new PayShopDirectGoods()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  goodsid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  payid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.PayShopDirectGoods = PayShopDirectGoods;
//# sourceMappingURL=PayShopDirectGoods.js.map