"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityTurnTo = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_actor_turn_to_data_js_1 = require("../fb-action/union-actor-turn-to-data.js");
class EntityTurnTo {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsEntityTurnTo(t, r) {
    return (r || new EntityTurnTo()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEntityTurnTo(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new EntityTurnTo()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  entityId() {
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
  static startEntityTurnTo(t) {
    t.startObject(3);
  }
  static addEntityId(t, r) {
    t.addFieldInt32(0, r, 0);
  }
  static addTargetType(t, r) {
    t.addFieldInt8(1, r, union_actor_turn_to_data_js_1.UnionActorTurnToData.NONE);
  }
  static addTarget(t, r) {
    t.addFieldOffset(2, r, 0);
  }
  static endEntityTurnTo(t) {
    return t.endObject();
  }
  static createEntityTurnTo(t, r, i, n) {
    EntityTurnTo.startEntityTurnTo(t);
    EntityTurnTo.addEntityId(t, r);
    EntityTurnTo.addTargetType(t, i);
    EntityTurnTo.addTarget(t, n);
    return EntityTurnTo.endEntityTurnTo(t);
  }
}
exports.EntityTurnTo = EntityTurnTo;
//# sourceMappingURL=entity-turn-to.js.map