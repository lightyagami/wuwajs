"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoralePlay = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class MoralePlay {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get BattleScoreId() {
    return this.battlescoreid();
  }
  get ExpItemId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.expitemidLength(), this.expitemid, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsMoralePlay(t, i) {
    return (i || new MoralePlay()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  battlescoreid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetExpitemidAt(t) {
    return this.expitemid(t);
  }
  expitemid(t) {
    var i = this.J7.__offset(this.z7, 8);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  expitemidLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  expitemidArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.MoralePlay = MoralePlay;
//# sourceMappingURL=MoralePlay.js.map