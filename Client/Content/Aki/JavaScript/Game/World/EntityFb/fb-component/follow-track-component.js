"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FollowTrackComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_follow_track_end_option_js_1 = require("../fb-component/union-follow-track-end-option.js");
class FollowTrackComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, o) {
    this.bb_pos = t;
    this.bb = o;
    return this;
  }
  static getRootAsFollowTrackComponent(t, o) {
    return (o || new FollowTrackComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFollowTrackComponent(t, o) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new FollowTrackComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  range() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  splineEntityId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  endTypeType() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_follow_track_end_option_js_1.UnionFollowTrackEndOption.NONE;
    }
  }
  endType(t) {
    var o = this.bb.__offset(this.bb_pos, 12);
    if (o) {
      return this.bb.__union(t, this.bb_pos + o);
    } else {
      return undefined;
    }
  }
  static startFollowTrackComponent(t) {
    t.startObject(5);
  }
  static addDisabled(t, o) {
    t.addFieldInt8(0, +o, 0);
  }
  static addRange(t, o) {
    t.addFieldFloat32(1, o, 0);
  }
  static addSplineEntityId(t, o) {
    t.addFieldInt32(2, o, 0);
  }
  static addEndTypeType(t, o) {
    t.addFieldInt8(3, o, union_follow_track_end_option_js_1.UnionFollowTrackEndOption.NONE);
  }
  static addEndType(t, o) {
    t.addFieldOffset(4, o, 0);
  }
  static endFollowTrackComponent(t) {
    return t.endObject();
  }
  static createFollowTrackComponent(t, o, n, e, r, i) {
    FollowTrackComponent.startFollowTrackComponent(t);
    FollowTrackComponent.addDisabled(t, o);
    FollowTrackComponent.addRange(t, n);
    FollowTrackComponent.addSplineEntityId(t, e);
    FollowTrackComponent.addEndTypeType(t, r);
    FollowTrackComponent.addEndType(t, i);
    return FollowTrackComponent.endFollowTrackComponent(t);
  }
}
exports.FollowTrackComponent = FollowTrackComponent;
//# sourceMappingURL=follow-track-component.js.map