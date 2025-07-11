"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActorRefVolume = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ActorRefVolume {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsActorRefVolume(t, e) {
    return (e || new ActorRefVolume()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsActorRefVolume(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ActorRefVolume()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startActorRefVolume(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endActorRefVolume(t) {
    return t.endObject();
  }
  static createActorRefVolume(t, e) {
    ActorRefVolume.startActorRefVolume(t);
    ActorRefVolume.addType(t, e);
    return ActorRefVolume.endActorRefVolume(t);
  }
}
exports.ActorRefVolume = ActorRefVolume;
//# sourceMappingURL=actor-ref-volume.js.map