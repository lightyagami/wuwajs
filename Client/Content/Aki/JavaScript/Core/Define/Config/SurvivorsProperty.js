"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsProperty = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class SurvivorsProperty {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Key() {
    return this.key();
  }
  get Name() {
    return this.name();
  }
  get IsBasePermyriad() {
    return this.isbasepermyriad();
  }
  get IsPercent() {
    return this.ispercent();
  }
  get IsSpecial() {
    return this.isspecial();
  }
  get Priority() {
    return this.priority();
  }
  get Icon() {
    return this.icon();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsSurvivorsProperty(t, r) {
    return (r || new SurvivorsProperty()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  key(t) {
    var r = this.J7.__offset(this.z7, 6);
    var r = r ? this.J7.__string(this.z7 + r, t) : null;
    if (typeof r == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(r);
    }
    return r;
  }
  name(t) {
    var r = this.J7.__offset(this.z7, 8);
    var r = r ? this.J7.__string(this.z7 + r, t) : null;
    if (typeof r == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(r);
    }
    return r;
  }
  isbasepermyriad() {
    var t = this.J7.__offset(this.z7, 10);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  ispercent() {
    var t = this.J7.__offset(this.z7, 12);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  isspecial() {
    var t = this.J7.__offset(this.z7, 14);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  priority() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  icon(t) {
    var r = this.J7.__offset(this.z7, 18);
    var r = r ? this.J7.__string(this.z7 + r, t) : null;
    if (typeof r == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(r);
    }
    return r;
  }
}
exports.SurvivorsProperty = SurvivorsProperty;
//# sourceMappingURL=SurvivorsProperty.js.map