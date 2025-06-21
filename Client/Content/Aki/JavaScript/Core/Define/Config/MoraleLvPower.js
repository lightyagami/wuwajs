"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleLvPower = void 0;
const GameUtils_1 = require("../../../Game/GameUtils");
class MoraleLvPower {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  get LvStage() {
    return this.lvstage()
  }
  get BuffName() {
    return this.buffname()
  }
  get BuffDesc() {
    return this.buffdesc()
  }
  get BuffDescDetail() {
    return this.buffdescdetail()
  }
  get IconPathNormal() {
    return this.iconpathnormal()
  }
  get IconPathActive() {
    return this.iconpathactive()
  }
  __init(t, s) {
    return this.z7 = t, this.J7 = s, this
  }
  static getRootAsMoraleLvPower(t, s) {
    return (s || new MoraleLvPower).__init(t.readInt32(t.position()) + t.position(), t)
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  lvstage() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  buffname(t) {
    var s = this.J7.__offset(this.z7, 8),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  buffdesc(t) {
    var s = this.J7.__offset(this.z7, 10),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  buffdescdetail(t) {
    var s = this.J7.__offset(this.z7, 12),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  iconpathnormal(t) {
    var s = this.J7.__offset(this.z7, 14),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  iconpathactive(t) {
    var s = this.J7.__offset(this.z7, 16),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
}
exports.MoraleLvPower = MoraleLvPower;
//# sourceMappingURL=MoraleLvPower.js.map