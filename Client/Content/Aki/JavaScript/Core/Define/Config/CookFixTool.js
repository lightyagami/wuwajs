"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CookFixTool = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class CookFixTool {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Description() {
    return this.description();
  }
  get Items() {
    return GameUtils_1.GameUtils.ConvertToMap(this.itemsLength(), this.itemsKey, this.itemsValue, this);
  }
  itemsKey(t) {
    return this.items(t)?.key();
  }
  itemsValue(t) {
    return this.items(t)?.value();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsCookFixTool(t, i) {
    return (i || new CookFixTool()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  description(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetItemsAt(t, i) {
    return this.items(t);
  }
  items(t, i) {
    var s = this.J7.__offset(this.z7, 8);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  itemsLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.CookFixTool = CookFixTool;
//# sourceMappingURL=CookFixTool.js.map