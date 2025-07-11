"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PointField = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PointField {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsPointField(t, i) {
    return (i || new PointField()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPointField(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new PointField()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startPointField(t) {
    t.startObject(1);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static endPointField(t) {
    return t.endObject();
  }
  static createPointField(t, i) {
    PointField.startPointField(t);
    PointField.addType(t, i);
    return PointField.endPointField(t);
  }
}
exports.PointField = PointField;
//# sourceMappingURL=point-field.js.map