"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorGiftQuality = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class MotorGiftQuality {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get QualityId() {
    return this.qualityid();
  }
  get Path() {
    return this.path();
  }
  get BgA() {
    return this.bga();
  }
  get BgType() {
    return this.bgtype();
  }
  get BgC() {
    return this.bgc();
  }
  get BgBar() {
    return this.bgbar();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsMotorGiftQuality(t, i) {
    return (i || new MotorGiftQuality()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  qualityid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  path(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  bga(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  bgtype(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  bgc(t) {
    var i = this.J7.__offset(this.z7, 12);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  bgbar(t) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.MotorGiftQuality = MotorGiftQuality;
//# sourceMappingURL=MotorGiftQuality.js.map