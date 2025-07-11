"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UniversalTone = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class UniversalTone {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsUniversalTone(e, t) {
    return (t || new UniversalTone()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsUniversalTone(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new UniversalTone()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  universalToneId() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  timberId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startUniversalTone(e) {
    e.startObject(2);
  }
  static addUniversalToneId(e, t) {
    e.addFieldInt32(0, t, 0);
  }
  static addTimberId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endUniversalTone(e) {
    return e.endObject();
  }
  static createUniversalTone(e, t, s) {
    UniversalTone.startUniversalTone(e);
    UniversalTone.addUniversalToneId(e, t);
    UniversalTone.addTimberId(e, s);
    return UniversalTone.endUniversalTone(e);
  }
}
exports.UniversalTone = UniversalTone;
//# sourceMappingURL=universal-tone.js.map