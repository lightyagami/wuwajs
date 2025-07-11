"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuffItem = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class BuffItem {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get PublicCdGroup() {
    return this.publiccdgroup();
  }
  get Buffs() {
    return GameUtils_1.GameUtils.ConvertToArray(this.buffsLength(), this.buffs, this);
  }
  get Cd() {
    return this.cd();
  }
  get Share() {
    return this.share();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsBuffItem(t, s) {
    return (s || new BuffItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  publiccdgroup() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetBuffsAt(t) {
    return this.buffs(t);
  }
  buffs(t) {
    var s = this.J7.__offset(this.z7, 8);
    if (s) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + s) + t * 8);
    } else {
      return 0;
    }
  }
  buffsLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  buffsArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  cd() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  share() {
    var t = this.J7.__offset(this.z7, 12);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.BuffItem = BuffItem;
//# sourceMappingURL=BuffItem.js.map