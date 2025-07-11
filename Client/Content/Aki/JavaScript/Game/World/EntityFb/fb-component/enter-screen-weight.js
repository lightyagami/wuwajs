"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnterScreenWeight = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EnterScreenWeight {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsEnterScreenWeight(e, t) {
    return (t || new EnterScreenWeight()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsEnterScreenWeight(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new EnterScreenWeight()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  weight() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startEnterScreenWeight(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addWeight(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endEnterScreenWeight(e) {
    return e.endObject();
  }
  static createEnterScreenWeight(e, t, r) {
    EnterScreenWeight.startEnterScreenWeight(e);
    EnterScreenWeight.addType(e, t);
    EnterScreenWeight.addWeight(e, r);
    return EnterScreenWeight.endEnterScreenWeight(e);
  }
}
exports.EnterScreenWeight = EnterScreenWeight;
//# sourceMappingURL=enter-screen-weight.js.map