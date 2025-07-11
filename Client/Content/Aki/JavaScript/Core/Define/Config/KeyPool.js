"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyPool = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class KeyPool {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ValidKeys() {
    return GameUtils_1.GameUtils.ConvertToArray(this.validkeysLength(), this.validkeys, this);
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsKeyPool(t, s) {
    return (s || new KeyPool()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id(t) {
    var s = this.J7.__offset(this.z7, 4);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  GetValidkeysAt(t) {
    return this.validkeys(t);
  }
  validkeys(t, s) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  validkeysLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.KeyPool = KeyPool;
//# sourceMappingURL=KeyPool.js.map