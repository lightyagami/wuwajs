"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterLookAt = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_character_look_at_data_js_1 = require("../fb-action/union-character-look-at-data.js");
class CharacterLookAt {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsCharacterLookAt(t, r) {
    return (r || new CharacterLookAt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCharacterLookAt(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new CharacterLookAt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  charEntityId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  targetType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_character_look_at_data_js_1.UnionCharacterLookAtData.NONE;
    }
  }
  target(t) {
    var r = this.bb.__offset(this.bb_pos, 8);
    if (r) {
      return this.bb.__union(t, this.bb_pos + r);
    } else {
      return undefined;
    }
  }
  static startCharacterLookAt(t) {
    t.startObject(3);
  }
  static addCharEntityId(t, r) {
    t.addFieldInt32(0, r, 0);
  }
  static addTargetType(t, r) {
    t.addFieldInt8(1, r, union_character_look_at_data_js_1.UnionCharacterLookAtData.NONE);
  }
  static addTarget(t, r) {
    t.addFieldOffset(2, r, 0);
  }
  static endCharacterLookAt(t) {
    return t.endObject();
  }
  static createCharacterLookAt(t, r, a, e) {
    CharacterLookAt.startCharacterLookAt(t);
    CharacterLookAt.addCharEntityId(t, r);
    CharacterLookAt.addTargetType(t, a);
    CharacterLookAt.addTarget(t, e);
    return CharacterLookAt.endCharacterLookAt(t);
  }
}
exports.CharacterLookAt = CharacterLookAt;
//# sourceMappingURL=character-look-at.js.map