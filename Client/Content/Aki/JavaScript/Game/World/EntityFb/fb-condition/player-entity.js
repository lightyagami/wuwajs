"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerEntity = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PlayerEntity {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsPlayerEntity(t, e) {
    return (e || new PlayerEntity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPlayerEntity(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new PlayerEntity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startPlayerEntity(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endPlayerEntity(t) {
    return t.endObject();
  }
  static createPlayerEntity(t, e) {
    PlayerEntity.startPlayerEntity(t);
    PlayerEntity.addType(t, e);
    return PlayerEntity.endPlayerEntity(t);
  }
}
exports.PlayerEntity = PlayerEntity;
//# sourceMappingURL=player-entity.js.map