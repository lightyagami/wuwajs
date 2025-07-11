"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoMonopolyPropertyType = undefined;
class DangoMonopolyPropertyType {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get PropertyType() {
    return this.propertytype();
  }
  get TriggerType() {
    return this.triggertype();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsDangoMonopolyPropertyType(t, r) {
    return (r || new DangoMonopolyPropertyType()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  propertytype() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  triggertype() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.DangoMonopolyPropertyType = DangoMonopolyPropertyType;
//# sourceMappingURL=DangoMonopolyPropertyType.js.map