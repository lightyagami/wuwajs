"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterLookAtPositionData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class CharacterLookAtPositionData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, o) {
    this.bb_pos = t;
    this.bb = o;
    return this;
  }
  static getRootAsCharacterLookAtPositionData(t, o) {
    return (o || new CharacterLookAtPositionData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCharacterLookAtPositionData(t, o) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new CharacterLookAtPositionData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  pos(t) {
    var o = this.bb.__offset(this.bb_pos, 6);
    if (o) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + o), this.bb);
    } else {
      return undefined;
    }
  }
  static startCharacterLookAtPositionData(t) {
    t.startObject(2);
  }
  static addType(t, o) {
    t.addFieldInt8(0, o, 0);
  }
  static addPos(t, o) {
    t.addFieldOffset(1, o, 0);
  }
  static endCharacterLookAtPositionData(t) {
    return t.endObject();
  }
}
exports.CharacterLookAtPositionData = CharacterLookAtPositionData;
//# sourceMappingURL=character-look-at-position-data.js.map