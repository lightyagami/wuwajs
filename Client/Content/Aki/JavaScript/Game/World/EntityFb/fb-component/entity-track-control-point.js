"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityTrackControlPoint = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const condition_group_js_1 = require("../fb-condition/condition-group.js");
class EntityTrackControlPoint {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsEntityTrackControlPoint(t, i) {
    return (i || new EntityTrackControlPoint()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEntityTrackControlPoint(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new EntityTrackControlPoint()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  state(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  leftCondition(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return (t || new condition_group_js_1.ConditionGroup()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  rightCondition(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return (t || new condition_group_js_1.ConditionGroup()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  static startEntityTrackControlPoint(t) {
    t.startObject(3);
  }
  static addState(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addLeftCondition(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addRightCondition(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static endEntityTrackControlPoint(t) {
    return t.endObject();
  }
}
exports.EntityTrackControlPoint = EntityTrackControlPoint;
//# sourceMappingURL=entity-track-control-point.js.map