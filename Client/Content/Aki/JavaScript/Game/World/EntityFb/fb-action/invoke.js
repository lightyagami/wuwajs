"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Invoke = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_info_js_1 = require("../fb-action/action-info.js");
class Invoke {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsInvoke(t, i) {
    return (i || new Invoke()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsInvoke(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new Invoke()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  who() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  actionInfo(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return (t || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  static startInvoke(t) {
    t.startObject(2);
  }
  static addWho(t, i) {
    t.addFieldInt32(0, i, 0);
  }
  static addActionInfo(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endInvoke(t) {
    return t.endObject();
  }
}
exports.Invoke = Invoke;
//# sourceMappingURL=invoke.js.map