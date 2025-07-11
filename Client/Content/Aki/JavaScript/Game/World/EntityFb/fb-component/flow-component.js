"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const play_flow_js_1 = require("../fb-action/play-flow.js");
class FlowComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsFlowComponent(t, e) {
    return (e || new FlowComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFlowComponent(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new FlowComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  initState(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return (t || new play_flow_js_1.PlayFlow()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  static startFlowComponent(t) {
    t.startObject(2);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addInitState(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endFlowComponent(t) {
    return t.endObject();
  }
}
exports.FlowComponent = FlowComponent;
//# sourceMappingURL=flow-component.js.map