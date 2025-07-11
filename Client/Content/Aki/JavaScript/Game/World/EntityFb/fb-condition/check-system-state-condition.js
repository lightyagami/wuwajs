"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckSystemStateCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_check_system_state_js_1 = require("../fb-condition/union-check-system-state.js");
class CheckSystemStateCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsCheckSystemStateCondition(t, e) {
    return (e || new CheckSystemStateCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCheckSystemStateCondition(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new CheckSystemStateCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  configType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_check_system_state_js_1.UnionCheckSystemState.NONE;
    }
  }
  config(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startCheckSystemStateCondition(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addConfigType(t, e) {
    t.addFieldInt8(1, e, union_check_system_state_js_1.UnionCheckSystemState.NONE);
  }
  static addConfig(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endCheckSystemStateCondition(t) {
    return t.endObject();
  }
  static createCheckSystemStateCondition(t, e, i, s) {
    CheckSystemStateCondition.startCheckSystemStateCondition(t);
    CheckSystemStateCondition.addType(t, e);
    CheckSystemStateCondition.addConfigType(t, i);
    CheckSystemStateCondition.addConfig(t, s);
    return CheckSystemStateCondition.endCheckSystemStateCondition(t);
  }
}
exports.CheckSystemStateCondition = CheckSystemStateCondition;
//# sourceMappingURL=check-system-state-condition.js.map