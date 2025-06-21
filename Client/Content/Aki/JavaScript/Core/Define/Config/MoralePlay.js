"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoralePlay = void 0;
const GameUtils_1 = require("../../../Game/GameUtils");
class MoralePlay {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  get BattleScoreId() {
    return this.battlescoreid()
  }
  get ExpItemId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.expitemidLength(), this.expitemid, this)
  }
  __init(t, i) {
    return this.z7 = t, this.J7 = i, this
  }
  static getRootAsMoralePlay(t, i) {
    return (i || new MoralePlay).__init(t.readInt32(t.position()) + t.position(), t)
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  battlescoreid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  GetExpitemidAt(t) {
    return this.expitemid(t)
  }
  expitemid(t) {
    var i = this.J7.__offset(this.z7, 8);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0
  }
  expitemidLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  expitemidArray() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t)) : null
  }
}
exports.MoralePlay = MoralePlay;
//# sourceMappingURL=MoralePlay.js.map