"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActorRef = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ActorRef {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsActorRef(t, r) {
    return (r || new ActorRef()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsActorRef(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new ActorRef()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  actorName(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  pathName(t) {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  platform(t) {
    var r = this.bb.__offset(this.bb_pos, 8);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  static startActorRef(t) {
    t.startObject(3);
  }
  static addActorName(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static addPathName(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static addPlatform(t, r) {
    t.addFieldOffset(2, r, 0);
  }
  static endActorRef(t) {
    return t.endObject();
  }
  static createActorRef(t, r, e, s) {
    ActorRef.startActorRef(t);
    ActorRef.addActorName(t, r);
    ActorRef.addPathName(t, e);
    ActorRef.addPlatform(t, s);
    return ActorRef.endActorRef(t);
  }
}
exports.ActorRef = ActorRef;
//# sourceMappingURL=actor-ref.js.map