"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterLookAtEmptyData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CharacterLookAtEmptyData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsCharacterLookAtEmptyData(t, a) {
    return (a || new CharacterLookAtEmptyData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCharacterLookAtEmptyData(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new CharacterLookAtEmptyData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startCharacterLookAtEmptyData(t) {
    t.startObject(1);
  }
  static addType(t, a) {
    t.addFieldInt8(0, a, 0);
  }
  static endCharacterLookAtEmptyData(t) {
    return t.endObject();
  }
  static createCharacterLookAtEmptyData(t, a) {
    CharacterLookAtEmptyData.startCharacterLookAtEmptyData(t);
    CharacterLookAtEmptyData.addType(t, a);
    return CharacterLookAtEmptyData.endCharacterLookAtEmptyData(t);
  }
}
exports.CharacterLookAtEmptyData = CharacterLookAtEmptyData;
//# sourceMappingURL=character-look-at-empty-data.js.map