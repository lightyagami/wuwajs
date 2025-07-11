"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoveTrialCharacter = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RemoveTrialCharacter {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(r, t) {
    this.bb_pos = r;
    this.bb = t;
    return this;
  }
  static getRootAsRemoveTrialCharacter(r, t) {
    return (t || new RemoveTrialCharacter()).__init(r.readInt32(r.position()) + r.position(), r);
  }
  static getSizePrefixedRootAsRemoveTrialCharacter(r, t) {
    r.setPosition(r.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new RemoveTrialCharacter()).__init(r.readInt32(r.position()) + r.position(), r);
  }
  characterId() {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.readInt32(this.bb_pos + r);
    } else {
      return 0;
    }
  }
  characterGroup(r) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + t) + r * 4);
    } else {
      return 0;
    }
  }
  characterGroupLength() {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return this.bb.__vector_len(this.bb_pos + r);
    } else {
      return 0;
    }
  }
  characterGroupArray() {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + r), this.bb.__vector_len(this.bb_pos + r));
    } else {
      return undefined;
    }
  }
  static startRemoveTrialCharacter(r) {
    r.startObject(2);
  }
  static addCharacterId(r, t) {
    r.addFieldInt32(0, t, 0);
  }
  static addCharacterGroup(r, t) {
    r.addFieldOffset(1, t, 0);
  }
  static createCharacterGroupVector(t, e) {
    t.startVector(4, e.length, 4);
    for (let r = e.length - 1; r >= 0; r--) {
      t.addInt32(e[r]);
    }
    return t.endVector();
  }
  static startCharacterGroupVector(r, t) {
    r.startVector(4, t, 4);
  }
  static endRemoveTrialCharacter(r) {
    return r.endObject();
  }
  static createRemoveTrialCharacter(r, t, e) {
    RemoveTrialCharacter.startRemoveTrialCharacter(r);
    RemoveTrialCharacter.addCharacterId(r, t);
    RemoveTrialCharacter.addCharacterGroup(r, e);
    return RemoveTrialCharacter.endRemoveTrialCharacter(r);
  }
}
exports.RemoveTrialCharacter = RemoveTrialCharacter;
//# sourceMappingURL=remove-trial-character.js.map