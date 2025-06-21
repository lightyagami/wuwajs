"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomBattleCardFilter = void 0;
const GameUtils_1 = require("../../../Game/GameUtils");
class PhantomBattleCardFilter {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  get Name() {
    return this.name()
  }
  get CostList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.costlistLength(), this.costlist, this)
  }
  __init(t, s) {
    return this.z7 = t, this.J7 = s, this
  }
  static getRootAsPhantomBattleCardFilter(t, s) {
    return (s || new PhantomBattleCardFilter).__init(t.readInt32(t.position()) + t.position(), t)
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  name(t) {
    var s = this.J7.__offset(this.z7, 6),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  GetCostlistAt(t) {
    return this.costlist(t)
  }
  costlist(t) {
    var s = this.J7.__offset(this.z7, 8);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0
  }
  costlistLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  costlistArray() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t)) : null
  }
}
exports.PhantomBattleCardFilter = PhantomBattleCardFilter;
//# sourceMappingURL=PhantomBattleCardFilter.js.map