"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractFlow = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const play_flow_js_1 = require("../fb-action/play-flow.js");
class InteractFlow {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsInteractFlow(t, e) {
    return (e || new InteractFlow()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsInteractFlow(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new InteractFlow()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  flow(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return (t || new play_flow_js_1.PlayFlow()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  static startInteractFlow(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addFlow(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endInteractFlow(t) {
    return t.endObject();
  }
}
exports.InteractFlow = InteractFlow;
//# sourceMappingURL=interact-flow.js.map