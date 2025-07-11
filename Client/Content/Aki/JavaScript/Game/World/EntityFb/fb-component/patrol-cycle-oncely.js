"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PatrolCycleOncely = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PatrolCycleOncely {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsPatrolCycleOncely(t, e) {
    return (e || new PatrolCycleOncely()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPatrolCycleOncely(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new PatrolCycleOncely()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startPatrolCycleOncely(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endPatrolCycleOncely(t) {
    return t.endObject();
  }
  static createPatrolCycleOncely(t, e) {
    PatrolCycleOncely.startPatrolCycleOncely(t);
    PatrolCycleOncely.addType(t, e);
    return PatrolCycleOncely.endPatrolCycleOncely(t);
  }
}
exports.PatrolCycleOncely = PatrolCycleOncely;
//# sourceMappingURL=patrol-cycle-oncely.js.map