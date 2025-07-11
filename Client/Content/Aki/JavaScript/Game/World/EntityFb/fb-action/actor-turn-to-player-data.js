"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActorTurnToPlayerData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ActorTurnToPlayerData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsActorTurnToPlayerData(t, r) {
    return (r || new ActorTurnToPlayerData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsActorTurnToPlayerData(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new ActorTurnToPlayerData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startActorTurnToPlayerData(t) {
    t.startObject(1);
  }
  static addType(t, r) {
    t.addFieldInt8(0, r, 0);
  }
  static endActorTurnToPlayerData(t) {
    return t.endObject();
  }
  static createActorTurnToPlayerData(t, r) {
    ActorTurnToPlayerData.startActorTurnToPlayerData(t);
    ActorTurnToPlayerData.addType(t, r);
    return ActorTurnToPlayerData.endActorTurnToPlayerData(t);
  }
}
exports.ActorTurnToPlayerData = ActorTurnToPlayerData;
//# sourceMappingURL=actor-turn-to-player-data.js.map