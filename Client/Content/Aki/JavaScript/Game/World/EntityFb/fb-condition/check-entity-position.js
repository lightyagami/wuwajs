"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckEntityPosition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_range_js_1 = require("../fb-shape/union-range.js");
class CheckEntityPosition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsCheckEntityPosition(t, i) {
    return (i || new CheckEntityPosition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCheckEntityPosition(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CheckEntityPosition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  rangeType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_range_js_1.UnionRange.NONE;
    }
  }
  range(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  isOnRange() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startCheckEntityPosition(t) {
    t.startObject(5);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addEntityId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addRangeType(t, i) {
    t.addFieldInt8(2, i, union_range_js_1.UnionRange.NONE);
  }
  static addRange(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addIsOnRange(t, i) {
    t.addFieldInt8(4, +i, 0);
  }
  static endCheckEntityPosition(t) {
    return t.endObject();
  }
  static createCheckEntityPosition(t, i, s, n, e, o) {
    CheckEntityPosition.startCheckEntityPosition(t);
    CheckEntityPosition.addType(t, i);
    CheckEntityPosition.addEntityId(t, s);
    CheckEntityPosition.addRangeType(t, n);
    CheckEntityPosition.addRange(t, e);
    CheckEntityPosition.addIsOnRange(t, o);
    return CheckEntityPosition.endCheckEntityPosition(t);
  }
}
exports.CheckEntityPosition = CheckEntityPosition;
//# sourceMappingURL=check-entity-position.js.map