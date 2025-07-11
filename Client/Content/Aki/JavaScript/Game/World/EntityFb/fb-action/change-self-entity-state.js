"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeSelfEntityState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangeSelfEntityState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsChangeSelfEntityState(t, e) {
    return (e || new ChangeSelfEntityState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsChangeSelfEntityState(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ChangeSelfEntityState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  entityState(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startChangeSelfEntityState(t) {
    t.startObject(1);
  }
  static addEntityState(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endChangeSelfEntityState(t) {
    return t.endObject();
  }
  static createChangeSelfEntityState(t, e) {
    ChangeSelfEntityState.startChangeSelfEntityState(t);
    ChangeSelfEntityState.addEntityState(t, e);
    return ChangeSelfEntityState.endChangeSelfEntityState(t);
  }
}
exports.ChangeSelfEntityState = ChangeSelfEntityState;
//# sourceMappingURL=change-self-entity-state.js.map