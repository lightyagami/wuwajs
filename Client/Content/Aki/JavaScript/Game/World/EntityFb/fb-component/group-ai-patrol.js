"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupAiPatrol = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class GroupAiPatrol {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsGroupAiPatrol(t, r) {
    return (r || new GroupAiPatrol()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsGroupAiPatrol(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new GroupAiPatrol()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  leader() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
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
  static startGroupAiPatrol(t) {
    t.startObject(3);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static addLeader(t, r) {
    t.addFieldInt32(1, r, 0);
  }
  static addSplineEntityId(t, r) {
    t.addFieldInt32(2, r, 0);
  }
  static endGroupAiPatrol(t) {
    return t.endObject();
  }
  static createGroupAiPatrol(t, r, i, s) {
    GroupAiPatrol.startGroupAiPatrol(t);
    GroupAiPatrol.addType(t, r);
    GroupAiPatrol.addLeader(t, i);
    GroupAiPatrol.addSplineEntityId(t, s);
    return GroupAiPatrol.endGroupAiPatrol(t);
  }
}
exports.GroupAiPatrol = GroupAiPatrol;
//# sourceMappingURL=group-ai-patrol.js.map