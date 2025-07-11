"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityMatchAllCharacter = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EntityMatchAllCharacter {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsEntityMatchAllCharacter(t, a) {
    return (a || new EntityMatchAllCharacter()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEntityMatchAllCharacter(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new EntityMatchAllCharacter()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
    } else {
      return undefined;
    }
  }
  static startEntityMatchAllCharacter(t) {
    t.startObject(1);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static endEntityMatchAllCharacter(t) {
    return t.endObject();
  }
  static createEntityMatchAllCharacter(t, a) {
    EntityMatchAllCharacter.startEntityMatchAllCharacter(t);
    EntityMatchAllCharacter.addType(t, a);
    return EntityMatchAllCharacter.endEntityMatchAllCharacter(t);
  }
}
exports.EntityMatchAllCharacter = EntityMatchAllCharacter;
//# sourceMappingURL=entity-match-all-character.js.map