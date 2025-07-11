"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowIndex = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FlowIndex {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsFlowIndex(t, e) {
    return (e || new FlowIndex()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFlowIndex(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new FlowIndex()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  flowListName(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
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
  static startFlowIndex(t) {
    t.startObject(2);
  }
  static addFlowListName(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addFlowId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endFlowIndex(t) {
    return t.endObject();
  }
  static createFlowIndex(t, e, s) {
    FlowIndex.startFlowIndex(t);
    FlowIndex.addFlowListName(t, e);
    FlowIndex.addFlowId(t, s);
    return FlowIndex.endFlowIndex(t);
  }
}
exports.FlowIndex = FlowIndex;
//# sourceMappingURL=flow-index.js.map