"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomBattleSkill = void 0;
const GameUtils_1 = require("../../../Game/GameUtils");
class PhantomBattleSkill {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  get Name() {
    return this.name()
  }
  get Desc() {
    return this.desc()
  }
  get DescParams() {
    return GameUtils_1.GameUtils.ConvertToArray(this.descparamsLength(), this.descparams, this)
  }
  get TargetSelectType() {
    return this.targetselecttype()
  }
  get TargetSelectParams() {
    return GameUtils_1.GameUtils.ConvertToArray(this.targetselectparamsLength(), this.targetselectparams, this)
  }
  get BattlePower() {
    return this.battlepower()
  }
  get CostConsume() {
    return this.costconsume()
  }
  get EffectType() {
    return this.effecttype()
  }
  get EffectParams() {
    return GameUtils_1.GameUtils.ConvertToArray(this.effectparamsLength(), this.effectparams, this)
  }
  __init(t, s) {
    return this.z7 = t, this.J7 = s, this
  }
  static getRootAsPhantomBattleSkill(t, s) {
    return (s || new PhantomBattleSkill).__init(t.readInt32(t.position()) + t.position(), t)
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
  desc(t) {
    var s = this.J7.__offset(this.z7, 8),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  GetDescparamsAt(t) {
    return this.descparams(t)
  }
  descparams(t, s) {
    var e = this.J7.__offset(this.z7, 10),
      e = e ? this.J7.__string(this.J7.__vector(this.z7 + e) + 4 * t, s) : null;
    return "string" == typeof e && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(e), e
  }
  descparamsLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  targetselecttype() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  GetTargetselectparamsAt(t) {
    return this.targetselectparams(t)
  }
  targetselectparams(t, s) {
    var e = this.J7.__offset(this.z7, 14),
      e = e ? this.J7.__string(this.J7.__vector(this.z7 + e) + 4 * t, s) : null;
    return "string" == typeof e && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(e), e
  }
  targetselectparamsLength() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  battlepower() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  costconsume() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  effecttype() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  GetEffectparamsAt(t) {
    return this.effectparams(t)
  }
  effectparams(t, s) {
    var e = this.J7.__offset(this.z7, 22),
      e = e ? this.J7.__string(this.J7.__vector(this.z7 + e) + 4 * t, s) : null;
    return "string" == typeof e && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(e), e
  }
  effectparamsLength() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
}
exports.PhantomBattleSkill = PhantomBattleSkill;
//# sourceMappingURL=PhantomBattleSkill.js.map