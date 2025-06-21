"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ComboTeachingCondition = void 0;
const GameUtils_1 = require("../../../Game/GameUtils");
class ComboTeachingCondition {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  get CompleteCondition() {
    return this.completecondition()
  }
  get CompleteDelay() {
    return this.completedelay()
  }
  get CompleteParam() {
    return this.completeparam()
  }
  get FailedCondition() {
    return GameUtils_1.GameUtils.ConvertToArray(this.failedconditionLength(), this.failedcondition, this)
  }
  get FailDelay() {
    return this.faildelay()
  }
  get FailedParam() {
    return GameUtils_1.GameUtils.ConvertToArray(this.failedparamLength(), this.failedparam, this)
  }
  get RemoveBuff() {
    return GameUtils_1.GameUtils.ConvertToArray(this.removebuffLength(), this.removebuff, this)
  }
  get RemoveBullet() {
    return GameUtils_1.GameUtils.ConvertToArray(this.removebulletLength(), this.removebullet, this)
  }
  get SummonPos() {
    return this.summonpos()
  }
  get SummonRemoveBuff() {
    return GameUtils_1.GameUtils.ConvertToArray(this.summonremovebuffLength(), this.summonremovebuff, this)
  }
  get SummonAddBuff() {
    return GameUtils_1.GameUtils.ConvertToArray(this.summonaddbuffLength(), this.summonaddbuff, this)
  }
  __init(t, i) {
    return this.z7 = t, this.J7 = i, this
  }
  static getRootAsComboTeachingCondition(t, i) {
    return (i || new ComboTeachingCondition).__init(t.readInt32(t.position()) + t.position(), t)
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  completecondition() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  completedelay() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  completeparam(t) {
    var i = this.J7.__offset(this.z7, 10),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  GetFailedconditionAt(t) {
    return this.failedcondition(t)
  }
  failedcondition(t) {
    var i = this.J7.__offset(this.z7, 12);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0
  }
  failedconditionLength() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  failedconditionArray() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t)) : null
  }
  faildelay() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  GetFailedparamAt(t) {
    return this.failedparam(t)
  }
  failedparam(t, i) {
    var s = this.J7.__offset(this.z7, 16),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  failedparamLength() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  GetRemovebuffAt(t) {
    return this.removebuff(t)
  }
  removebuff(t) {
    var i = this.J7.__offset(this.z7, 18);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0
  }
  removebuffLength() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  removebuffArray() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t)) : null
  }
  GetRemovebulletAt(t) {
    return this.removebullet(t)
  }
  removebullet(t, i) {
    var s = this.J7.__offset(this.z7, 20),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  removebulletLength() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  summonpos() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  GetSummonremovebuffAt(t) {
    return this.summonremovebuff(t)
  }
  summonremovebuff(t) {
    var i = this.J7.__offset(this.z7, 24);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0
  }
  summonremovebuffLength() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  summonremovebuffArray() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t)) : null
  }
  GetSummonaddbuffAt(t) {
    return this.summonaddbuff(t)
  }
  summonaddbuff(t) {
    var i = this.J7.__offset(this.z7, 26);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0
  }
  summonaddbuffLength() {
    var t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  summonaddbuffArray() {
    var t = this.J7.__offset(this.z7, 26);
    return t ? new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t)) : null
  }
}
exports.ComboTeachingCondition = ComboTeachingCondition;
//# sourceMappingURL=ComboTeachingCondition.js.map