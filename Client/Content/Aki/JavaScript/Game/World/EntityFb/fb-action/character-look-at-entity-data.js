"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterLookAtEntityData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CharacterLookAtEntityData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsCharacterLookAtEntityData(t, a) {
    return (a || new CharacterLookAtEntityData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCharacterLookAtEntityData(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new CharacterLookAtEntityData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startCharacterLookAtEntityData(t) {
    t.startObject(2);
  }
  static addType(t, a) {
    t.addFieldInt8(0, a, 0);
  }
  static addEntityId(t, a) {
    t.addFieldInt32(1, a, 0);
  }
  static endCharacterLookAtEntityData(t) {
    return t.endObject();
  }
  static createCharacterLookAtEntityData(t, a, r) {
    CharacterLookAtEntityData.startCharacterLookAtEntityData(t);
    CharacterLookAtEntityData.addType(t, a);
    CharacterLookAtEntityData.addEntityId(t, r);
    return CharacterLookAtEntityData.endCharacterLookAtEntityData(t);
  }
}
exports.CharacterLookAtEntityData = CharacterLookAtEntityData;
//# sourceMappingURL=character-look-at-entity-data.js.map