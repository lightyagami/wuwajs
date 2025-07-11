"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayShopTab = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class PayShopTab {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ShopId() {
    return this.shopid();
  }
  get TabId() {
    return this.tabid();
  }
  get Sort() {
    return this.sort();
  }
  get Name() {
    return this.name();
  }
  get Logic() {
    return this.logic();
  }
  get Enable() {
    return this.enable();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsPayShopTab(t, s) {
    return (s || new PayShopTab()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  shopid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  tabid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sort() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var s = this.J7.__offset(this.z7, 10);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  logic() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  enable() {
    var t = this.J7.__offset(this.z7, 14);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
}
exports.PayShopTab = PayShopTab;
//# sourceMappingURL=PayShopTab.js.map