"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeLiftTarget = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangeLiftTarget {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsChangeLiftTarget(t, e) {
    return (e || new ChangeLiftTarget()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsChangeLiftTarget(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ChangeLiftTarget()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  isSelf() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  location() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startChangeLiftTarget(t) {
    t.startObject(3);
  }
  static addIsSelf(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addEntityId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addLocation(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static endChangeLiftTarget(t) {
    return t.endObject();
  }
  static createChangeLiftTarget(t, e, i, a) {
    ChangeLiftTarget.startChangeLiftTarget(t);
    ChangeLiftTarget.addIsSelf(t, e);
    ChangeLiftTarget.addEntityId(t, i);
    ChangeLiftTarget.addLocation(t, a);
    return ChangeLiftTarget.endChangeLiftTarget(t);
  }
}
exports.ChangeLiftTarget = ChangeLiftTarget;
//# sourceMappingURL=change-lift-target.js.map