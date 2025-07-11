"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EntityState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsEntityState(t, e) {
    return (e || new EntityState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEntityState(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new EntityState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  state(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startEntityState(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addState(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endEntityState(t) {
    return t.endObject();
  }
  static createEntityState(t, e, i) {
    EntityState.startEntityState(t);
    EntityState.addType(t, e);
    EntityState.addState(t, i);
    return EntityState.endEntityState(t);
  }
}
exports.EntityState = EntityState;
//# sourceMappingURL=entity-state.js.map