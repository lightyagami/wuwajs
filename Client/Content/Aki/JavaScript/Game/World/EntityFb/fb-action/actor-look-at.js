"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActorLookAt = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_actor_look_at_data_js_1 = require("../fb-action/union-actor-look-at-data.js");
class ActorLookAt {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, o) {
    this.bb_pos = t;
    this.bb = o;
    return this;
  }
  static getRootAsActorLookAt(t, o) {
    return (o || new ActorLookAt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsActorLookAt(t, o) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new ActorLookAt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  actorIndex() {
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
      return union_actor_look_at_data_js_1.UnionActorLookAtData.NONE;
    }
  }
  target(t) {
    var o = this.bb.__offset(this.bb_pos, 8);
    if (o) {
      return this.bb.__union(t, this.bb_pos + o);
    } else {
      return undefined;
    }
  }
  delayTime() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startActorLookAt(t) {
    t.startObject(4);
  }
  static addActorIndex(t, o) {
    t.addFieldInt32(0, o, 0);
  }
  static addTargetType(t, o) {
    t.addFieldInt8(1, o, union_actor_look_at_data_js_1.UnionActorLookAtData.NONE);
  }
  static addTarget(t, o) {
    t.addFieldOffset(2, o, 0);
  }
  static addDelayTime(t, o) {
    t.addFieldFloat32(3, o, 0);
  }
  static endActorLookAt(t) {
    return t.endObject();
  }
  static createActorLookAt(t, o, r, s, a) {
    ActorLookAt.startActorLookAt(t);
    ActorLookAt.addActorIndex(t, o);
    ActorLookAt.addTargetType(t, r);
    ActorLookAt.addTarget(t, s);
    ActorLookAt.addDelayTime(t, a);
    return ActorLookAt.endActorLookAt(t);
  }
}
exports.ActorLookAt = ActorLookAt;
//# sourceMappingURL=actor-look-at.js.map