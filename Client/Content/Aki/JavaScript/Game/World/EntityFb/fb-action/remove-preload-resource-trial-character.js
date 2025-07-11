"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemovePreloadResourceTrialCharacter = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RemovePreloadResourceTrialCharacter {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(r, e) {
    this.bb_pos = r;
    this.bb = e;
    return this;
  }
  static getRootAsRemovePreloadResourceTrialCharacter(r, e) {
    return (e || new RemovePreloadResourceTrialCharacter()).__init(r.readInt32(r.position()) + r.position(), r);
  }
  static getSizePrefixedRootAsRemovePreloadResourceTrialCharacter(r, e) {
    r.setPosition(r.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new RemovePreloadResourceTrialCharacter()).__init(r.readInt32(r.position()) + r.position(), r);
  }
  type(r) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, r);
    } else {
      return undefined;
    }
  }
  characterGroup(r) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + r * 4);
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
  static startRemovePreloadResourceTrialCharacter(r) {
    r.startObject(2);
  }
  static addType(r, e) {
    r.addFieldOffset(0, e, 0);
  }
  static addCharacterGroup(r, e) {
    r.addFieldOffset(1, e, 0);
  }
  static createCharacterGroupVector(e, t) {
    e.startVector(4, t.length, 4);
    for (let r = t.length - 1; r >= 0; r--) {
      e.addInt32(t[r]);
    }
    return e.endVector();
  }
  static startCharacterGroupVector(r, e) {
    r.startVector(4, e, 4);
  }
  static endRemovePreloadResourceTrialCharacter(r) {
    return r.endObject();
  }
  static createRemovePreloadResourceTrialCharacter(r, e, t) {
    RemovePreloadResourceTrialCharacter.startRemovePreloadResourceTrialCharacter(r);
    RemovePreloadResourceTrialCharacter.addType(r, e);
    RemovePreloadResourceTrialCharacter.addCharacterGroup(r, t);
    return RemovePreloadResourceTrialCharacter.endRemovePreloadResourceTrialCharacter(r);
  }
}
exports.RemovePreloadResourceTrialCharacter = RemovePreloadResourceTrialCharacter;
//# sourceMappingURL=remove-preload-resource-trial-character.js.map