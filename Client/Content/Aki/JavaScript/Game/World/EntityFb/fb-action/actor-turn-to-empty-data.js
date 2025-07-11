"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActorTurnToEmptyData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ActorTurnToEmptyData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsActorTurnToEmptyData(t, r) {
    return (r || new ActorTurnToEmptyData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsActorTurnToEmptyData(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new ActorTurnToEmptyData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startActorTurnToEmptyData(t) {
    t.startObject(1);
  }
  static addType(t, r) {
    t.addFieldInt8(0, r, 0);
  }
  static endActorTurnToEmptyData(t) {
    return t.endObject();
  }
  static createActorTurnToEmptyData(t, r) {
    ActorTurnToEmptyData.startActorTurnToEmptyData(t);
    ActorTurnToEmptyData.addType(t, r);
    return ActorTurnToEmptyData.endActorTurnToEmptyData(t);
  }
}
exports.ActorTurnToEmptyData = ActorTurnToEmptyData;
//# sourceMappingURL=actor-turn-to-empty-data.js.map