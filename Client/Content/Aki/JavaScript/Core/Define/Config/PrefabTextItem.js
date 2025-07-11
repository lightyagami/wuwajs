"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrefabTextItem = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class PrefabTextItem {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ItemId() {
    return this.itemid();
  }
  get PrefabPathHash() {
    return this.prefabpathhash();
  }
  get ItemPath() {
    return this.itempath();
  }
  get Text() {
    return this.text();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsPrefabTextItem(t, e) {
    return (e || new PrefabTextItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  itemid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt64(this.z7 + t);
    } else {
      return BigInt("0");
    }
  }
  prefabpathhash() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt64(this.z7 + t);
    } else {
      return BigInt("0");
    }
  }
  itempath(t) {
    var e = this.J7.__offset(this.z7, 8);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  text(t) {
    var e = this.J7.__offset(this.z7, 10);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.PrefabTextItem = PrefabTextItem;
//# sourceMappingURL=PrefabTextItem.js.map