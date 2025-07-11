"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoveTrialFollowShooter = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RemoveTrialFollowShooter {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(o, e) {
    this.bb_pos = o;
    this.bb = e;
    return this;
  }
  static getRootAsRemoveTrialFollowShooter(o, e) {
    return (e || new RemoveTrialFollowShooter()).__init(o.readInt32(o.position()) + o.position(), o);
  }
  static getSizePrefixedRootAsRemoveTrialFollowShooter(o, e) {
    o.setPosition(o.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new RemoveTrialFollowShooter()).__init(o.readInt32(o.position()) + o.position(), o);
  }
  id() {
    var o = this.bb.__offset(this.bb_pos, 4);
    if (o) {
      return this.bb.readInt32(this.bb_pos + o);
    } else {
      return 0;
    }
  }
  static startRemoveTrialFollowShooter(o) {
    o.startObject(1);
  }
  static addId(o, e) {
    o.addFieldInt32(0, e, 0);
  }
  static endRemoveTrialFollowShooter(o) {
    return o.endObject();
  }
  static createRemoveTrialFollowShooter(o, e) {
    RemoveTrialFollowShooter.startRemoveTrialFollowShooter(o);
    RemoveTrialFollowShooter.addId(o, e);
    return RemoveTrialFollowShooter.endRemoveTrialFollowShooter(o);
  }
}
exports.RemoveTrialFollowShooter = RemoveTrialFollowShooter;
//# sourceMappingURL=remove-trial-follow-shooter.js.map