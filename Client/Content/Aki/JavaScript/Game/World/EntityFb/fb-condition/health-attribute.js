"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HealthAttribute = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HealthAttribute {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsHealthAttribute(t, e) {
    return (e || new HealthAttribute()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsHealthAttribute(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new HealthAttribute()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  compare(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  value() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startHealthAttribute(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addCompare(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addValue(t, e) {
    t.addFieldFloat32(2, e, 0);
  }
  static endHealthAttribute(t) {
    return t.endObject();
  }
  static createHealthAttribute(t, e, i, r) {
    HealthAttribute.startHealthAttribute(t);
    HealthAttribute.addType(t, e);
    HealthAttribute.addCompare(t, i);
    HealthAttribute.addValue(t, r);
    return HealthAttribute.endHealthAttribute(t);
  }
}
exports.HealthAttribute = HealthAttribute;
//# sourceMappingURL=health-attribute.js.map