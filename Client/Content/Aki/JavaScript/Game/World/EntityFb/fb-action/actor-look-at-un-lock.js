"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActorLookAtUnLock = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ActorLookAtUnLock {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, o) {
    this.bb_pos = t;
    this.bb = o;
    return this;
  }
  static getRootAsActorLookAtUnLock(t, o) {
    return (o || new ActorLookAtUnLock()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsActorLookAtUnLock(t, o) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new ActorLookAtUnLock()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startActorLookAtUnLock(t) {
    t.startObject(1);
  }
  static addType(t, o) {
    t.addFieldInt8(0, o, 0);
  }
  static endActorLookAtUnLock(t) {
    return t.endObject();
  }
  static createActorLookAtUnLock(t, o) {
    ActorLookAtUnLock.startActorLookAtUnLock(t);
    ActorLookAtUnLock.addType(t, o);
    return ActorLookAtUnLock.endActorLookAtUnLock(t);
  }
}
exports.ActorLookAtUnLock = ActorLookAtUnLock;
//# sourceMappingURL=actor-look-at-un-lock.js.map