"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MorseCode = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class MorseCode {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsMorseCode(e, t) {
    return (t || new MorseCode()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsMorseCode(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new MorseCode()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  morseCodeId(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startMorseCode(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addMorseCodeId(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endMorseCode(e) {
    return e.endObject();
  }
  static createMorseCode(e, t, s) {
    MorseCode.startMorseCode(e);
    MorseCode.addType(e, t);
    MorseCode.addMorseCodeId(e, s);
    return MorseCode.endMorseCode(e);
  }
}
exports.MorseCode = MorseCode;
//# sourceMappingURL=morse-code.js.map