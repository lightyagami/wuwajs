"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InitStateBarrierLock = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class InitStateBarrierLock {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsInitStateBarrierLock(t, r) {
    return (r || new InitStateBarrierLock()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsInitStateBarrierLock(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new InitStateBarrierLock()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startInitStateBarrierLock(t) {
    t.startObject(1);
  }
  static addType(t, r) {
    t.addFieldInt8(0, r, 0);
  }
  static endInitStateBarrierLock(t) {
    return t.endObject();
  }
  static createInitStateBarrierLock(t, r) {
    InitStateBarrierLock.startInitStateBarrierLock(t);
    InitStateBarrierLock.addType(t, r);
    return InitStateBarrierLock.endInitStateBarrierLock(t);
  }
}
exports.InitStateBarrierLock = InitStateBarrierLock;
//# sourceMappingURL=init-state-barrier-lock.js.map