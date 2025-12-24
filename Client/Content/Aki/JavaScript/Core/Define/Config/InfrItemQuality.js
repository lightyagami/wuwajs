"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrItemQuality = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class InfrItemQuality {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Color() {
    return this.color();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsInfrItemQuality(t, s) {
    return (s || new InfrItemQuality()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  color(t) {
    var s = this.J7.__offset(this.z7, 6);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.InfrItemQuality = InfrItemQuality;
//# sourceMappingURL=InfrItemQuality.js.map