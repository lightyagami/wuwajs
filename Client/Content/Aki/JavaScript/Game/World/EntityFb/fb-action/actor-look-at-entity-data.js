"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActorLookAtEntityData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ActorLookAtEntityData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, o) {
    this.bb_pos = t;
    this.bb = o;
    return this;
  }
  static getRootAsActorLookAtEntityData(t, o) {
    return (o || new ActorLookAtEntityData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsActorLookAtEntityData(t, o) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new ActorLookAtEntityData()).__init(t.readInt32(t.position()) + t.position(), t);
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
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startActorLookAtEntityData(t) {
    t.startObject(3);
  }
  static addType(t, o) {
    t.addFieldInt8(0, o, 0);
  }
  static addLock(t, o) {
    t.addFieldInt8(1, +o, 0);
  }
  static addEntityId(t, o) {
    t.addFieldInt32(2, o, 0);
  }
  static endActorLookAtEntityData(t) {
    return t.endObject();
  }
  static createActorLookAtEntityData(t, o, i, a) {
    ActorLookAtEntityData.startActorLookAtEntityData(t);
    ActorLookAtEntityData.addType(t, o);
    ActorLookAtEntityData.addLock(t, i);
    ActorLookAtEntityData.addEntityId(t, a);
    return ActorLookAtEntityData.endActorLookAtEntityData(t);
  }
}
exports.ActorLookAtEntityData = ActorLookAtEntityData;
//# sourceMappingURL=actor-look-at-entity-data.js.map