"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomBattleFactor = void 0;
const GameUtils_1 = require("../../../Game/GameUtils");
class PhantomBattleFactor {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  get PhantomBattleEffectId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.phantombattleeffectidLength(), this.phantombattleeffectid, this)
  }
  get IsBeforeBattle() {
    return this.isbeforebattle()
  }
  get Tag() {
    return this.tag()
  }
  get Sort() {
    return this.sort()
  }
  get Name() {
    return this.name()
  }
  get Description() {
    return this.description()
  }
  get DescriptionParams() {
    return GameUtils_1.GameUtils.ConvertToArray(this.descriptionparamsLength(), this.descriptionparams, this)
  }
  get DeActiveDescription() {
    return this.deactivedescription()
  }
  get DeActiveDescriptionParams() {
    return GameUtils_1.GameUtils.ConvertToArray(this.deactivedescriptionparamsLength(), this.deactivedescriptionparams, this)
  }
  get EntryId() {
    return this.entryid()
  }
  get SlotTendency() {
    return this.slottendency()
  }
  __init(t, i) {
    return this.z7 = t, this.J7 = i, this
  }
  static getRootAsPhantomBattleFactor(t, i) {
    return (i || new PhantomBattleFactor).__init(t.readInt32(t.position()) + t.position(), t)
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  GetPhantombattleeffectidAt(t) {
    return this.phantombattleeffectid(t)
  }
  phantombattleeffectid(t) {
    var i = this.J7.__offset(this.z7, 6);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0
  }
  phantombattleeffectidLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  phantombattleeffectidArray() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t)) : null
  }
  isbeforebattle() {
    var t = this.J7.__offset(this.z7, 8);
    return !t || !!this.J7.readInt8(this.z7 + t)
  }
  tag(t) {
    var i = this.J7.__offset(this.z7, 10),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  sort() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 14),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  description(t) {
    var i = this.J7.__offset(this.z7, 16),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  GetDescriptionparamsAt(t) {
    return this.descriptionparams(t)
  }
  descriptionparams(t, i) {
    var s = this.J7.__offset(this.z7, 18),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  descriptionparamsLength() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  deactivedescription(t) {
    var i = this.J7.__offset(this.z7, 20),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  GetDeactivedescriptionparamsAt(t) {
    return this.deactivedescriptionparams(t)
  }
  deactivedescriptionparams(t, i) {
    var s = this.J7.__offset(this.z7, 22),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  deactivedescriptionparamsLength() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  entryid() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  slottendency() {
    var t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
}
exports.PhantomBattleFactor = PhantomBattleFactor;
//# sourceMappingURL=PhantomBattleFactor.js.map