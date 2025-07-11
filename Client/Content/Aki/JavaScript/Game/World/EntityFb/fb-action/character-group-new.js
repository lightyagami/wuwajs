"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterGroupNew = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CharacterGroupNew {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(r, t) {
    this.bb_pos = r;
    this.bb = t;
    return this;
  }
  static getRootAsCharacterGroupNew(r, t) {
    return (t || new CharacterGroupNew()).__init(r.readInt32(r.position()) + r.position(), r);
  }
  static getSizePrefixedRootAsCharacterGroupNew(r, t) {
    r.setPosition(r.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CharacterGroupNew()).__init(r.readInt32(r.position()) + r.position(), r);
  }
  characterId() {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.readInt32(this.bb_pos + r);
    } else {
      return 0;
    }
  }
  isAiCharacter() {
    var r = this.bb.__offset(this.bb_pos, 6);
    return !!r && !!this.bb.readInt8(this.bb_pos + r);
  }
  static startCharacterGroupNew(r) {
    r.startObject(2);
  }
  static addCharacterId(r, t) {
    r.addFieldInt32(0, t, 0);
  }
  static addIsAiCharacter(r, t) {
    r.addFieldInt8(1, +t, 0);
  }
  static endCharacterGroupNew(r) {
    return r.endObject();
  }
  static createCharacterGroupNew(r, t, e) {
    CharacterGroupNew.startCharacterGroupNew(r);
    CharacterGroupNew.addCharacterId(r, t);
    CharacterGroupNew.addIsAiCharacter(r, e);
    return CharacterGroupNew.endCharacterGroupNew(r);
  }
}
exports.CharacterGroupNew = CharacterGroupNew;
//# sourceMappingURL=character-group-new.js.map