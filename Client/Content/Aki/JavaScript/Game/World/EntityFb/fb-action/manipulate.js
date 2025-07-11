"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Manipulate = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class Manipulate {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsManipulate(t, e) {
    return (e || new Manipulate()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsManipulate(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new Manipulate()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  targetEntityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startManipulate(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addTargetEntityId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endManipulate(t) {
    return t.endObject();
  }
  static createManipulate(t, e, a) {
    Manipulate.startManipulate(t);
    Manipulate.addType(t, e);
    Manipulate.addTargetEntityId(t, a);
    return Manipulate.endManipulate(t);
  }
}
exports.Manipulate = Manipulate;
//# sourceMappingURL=manipulate.js.map