"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterLookAtPlayerData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CharacterLookAtPlayerData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsCharacterLookAtPlayerData(t, a) {
    return (a || new CharacterLookAtPlayerData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCharacterLookAtPlayerData(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new CharacterLookAtPlayerData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startCharacterLookAtPlayerData(t) {
    t.startObject(1);
  }
  static addType(t, a) {
    t.addFieldInt8(0, a, 0);
  }
  static endCharacterLookAtPlayerData(t) {
    return t.endObject();
  }
  static createCharacterLookAtPlayerData(t, a) {
    CharacterLookAtPlayerData.startCharacterLookAtPlayerData(t);
    CharacterLookAtPlayerData.addType(t, a);
    return CharacterLookAtPlayerData.endCharacterLookAtPlayerData(t);
  }
}
exports.CharacterLookAtPlayerData = CharacterLookAtPlayerData;
//# sourceMappingURL=character-look-at-player-data.js.map