"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ICenterTextTypeWriter = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ICenterTextTypeWriter {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsICenterTextTypeWriter(e, t) {
    return (t || new ICenterTextTypeWriter()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsICenterTextTypeWriter(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new ICenterTextTypeWriter()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  textCountPerSecond() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startICenterTextTypeWriter(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addTextCountPerSecond(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endICenterTextTypeWriter(e) {
    return e.endObject();
  }
  static createICenterTextTypeWriter(e, t, r) {
    ICenterTextTypeWriter.startICenterTextTypeWriter(e);
    ICenterTextTypeWriter.addType(e, t);
    ICenterTextTypeWriter.addTextCountPerSecond(e, r);
    return ICenterTextTypeWriter.endICenterTextTypeWriter(e);
  }
}
exports.ICenterTextTypeWriter = ICenterTextTypeWriter;
//# sourceMappingURL=icenter-text-type-writer.js.map