"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActorIndexData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const pos_and_rot_js_1 = require("../fb-action/pos-and-rot.js");
class FlowActorIndexData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsFlowActorIndexData(t, s) {
    return (s || new FlowActorIndexData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFlowActorIndexData(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new FlowActorIndexData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  index() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  offset(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return (t || new pos_and_rot_js_1.PosAndRot()).__init(this.bb.__indirect(this.bb_pos + s), this.bb);
    } else {
      return undefined;
    }
  }
  static startFlowActorIndexData(t) {
    t.startObject(2);
  }
  static addIndex(t, s) {
    t.addFieldInt32(0, s, 0);
  }
  static addOffset(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static endFlowActorIndexData(t) {
    return t.endObject();
  }
}
exports.FlowActorIndexData = FlowActorIndexData;
//# sourceMappingURL=flow-actor-index-data.js.map