"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigPropValue = undefined;
class ConfigPropValue {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Value() {
    return this.value();
  }
  get IsRatio() {
    return this.isratio();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsConfigPropValue(t, i) {
    return (i || new ConfigPropValue()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  value() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  isratio() {
    var t = this.J7.__offset(this.z7, 8);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.ConfigPropValue = ConfigPropValue;
//# sourceMappingURL=ConfigPropValue.js.map