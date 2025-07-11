"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayFlow = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PlayFlow {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsPlayFlow(t, s) {
    return (s || new PlayFlow()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPlayFlow(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new PlayFlow()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  flowListName(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  flowId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  stateId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  flowGuid(t) {
    var s = this.bb.__offset(this.bb_pos, 10);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  static startPlayFlow(t) {
    t.startObject(4);
  }
  static addFlowListName(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addFlowId(t, s) {
    t.addFieldInt32(1, s, 0);
  }
  static addStateId(t, s) {
    t.addFieldInt32(2, s, 0);
  }
  static addFlowGuid(t, s) {
    t.addFieldOffset(3, s, 0);
  }
  static endPlayFlow(t) {
    return t.endObject();
  }
  static createPlayFlow(t, s, i, a, l) {
    PlayFlow.startPlayFlow(t);
    PlayFlow.addFlowListName(t, s);
    PlayFlow.addFlowId(t, i);
    PlayFlow.addStateId(t, a);
    PlayFlow.addFlowGuid(t, l);
    return PlayFlow.endPlayFlow(t);
  }
}
exports.PlayFlow = PlayFlow;
//# sourceMappingURL=play-flow.js.map