"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoveGuestCharacter = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RemoveGuestCharacter {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsRemoveGuestCharacter(e, t) {
    return (t || new RemoveGuestCharacter()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsRemoveGuestCharacter(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new RemoveGuestCharacter()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  guestCharacterId() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startRemoveGuestCharacter(e) {
    e.startObject(1);
  }
  static addGuestCharacterId(e, t) {
    e.addFieldInt32(0, t, 0);
  }
  static endRemoveGuestCharacter(e) {
    return e.endObject();
  }
  static createRemoveGuestCharacter(e, t) {
    RemoveGuestCharacter.startRemoveGuestCharacter(e);
    RemoveGuestCharacter.addGuestCharacterId(e, t);
    return RemoveGuestCharacter.endRemoveGuestCharacter(e);
  }
}
exports.RemoveGuestCharacter = RemoveGuestCharacter;
//# sourceMappingURL=remove-guest-character.js.map