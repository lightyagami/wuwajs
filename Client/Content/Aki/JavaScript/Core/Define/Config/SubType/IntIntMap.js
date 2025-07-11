"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IntIntMap = undefined;
const GameUtils_1 = require("../../../../Game/GameUtils");
const DicIntInt_1 = require("./DicIntInt");
class IntIntMap {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get MapIntInt() {
    return GameUtils_1.GameUtils.ConvertToMap(this.mapintintLength(), this.mapintintKey, this.mapintintValue, this);
  }
  mapintintKey(t) {
    return this.mapintint(t)?.key();
  }
  mapintintValue(t) {
    return this.mapintint(t)?.value();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsIntIntMap(t, i) {
    return (i || new IntIntMap()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  GetMapintintAt(t, i) {
    return this.mapintint(t);
  }
  mapintint(t, i) {
    var n = this.J7.__offset(this.z7, 4);
    if (n) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + n) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  mapintintLength() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.IntIntMap = IntIntMap;
//# sourceMappingURL=IntIntMap.js.map