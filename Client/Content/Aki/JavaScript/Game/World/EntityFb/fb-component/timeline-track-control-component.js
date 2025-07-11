"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimelineTrackControlComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const timeline_control_group_js_1 = require("../fb-component/timeline-control-group.js");
class TimelineTrackControlComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, o) {
    this.bb_pos = t;
    this.bb = o;
    return this;
  }
  static getRootAsTimelineTrackControlComponent(t, o) {
    return (o || new TimelineTrackControlComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTimelineTrackControlComponent(t, o) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new TimelineTrackControlComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  controlGroups(t, o) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return (o || new timeline_control_group_js_1.TimelineControlGroup()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  controlGroupsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startTimelineTrackControlComponent(t) {
    t.startObject(2);
  }
  static addDisabled(t, o) {
    t.addFieldInt8(0, +o, 0);
  }
  static addControlGroups(t, o) {
    t.addFieldOffset(1, o, 0);
  }
  static createControlGroupsVector(o, e) {
    o.startVector(4, e.length, 4);
    for (let t = e.length - 1; t >= 0; t--) {
      o.addOffset(e[t]);
    }
    return o.endVector();
  }
  static startControlGroupsVector(t, o) {
    t.startVector(4, o, 4);
  }
  static endTimelineTrackControlComponent(t) {
    return t.endObject();
  }
  static createTimelineTrackControlComponent(t, o, e) {
    TimelineTrackControlComponent.startTimelineTrackControlComponent(t);
    TimelineTrackControlComponent.addDisabled(t, o);
    TimelineTrackControlComponent.addControlGroups(t, e);
    return TimelineTrackControlComponent.endTimelineTrackControlComponent(t);
  }
}
exports.TimelineTrackControlComponent = TimelineTrackControlComponent;
//# sourceMappingURL=timeline-track-control-component.js.map