"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActorTurnToTalkerData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ActorTurnToTalkerData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsActorTurnToTalkerData(t, r) {
    return (r || new ActorTurnToTalkerData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsActorTurnToTalkerData(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new ActorTurnToTalkerData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startActorTurnToTalkerData(t) {
    t.startObject(1);
  }
  static addType(t, r) {
    t.addFieldInt8(0, r, 0);
  }
  static endActorTurnToTalkerData(t) {
    return t.endObject();
  }
  static createActorTurnToTalkerData(t, r) {
    ActorTurnToTalkerData.startActorTurnToTalkerData(t);
    ActorTurnToTalkerData.addType(t, r);
    return ActorTurnToTalkerData.endActorTurnToTalkerData(t);
  }
}
exports.ActorTurnToTalkerData = ActorTurnToTalkerData;
//# sourceMappingURL=actor-turn-to-talker-data.js.map