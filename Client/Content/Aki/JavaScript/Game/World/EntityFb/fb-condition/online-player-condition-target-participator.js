"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnlinePlayerConditionTargetParticipator = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class OnlinePlayerConditionTargetParticipator {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsOnlinePlayerConditionTargetParticipator(t, i) {
    return (i || new OnlinePlayerConditionTargetParticipator()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsOnlinePlayerConditionTargetParticipator(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new OnlinePlayerConditionTargetParticipator()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  anyPlayer() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startOnlinePlayerConditionTargetParticipator(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addAnyPlayer(t, i) {
    t.addFieldInt8(1, +i, 0);
  }
  static endOnlinePlayerConditionTargetParticipator(t) {
    return t.endObject();
  }
  static createOnlinePlayerConditionTargetParticipator(t, i, r) {
    OnlinePlayerConditionTargetParticipator.startOnlinePlayerConditionTargetParticipator(t);
    OnlinePlayerConditionTargetParticipator.addType(t, i);
    OnlinePlayerConditionTargetParticipator.addAnyPlayer(t, r);
    return OnlinePlayerConditionTargetParticipator.endOnlinePlayerConditionTargetParticipator(t);
  }
}
exports.OnlinePlayerConditionTargetParticipator = OnlinePlayerConditionTargetParticipator;
//# sourceMappingURL=online-player-condition-target-participator.js.map