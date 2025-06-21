"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.AbpMontageData = void 0;
const GameUtils_1 = require("../../../Game/GameUtils");
class AbpMontageData {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  get Montage() {
    return this.montage()
  }
  get MaleVariant() {
    return this.malevariant()
  }
  get InitState() {
    return this.initstate()
  }
  get EndState() {
    return this.endstate()
  }
  __init(t, s) {
    return this.z7 = t, this.J7 = s, this
  }
  static getRootAsAbpMontageData(t, s) {
    return (s || new AbpMontageData).__init(t.readInt32(t.position()) + t.position(), t)
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  montage(t) {
    var s = this.J7.__offset(this.z7, 6),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  malevariant(t) {
    var s = this.J7.__offset(this.z7, 8),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  initstate(t) {
    var s = this.J7.__offset(this.z7, 10),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  endstate(t) {
    var s = this.J7.__offset(this.z7, 12),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
}
exports.AbpMontageData = AbpMontageData;
//# sourceMappingURL=AbpMontageData.js.map