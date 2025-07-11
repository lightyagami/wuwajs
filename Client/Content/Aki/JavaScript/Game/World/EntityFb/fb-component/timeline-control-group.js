"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimelineControlGroup = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const control_point_event_config_js_1 = require("../fb-component/control-point-event-config.js");
const condition_group_js_1 = require("../fb-condition/condition-group.js");
class TimelineControlGroup {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsTimelineControlGroup(t, i) {
    return (i || new TimelineControlGroup()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTimelineControlGroup(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new TimelineControlGroup()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  condition(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return (t || new condition_group_js_1.ConditionGroup()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  tidContent(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  segmentTime() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  controlConfigsType(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return this.bb.readUint8(this.bb.__vector(this.bb_pos + i) + t);
    } else {
      return 0;
    }
  }
  controlConfigsTypeLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  controlConfigsTypeArray() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  controlConfigs(t, i) {
    var o = this.bb.__offset(this.bb_pos, 12);
    if (o) {
      return this.bb.__union(i, this.bb.__vector(this.bb_pos + o) + t * 4);
    } else {
      return undefined;
    }
  }
  controlConfigsLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  controlPointEvents(t, i) {
    var o = this.bb.__offset(this.bb_pos, 14);
    if (o) {
      return (i || new control_point_event_config_js_1.ControlPointEventConfig()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + o) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  controlPointEventsLength() {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  description(t) {
    var i = this.bb.__offset(this.bb_pos, 16);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startTimelineControlGroup(t) {
    t.startObject(7);
  }
  static addCondition(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addTidContent(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addSegmentTime(t, i) {
    t.addFieldFloat32(2, i, 0);
  }
  static addControlConfigsType(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static createControlConfigsTypeVector(i, o) {
    i.startVector(1, o.length, 1);
    for (let t = o.length - 1; t >= 0; t--) {
      i.addInt8(o[t]);
    }
    return i.endVector();
  }
  static startControlConfigsTypeVector(t, i) {
    t.startVector(1, i, 1);
  }
  static addControlConfigs(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static createControlConfigsVector(i, o) {
    i.startVector(4, o.length, 4);
    for (let t = o.length - 1; t >= 0; t--) {
      i.addOffset(o[t]);
    }
    return i.endVector();
  }
  static startControlConfigsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addControlPointEvents(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static createControlPointEventsVector(i, o) {
    i.startVector(4, o.length, 4);
    for (let t = o.length - 1; t >= 0; t--) {
      i.addOffset(o[t]);
    }
    return i.endVector();
  }
  static startControlPointEventsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addDescription(t, i) {
    t.addFieldOffset(6, i, 0);
  }
  static endTimelineControlGroup(t) {
    return t.endObject();
  }
  static createTimelineControlGroup(t, i, o, r, n, e, s, l) {
    TimelineControlGroup.startTimelineControlGroup(t);
    TimelineControlGroup.addCondition(t, i);
    TimelineControlGroup.addTidContent(t, o);
    TimelineControlGroup.addSegmentTime(t, r);
    TimelineControlGroup.addControlConfigsType(t, n);
    TimelineControlGroup.addControlConfigs(t, e);
    TimelineControlGroup.addControlPointEvents(t, s);
    TimelineControlGroup.addDescription(t, l);
    return TimelineControlGroup.endTimelineControlGroup(t);
  }
}
exports.TimelineControlGroup = TimelineControlGroup;
//# sourceMappingURL=timeline-control-group.js.map