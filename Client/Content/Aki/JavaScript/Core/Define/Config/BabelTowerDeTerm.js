"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BabelTowerDeTerm = void 0;
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntInt_1 = require("./SubType/DicIntInt");
class BabelTowerDeTerm {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  get GroupId() {
    return this.groupid()
  }
  get DifficultPreLevel() {
    return GameUtils_1.GameUtils.ConvertToArray(this.difficultprelevelLength(), this.difficultprelevel, this)
  }
  get DifficultPreLevelStar() {
    return GameUtils_1.GameUtils.ConvertToMap(this.difficultprelevelstarLength(), this.difficultprelevelstarKey, this.difficultprelevelstarValue, this)
  }
  difficultprelevelstarKey(t) {
    return this.difficultprelevelstar(t)?.key()
  }
  difficultprelevelstarValue(t) {
    return this.difficultprelevelstar(t)?.value()
  }
  get Star() {
    return this.star()
  }
  get Line() {
    return this.line()
  }
  get Texture() {
    return this.texture()
  }
  get NameText() {
    return this.nametext()
  }
  get DesText() {
    return this.destext()
  }
  __init(t, e) {
    return this.z7 = t, this.J7 = e, this
  }
  static getRootAsBabelTowerDeTerm(t, e) {
    return (e || new BabelTowerDeTerm).__init(t.readInt32(t.position()) + t.position(), t)
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  groupid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  GetDifficultprelevelAt(t) {
    return this.difficultprelevel(t)
  }
  difficultprelevel(t) {
    var e = this.J7.__offset(this.z7, 8);
    return e ? this.J7.readInt32(this.J7.__vector(this.z7 + e) + 4 * t) : 0
  }
  difficultprelevelLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  difficultprelevelArray() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t)) : null
  }
  GetDifficultprelevelstarAt(t, e) {
    return this.difficultprelevelstar(t)
  }
  difficultprelevelstar(t, e) {
    var i = this.J7.__offset(this.z7, 10);
    return i ? (e || new DicIntInt_1.DicIntInt).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t), this.J7) : null
  }
  difficultprelevelstarLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  star() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  line() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 1
  }
  texture(t) {
    var e = this.J7.__offset(this.z7, 16),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return "string" == typeof e && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(e), e
  }
  nametext(t) {
    var e = this.J7.__offset(this.z7, 18),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return "string" == typeof e && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(e), e
  }
  destext(t) {
    var e = this.J7.__offset(this.z7, 20),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return "string" == typeof e && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(e), e
  }
}
exports.BabelTowerDeTerm = BabelTowerDeTerm;
//# sourceMappingURL=BabelTowerDeTerm.js.map