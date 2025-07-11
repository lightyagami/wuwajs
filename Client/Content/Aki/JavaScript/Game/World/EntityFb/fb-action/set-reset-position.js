"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetResetPosition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SetResetPosition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSetResetPosition(t, e) {
    return (e || new SetResetPosition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSetResetPosition(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SetResetPosition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
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
  positionEntityId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startSetResetPosition(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEntityId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addPositionEntityId(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static endSetResetPosition(t) {
    return t.endObject();
  }
  static createSetResetPosition(t, e, s, i) {
    SetResetPosition.startSetResetPosition(t);
    SetResetPosition.addType(t, e);
    SetResetPosition.addEntityId(t, s);
    SetResetPosition.addPositionEntityId(t, i);
    return SetResetPosition.endSetResetPosition(t);
  }
}
exports.SetResetPosition = SetResetPosition;
//# sourceMappingURL=set-reset-position.js.map