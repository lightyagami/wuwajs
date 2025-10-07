"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterSeniorSetting = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class FilterSeniorSetting {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Name() {
    return this.name();
  }
  get ParamIndex() {
    return this.paramindex();
  }
  get SortId() {
    return this.sortid();
  }
  get RangeMin() {
    return this.rangemin();
  }
  get RangeMax() {
    return this.rangemax();
  }
  get Unit() {
    return this.unit();
  }
  get IsNeedSpecialBg() {
    return this.isneedspecialbg();
  }
  get DecimalPlaces() {
    return this.decimalplaces();
  }
  get Ratio() {
    return this.ratio();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsFilterSeniorSetting(t, i) {
    return (i || new FilterSeniorSetting()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  paramindex() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sortid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rangemin() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return -1;
    }
  }
  rangemax() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 1;
    }
  }
  unit(t) {
    var i = this.J7.__offset(this.z7, 16);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  isneedspecialbg() {
    var t = this.J7.__offset(this.z7, 18);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  decimalplaces() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  ratio() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.FilterSeniorSetting = FilterSeniorSetting;
//# sourceMappingURL=FilterSeniorSetting.js.map