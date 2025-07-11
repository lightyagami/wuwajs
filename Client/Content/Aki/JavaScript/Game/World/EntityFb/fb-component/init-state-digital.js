"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InitStateDigital = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class InitStateDigital {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsInitStateDigital(t, i) {
    return (i || new InitStateDigital()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsInitStateDigital(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new InitStateDigital()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startInitStateDigital(t) {
    t.startObject(1);
  }
  static addType(t, i) {
    t.addFieldInt8(0, i, 0);
  }
  static endInitStateDigital(t) {
    return t.endObject();
  }
  static createInitStateDigital(t, i) {
    InitStateDigital.startInitStateDigital(t);
    InitStateDigital.addType(t, i);
    return InitStateDigital.endInitStateDigital(t);
  }
}
exports.InitStateDigital = InitStateDigital;
//# sourceMappingURL=init-state-digital.js.map