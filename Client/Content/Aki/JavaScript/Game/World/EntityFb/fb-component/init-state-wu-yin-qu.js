"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InitStateWuYinQu = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class InitStateWuYinQu {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsInitStateWuYinQu(t, i) {
    return (i || new InitStateWuYinQu()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsInitStateWuYinQu(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new InitStateWuYinQu()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startInitStateWuYinQu(t) {
    t.startObject(1);
  }
  static addType(t, i) {
    t.addFieldInt8(0, i, 0);
  }
  static endInitStateWuYinQu(t) {
    return t.endObject();
  }
  static createInitStateWuYinQu(t, i) {
    InitStateWuYinQu.startInitStateWuYinQu(t);
    InitStateWuYinQu.addType(t, i);
    return InitStateWuYinQu.endInitStateWuYinQu(t);
  }
}
exports.InitStateWuYinQu = InitStateWuYinQu;
//# sourceMappingURL=init-state-wu-yin-qu.js.map