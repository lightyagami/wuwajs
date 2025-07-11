"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActorTurnToEntityData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ActorTurnToEntityData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsActorTurnToEntityData(t, r) {
    return (r || new ActorTurnToEntityData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsActorTurnToEntityData(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new ActorTurnToEntityData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startActorTurnToEntityData(t) {
    t.startObject(2);
  }
  static addType(t, r) {
    t.addFieldInt8(0, r, 0);
  }
  static addEntityId(t, r) {
    t.addFieldInt32(1, r, 0);
  }
  static endActorTurnToEntityData(t) {
    return t.endObject();
  }
  static createActorTurnToEntityData(t, r, a) {
    ActorTurnToEntityData.startActorTurnToEntityData(t);
    ActorTurnToEntityData.addType(t, r);
    ActorTurnToEntityData.addEntityId(t, a);
    return ActorTurnToEntityData.endActorTurnToEntityData(t);
  }
}
exports.ActorTurnToEntityData = ActorTurnToEntityData;
//# sourceMappingURL=actor-turn-to-entity-data.js.map