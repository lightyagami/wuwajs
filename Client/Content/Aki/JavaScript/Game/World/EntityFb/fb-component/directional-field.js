"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DirectionalField = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class DirectionalField {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsDirectionalField(t, i) {
    return (i || new DirectionalField()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDirectionalField(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new DirectionalField()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  direction(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  static startDirectionalField(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addDirection(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endDirectionalField(t) {
    return t.endObject();
  }
}
exports.DirectionalField = DirectionalField;
//# sourceMappingURL=directional-field.js.map