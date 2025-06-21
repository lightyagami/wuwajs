"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomBattleNPC = void 0;
const GameUtils_1 = require("../../../Game/GameUtils");
class PhantomBattleNPC {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  get GroupId() {
    return this.groupid()
  }
  get BTId() {
    return this.btid()
  }
  get CardGroupId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.cardgroupidLength(), this.cardgroupid, this)
  }
  __init(t, i) {
    return this.z7 = t, this.J7 = i, this
  }
  static getRootAsPhantomBattleNPC(t, i) {
    return (i || new PhantomBattleNPC).__init(t.readInt32(t.position()) + t.position(), t)
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  groupid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  btid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  GetCardgroupidAt(t) {
    return this.cardgroupid(t)
  }
  cardgroupid(t) {
    var i = this.J7.__offset(this.z7, 10);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0
  }
  cardgroupidLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  cardgroupidArray() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t)) : null
  }
}
exports.PhantomBattleNPC = PhantomBattleNPC;
//# sourceMappingURL=PhantomBattleNPC.js.map