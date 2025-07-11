"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InitStateBirth = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class InitStateBirth {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsInitStateBirth(t, i) {
    return (i || new InitStateBirth()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsInitStateBirth(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new InitStateBirth()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  birthTag(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startInitStateBirth(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldInt8(0, i, 0);
  }
  static addBirthTag(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endInitStateBirth(t) {
    return t.endObject();
  }
  static createInitStateBirth(t, i, e) {
    InitStateBirth.startInitStateBirth(t);
    InitStateBirth.addType(t, i);
    InitStateBirth.addBirthTag(t, e);
    return InitStateBirth.endInitStateBirth(t);
  }
}
exports.InitStateBirth = InitStateBirth;
//# sourceMappingURL=init-state-birth.js.map