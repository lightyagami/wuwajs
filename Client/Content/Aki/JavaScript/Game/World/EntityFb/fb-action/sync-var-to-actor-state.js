"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SyncVarToActorState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SyncVarToActorState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsSyncVarToActorState(t, r) {
    return (r || new SyncVarToActorState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSyncVarToActorState(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new SyncVarToActorState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  varName(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  stateKey(t) {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  static startSyncVarToActorState(t) {
    t.startObject(2);
  }
  static addVarName(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static addStateKey(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static endSyncVarToActorState(t) {
    return t.endObject();
  }
  static createSyncVarToActorState(t, r, a) {
    SyncVarToActorState.startSyncVarToActorState(t);
    SyncVarToActorState.addVarName(t, r);
    SyncVarToActorState.addStateKey(t, a);
    return SyncVarToActorState.endSyncVarToActorState(t);
  }
}
exports.SyncVarToActorState = SyncVarToActorState;
//# sourceMappingURL=sync-var-to-actor-state.js.map