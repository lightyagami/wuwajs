"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeEntityState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangeEntityState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsChangeEntityState(t, e) {
    return (e || new ChangeEntityState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsChangeEntityState(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ChangeEntityState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
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
  static startChangeEntityState(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEntityId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endChangeEntityState(t) {
    return t.endObject();
  }
  static createChangeEntityState(t, e, i) {
    ChangeEntityState.startChangeEntityState(t);
    ChangeEntityState.addType(t, e);
    ChangeEntityState.addEntityId(t, i);
    return ChangeEntityState.endChangeEntityState(t);
  }
}
exports.ChangeEntityState = ChangeEntityState;
//# sourceMappingURL=change-entity-state.js.map