"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleLevel = void 0;
const GameUtils_1 = require("../../../Game/GameUtils");
class MoraleLevel {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Level() {
    return this.level()
  }
  get BuffIds() {
    return GameUtils_1.GameUtils.ConvertToArray(this.buffidsLength(), this.buffids, this)
  }
  __init(t, e) {
    return this.z7 = t, this.J7 = e, this
  }
  static getRootAsMoraleLevel(t, e) {
    return (e || new MoraleLevel).__init(t.readInt32(t.position()) + t.position(), t)
  }
  level() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  GetBuffidsAt(t) {
    return this.buffids(t)
  }
  buffids(t) {
    var e = this.J7.__offset(this.z7, 6);
    return e ? this.J7.readInt64(this.J7.__vector(this.z7 + e) + 8 * t) : BigInt(0)
  }
  buffidsLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
}
exports.MoraleLevel = MoraleLevel;
//# sourceMappingURL=MoraleLevel.js.map