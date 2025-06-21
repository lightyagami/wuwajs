"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RandomSummon = void 0;
const GameUtils_1 = require("../../../Game/GameUtils"),
  IntArray_1 = require("./SubType/IntArray");
class RandomSummon {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  get Random() {
    return GameUtils_1.GameUtils.ConvertToArray(this.randomLength(), this.random, this)
  }
  get Count() {
    return this.count()
  }
  __init(t, s) {
    return this.z7 = t, this.J7 = s, this
  }
  static getRootAsRandomSummon(t, s) {
    return (s || new RandomSummon).__init(t.readInt32(t.position()) + t.position(), t)
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  GetRandomAt(t, s) {
    return this.random(t)
  }
  random(t, s) {
    var r = this.J7.__offset(this.z7, 6);
    return r ? (s || new IntArray_1.IntArray).__init(this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t), this.J7) : null
  }
  randomLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  count() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
}
exports.RandomSummon = RandomSummon;
//# sourceMappingURL=RandomSummon.js.map