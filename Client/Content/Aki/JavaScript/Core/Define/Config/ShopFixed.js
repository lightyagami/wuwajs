"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShopFixed = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class ShopFixed {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ShopId() {
    return this.shopid();
  }
  get SortIndex() {
    return this.sortindex();
  }
  get ItemId() {
    return this.itemid();
  }
  get ItemNum() {
    return this.itemnum();
  }
  get CondId() {
    return this.condid();
  }
  get VisableCondition() {
    return this.visablecondition();
  }
  get DisableCondition() {
    return this.disablecondition();
  }
  get LimitNum() {
    return this.limitnum();
  }
  get OriginalPrice() {
    return GameUtils_1.GameUtils.ConvertToMap(this.originalpriceLength(), this.originalpriceKey, this.originalpriceValue, this);
  }
  originalpriceKey(t) {
    return this.originalprice(t)?.key();
  }
  originalpriceValue(t) {
    return this.originalprice(t)?.value();
  }
  get Price() {
    return GameUtils_1.GameUtils.ConvertToMap(this.priceLength(), this.priceKey, this.priceValue, this);
  }
  priceKey(t) {
    return this.price(t)?.key();
  }
  priceValue(t) {
    return this.price(t)?.value();
  }
  get Show() {
    return this.show();
  }
  get Label() {
    return this.label();
  }
  get SwitchText() {
    return this.switchtext();
  }
  get PurchaseText() {
    return this.purchasetext();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsShopFixed(t, i) {
    return (i || new ShopFixed()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  shopid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sortindex() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  itemid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  itemnum() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  condid() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  visablecondition() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  disablecondition() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  limitnum() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return -1;
    }
  }
  GetOriginalpriceAt(t, i) {
    return this.originalprice(t);
  }
  originalprice(t, i) {
    var s = this.J7.__offset(this.z7, 22);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  originalpriceLength() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPriceAt(t, i) {
    return this.price(t);
  }
  price(t, i) {
    var s = this.J7.__offset(this.z7, 24);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  priceLength() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  show() {
    var t = this.J7.__offset(this.z7, 26);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  label(t) {
    var i = this.J7.__offset(this.z7, 28);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  switchtext(t) {
    var i = this.J7.__offset(this.z7, 30);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  purchasetext(t) {
    var i = this.J7.__offset(this.z7, 32);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.ShopFixed = ShopFixed;
//# sourceMappingURL=ShopFixed.js.map