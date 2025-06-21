"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.I18nTextures = void 0;
const GameUtils_1 = require("../../../Game/GameUtils");
class I18nTextures {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  get HandleType() {
    return this.handletype()
  }
  get ZhHans() {
    return this.zhhans()
  }
  get En() {
    return this.en()
  }
  get Ja() {
    return this.ja()
  }
  get Ko() {
    return this.ko()
  }
  get Ru() {
    return this.ru()
  }
  get ZhHant() {
    return this.zhhant()
  }
  get De() {
    return this.de()
  }
  get Es() {
    return this.es()
  }
  get Pt() {
    return this.pt()
  }
  get Idn() {
    return this.idn()
  }
  get Fr() {
    return this.fr()
  }
  get Vi() {
    return this.vi()
  }
  get Th() {
    return this.th()
  }
  __init(t, s) {
    return this.z7 = t, this.J7 = s, this
  }
  static getRootAsI18nTextures(t, s) {
    return (s || new I18nTextures).__init(t.readInt32(t.position()) + t.position(), t)
  }
  id(t) {
    var s = this.J7.__offset(this.z7, 4),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  handletype(t) {
    var s = this.J7.__offset(this.z7, 6),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  zhhans(t) {
    var s = this.J7.__offset(this.z7, 8),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  en(t) {
    var s = this.J7.__offset(this.z7, 10),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  ja(t) {
    var s = this.J7.__offset(this.z7, 12),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  ko(t) {
    var s = this.J7.__offset(this.z7, 14),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  ru(t) {
    var s = this.J7.__offset(this.z7, 16),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  zhhant(t) {
    var s = this.J7.__offset(this.z7, 18),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  de(t) {
    var s = this.J7.__offset(this.z7, 20),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  es(t) {
    var s = this.J7.__offset(this.z7, 22),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  pt(t) {
    var s = this.J7.__offset(this.z7, 24),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  idn(t) {
    var s = this.J7.__offset(this.z7, 26),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  fr(t) {
    var s = this.J7.__offset(this.z7, 28),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  vi(t) {
    var s = this.J7.__offset(this.z7, 30),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  th(t) {
    var s = this.J7.__offset(this.z7, 32),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
}
exports.I18nTextures = I18nTextures;
//# sourceMappingURL=I18nTextures.js.map