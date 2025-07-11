"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InhaledDestroySelf = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class InhaledDestroySelf {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsInhaledDestroySelf(e, t) {
    return (t || new InhaledDestroySelf()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsInhaledDestroySelf(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new InhaledDestroySelf()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startInhaledDestroySelf(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endInhaledDestroySelf(e) {
    return e.endObject();
  }
  static createInhaledDestroySelf(e, t) {
    InhaledDestroySelf.startInhaledDestroySelf(e);
    InhaledDestroySelf.addType(e, t);
    return InhaledDestroySelf.endInhaledDestroySelf(e);
  }
}
exports.InhaledDestroySelf = InhaledDestroySelf;
//# sourceMappingURL=inhaled-destroy-self.js.map