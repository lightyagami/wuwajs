"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomBattleBadgeGroup = void 0;
const GameUtils_1 = require("../../../Game/GameUtils");
class PhantomBattleBadgeGroup {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get GroupId() {
    return this.groupid()
  }
  get Name() {
    return this.name()
  }
  get Num() {
    return this.num()
  }
  get PhantomBattleSkillId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.phantombattleskillidLength(), this.phantombattleskillid, this)
  }
  __init(t, i) {
    return this.z7 = t, this.J7 = i, this
  }
  static getRootAsPhantomBattleBadgeGroup(t, i) {
    return (i || new PhantomBattleBadgeGroup).__init(t.readInt32(t.position()) + t.position(), t)
  }
  groupid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 6),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  num() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  GetPhantombattleskillidAt(t) {
    return this.phantombattleskillid(t)
  }
  phantombattleskillid(t) {
    var i = this.J7.__offset(this.z7, 10);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0
  }
  phantombattleskillidLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  phantombattleskillidArray() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t)) : null
  }
}
exports.PhantomBattleBadgeGroup = PhantomBattleBadgeGroup;
//# sourceMappingURL=PhantomBattleBadgeGroup.js.map