"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialBarEffectPercentInfo = undefined;
const GameUtils_1 = require("../../../../Game/GameUtils");
class SpecialBarEffectPercentInfo {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get MinPercent() {
    return this.minpercent();
  }
  get MaxPercent() {
    return this.maxpercent();
  }
  get MinValue() {
    return this.minvalue();
  }
  get MaxValue() {
    return this.maxvalue();
  }
  get FloatParameterName() {
    return this.floatparametername();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsSpecialBarEffectPercentInfo(t, e) {
    return (e || new SpecialBarEffectPercentInfo()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  minpercent() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxpercent() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  minvalue() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxvalue() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  floatparametername(t) {
    var e = this.J7.__offset(this.z7, 12);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.SpecialBarEffectPercentInfo = SpecialBarEffectPercentInfo;
//# sourceMappingURL=SpecialBarEffectPercentInfo.js.map