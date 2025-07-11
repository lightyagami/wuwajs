"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreloadFlows = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const play_flow_js_1 = require("../fb-action/play-flow.js");
class PreloadFlows {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsPreloadFlows(t, s) {
    return (s || new PreloadFlows()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPreloadFlows(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new PreloadFlows()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  flowData(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return (t || new play_flow_js_1.PlayFlow()).__init(this.bb.__indirect(this.bb_pos + s), this.bb);
    } else {
      return undefined;
    }
  }
  static startPreloadFlows(t) {
    t.startObject(2);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addFlowData(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static endPreloadFlows(t) {
    return t.endObject();
  }
}
exports.PreloadFlows = PreloadFlows;
//# sourceMappingURL=preload-flows.js.map