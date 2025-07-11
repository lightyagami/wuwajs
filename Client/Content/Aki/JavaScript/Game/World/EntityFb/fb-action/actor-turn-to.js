"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActorTurnTo = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_actor_turn_to_data_js_1 = require("../fb-action/union-actor-turn-to-data.js");
class ActorTurnTo {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsActorTurnTo(t, r) {
    return (r || new ActorTurnTo()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsActorTurnTo(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new ActorTurnTo()).__init(t.readInt32(t.position()) + t.position(), t);
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
      return union_actor_turn_to_data_js_1.UnionActorTurnToData.NONE;
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
  delayTime() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startActorTurnTo(t) {
    t.startObject(4);
  }
  static addActorIndex(t, r) {
    t.addFieldInt32(0, r, 0);
  }
  static addTargetType(t, r) {
    t.addFieldInt8(1, r, union_actor_turn_to_data_js_1.UnionActorTurnToData.NONE);
  }
  static addTarget(t, r) {
    t.addFieldOffset(2, r, 0);
  }
  static addDelayTime(t, r) {
    t.addFieldFloat32(3, r, 0);
  }
  static endActorTurnTo(t) {
    return t.endObject();
  }
  static createActorTurnTo(t, r, o, s, i) {
    ActorTurnTo.startActorTurnTo(t);
    ActorTurnTo.addActorIndex(t, r);
    ActorTurnTo.addTargetType(t, o);
    ActorTurnTo.addTarget(t, s);
    ActorTurnTo.addDelayTime(t, i);
    return ActorTurnTo.endActorTurnTo(t);
  }
}
exports.ActorTurnTo = ActorTurnTo;
//# sourceMappingURL=actor-turn-to.js.map