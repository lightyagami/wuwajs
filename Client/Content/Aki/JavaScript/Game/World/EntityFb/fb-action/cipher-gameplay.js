"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CipherGameplay = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CipherGameplay {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsCipherGameplay(e, t) {
    return (t || new CipherGameplay()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCipherGameplay(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CipherGameplay()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  cipherId(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startCipherGameplay(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addCipherId(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endCipherGameplay(e) {
    return e.endObject();
  }
  static createCipherGameplay(e, t, i) {
    CipherGameplay.startCipherGameplay(e);
    CipherGameplay.addType(e, t);
    CipherGameplay.addCipherId(e, i);
    return CipherGameplay.endCipherGameplay(e);
  }
}
exports.CipherGameplay = CipherGameplay;
//# sourceMappingURL=cipher-gameplay.js.map