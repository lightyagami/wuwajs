"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wait = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class Wait {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsWait(t, i) {
    return (i || new Wait()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsWait(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new Wait()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  min() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  time() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  banInput() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startWait(t) {
    t.startObject(3);
  }
  static addMin(t, i) {
    t.addFieldFloat32(0, i, 0);
  }
  static addTime(t, i) {
    t.addFieldFloat32(1, i, 0);
  }
  static addBanInput(t, i) {
    t.addFieldInt8(2, +i, 0);
  }
  static endWait(t) {
    return t.endObject();
  }
  static createWait(t, i, s, a) {
    Wait.startWait(t);
    Wait.addMin(t, i);
    Wait.addTime(t, s);
    Wait.addBanInput(t, a);
    return Wait.endWait(t);
  }
}
exports.Wait = Wait;
//# sourceMappingURL=wait.js.map