"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActorLookAtOtherActor = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ActorLookAtOtherActor {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsActorLookAtOtherActor(t, r) {
    return (r || new ActorLookAtOtherActor()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsActorLookAtOtherActor(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new ActorLookAtOtherActor()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  lock() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  actorIndex() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startActorLookAtOtherActor(t) {
    t.startObject(3);
  }
  static addType(t, r) {
    t.addFieldInt8(0, r, 0);
  }
  static addLock(t, r) {
    t.addFieldInt8(1, +r, 0);
  }
  static addActorIndex(t, r) {
    t.addFieldInt32(2, r, 0);
  }
  static endActorLookAtOtherActor(t) {
    return t.endObject();
  }
  static createActorLookAtOtherActor(t, r, o, e) {
    ActorLookAtOtherActor.startActorLookAtOtherActor(t);
    ActorLookAtOtherActor.addType(t, r);
    ActorLookAtOtherActor.addLock(t, o);
    ActorLookAtOtherActor.addActorIndex(t, e);
    return ActorLookAtOtherActor.endActorLookAtOtherActor(t);
  }
}
exports.ActorLookAtOtherActor = ActorLookAtOtherActor;
//# sourceMappingURL=actor-look-at-other-actor.js.map