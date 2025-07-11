"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityGroupFailureArbitraryState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EntityGroupFailureArbitraryState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsEntityGroupFailureArbitraryState(t, r) {
    return (r || new EntityGroupFailureArbitraryState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEntityGroupFailureArbitraryState(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new EntityGroupFailureArbitraryState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  state(t) {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  static startEntityGroupFailureArbitraryState(t) {
    t.startObject(2);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static addState(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static endEntityGroupFailureArbitraryState(t) {
    return t.endObject();
  }
  static createEntityGroupFailureArbitraryState(t, r, i) {
    EntityGroupFailureArbitraryState.startEntityGroupFailureArbitraryState(t);
    EntityGroupFailureArbitraryState.addType(t, r);
    EntityGroupFailureArbitraryState.addState(t, i);
    return EntityGroupFailureArbitraryState.endEntityGroupFailureArbitraryState(t);
  }
}
exports.EntityGroupFailureArbitraryState = EntityGroupFailureArbitraryState;
//# sourceMappingURL=entity-group-failure-arbitrary-state.js.map