"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetAreaTimeState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_set_area_time_type_js_1 = require("../fb-action/union-set-area-time-type.js");
class SetAreaTimeState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsSetAreaTimeState(e, t) {
    return (t || new SetAreaTimeState()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsSetAreaTimeState(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new SetAreaTimeState()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  setAreaTimeConfigType() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_set_area_time_type_js_1.UnionSetAreaTimeType.NONE;
    }
  }
  setAreaTimeConfig(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__union(e, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  static startSetAreaTimeState(e) {
    e.startObject(2);
  }
  static addSetAreaTimeConfigType(e, t) {
    e.addFieldInt8(0, t, union_set_area_time_type_js_1.UnionSetAreaTimeType.NONE);
  }
  static addSetAreaTimeConfig(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endSetAreaTimeState(e) {
    return e.endObject();
  }
  static createSetAreaTimeState(e, t, i) {
    SetAreaTimeState.startSetAreaTimeState(e);
    SetAreaTimeState.addSetAreaTimeConfigType(e, t);
    SetAreaTimeState.addSetAreaTimeConfig(e, i);
    return SetAreaTimeState.endSetAreaTimeState(e);
  }
}
exports.SetAreaTimeState = SetAreaTimeState;
//# sourceMappingURL=set-area-time-state.js.map