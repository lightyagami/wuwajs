"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TriggerRangeStartCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TriggerRangeStartCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsTriggerRangeStartCondition(t, r) {
    return (r || new TriggerRangeStartCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTriggerRangeStartCondition(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new TriggerRangeStartCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  range() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startTriggerRangeStartCondition(t) {
    t.startObject(2);
  }
  static addType(t, r) {
    t.addFieldInt8(0, r, 0);
  }
  static addRange(t, r) {
    t.addFieldInt32(1, r, 0);
  }
  static endTriggerRangeStartCondition(t) {
    return t.endObject();
  }
  static createTriggerRangeStartCondition(t, r, i) {
    TriggerRangeStartCondition.startTriggerRangeStartCondition(t);
    TriggerRangeStartCondition.addType(t, r);
    TriggerRangeStartCondition.addRange(t, i);
    return TriggerRangeStartCondition.endTriggerRangeStartCondition(t);
  }
}
exports.TriggerRangeStartCondition = TriggerRangeStartCondition;
//# sourceMappingURL=trigger-range-start-condition.js.map