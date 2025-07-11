"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PatrolCycleLooply = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PatrolCycleLooply {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, o) {
    this.bb_pos = t;
    this.bb = o;
    return this;
  }
  static getRootAsPatrolCycleLooply(t, o) {
    return (o || new PatrolCycleLooply()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPatrolCycleLooply(t, o) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new PatrolCycleLooply()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var o = this.bb.__offset(this.bb_pos, 4);
    if (o) {
      return this.bb.__string(this.bb_pos + o, t);
    } else {
      return undefined;
    }
  }
  isCircle() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startPatrolCycleLooply(t) {
    t.startObject(2);
  }
  static addType(t, o) {
    t.addFieldOffset(0, o, 0);
  }
  static addIsCircle(t, o) {
    t.addFieldInt8(1, +o, 0);
  }
  static endPatrolCycleLooply(t) {
    return t.endObject();
  }
  static createPatrolCycleLooply(t, o, e) {
    PatrolCycleLooply.startPatrolCycleLooply(t);
    PatrolCycleLooply.addType(t, o);
    PatrolCycleLooply.addIsCircle(t, e);
    return PatrolCycleLooply.endPatrolCycleLooply(t);
  }
}
exports.PatrolCycleLooply = PatrolCycleLooply;
//# sourceMappingURL=patrol-cycle-looply.js.map