"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayShopGoods = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class PayShopGoods {
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
  get TabId() {
    return this.tabid();
  }
  get ItemId() {
    return this.itemid();
  }
  get Sort() {
    return this.sort();
  }
  get ItemCount() {
    return this.itemcount();
  }
  get ConditionId() {
    return this.conditionid();
  }
  get BuyConditionId() {
    return this.buyconditionid();
  }
  get BuyLimit() {
    return this.buylimit();
  }
  get SellTimeText() {
    return this.selltimetext();
  }
  get MoneyId() {
    return this.moneyid();
  }
  get Price() {
    return this.price();
  }
  get PromotionPrice() {
    return this.promotionprice();
  }
  get PromotionShow() {
    return this.promotionshow();
  }
  get PromotionTimeText() {
    return this.promotiontimetext();
  }
  get Banner() {
    return this.banner();
  }
  get Enable() {
    return this.enable();
  }
  get Show() {
    return this.show();
  }
  get SoldoutShowInShop() {
    return this.soldoutshowinshop();
  }
  get Tag() {
    return this.tag();
  }
  get ActivityId() {
    return this.activityid();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsPayShopGoods(t, i) {
    return (i || new PayShopGoods()).__init(t.readInt32(t.position()) + t.position(), t);
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
  tabid() {
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
  sort() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 10;
    }
  }
  itemcount() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  conditionid() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  buyconditionid() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  buylimit() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  selltimetext(t) {
    var i = this.J7.__offset(this.z7, 22);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  moneyid() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  price() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  promotionprice() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  promotionshow() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  promotiontimetext(t) {
    var i = this.J7.__offset(this.z7, 32);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  banner(t) {
    var i = this.J7.__offset(this.z7, 34);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  enable() {
    var t = this.J7.__offset(this.z7, 36);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  show() {
    var t = this.J7.__offset(this.z7, 38);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  soldoutshowinshop() {
    var t = this.J7.__offset(this.z7, 40);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  tag() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 44);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.PayShopGoods = PayShopGoods;
//# sourceMappingURL=PayShopGoods.js.map