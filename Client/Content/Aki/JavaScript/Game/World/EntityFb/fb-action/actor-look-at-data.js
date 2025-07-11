"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActorLookAtData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ActorLookAtData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, o) {
    this.bb_pos = t;
    this.bb = o;
    return this;
  }
  static getRootAsActorLookAtData(t, o) {
    return (o || new ActorLookAtData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsActorLookAtData(t, o) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new ActorLookAtData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startActorLookAtData(t) {
    t.startObject(1);
  }
  static addType(t, o) {
    t.addFieldInt8(0, o, 0);
  }
  static endActorLookAtData(t) {
    return t.endObject();
  }
  static createActorLookAtData(t, o) {
    ActorLookAtData.startActorLookAtData(t);
    ActorLookAtData.addType(t, o);
    return ActorLookAtData.endActorLookAtData(t);
  }
}
exports.ActorLookAtData = ActorLookAtData;
//# sourceMappingURL=actor-look-at-data.js.map