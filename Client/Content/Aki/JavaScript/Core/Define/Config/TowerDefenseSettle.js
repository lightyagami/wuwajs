"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseSettle = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class TowerDefenseSettle {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get IsTotalRatio() {
    return this.istotalratio();
  }
  get BaseTitle() {
    return this.basetitle();
  }
  get Title() {
    return this.title();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsTowerDefenseSettle(t, e) {
    return (e || new TowerDefenseSettle()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  istotalratio() {
    var t = this.J7.__offset(this.z7, 6);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  basetitle(t) {
    var e = this.J7.__offset(this.z7, 8);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  title(t) {
    var e = this.J7.__offset(this.z7, 10);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.TowerDefenseSettle = TowerDefenseSettle;
//# sourceMappingURL=TowerDefenseSettle.js.map