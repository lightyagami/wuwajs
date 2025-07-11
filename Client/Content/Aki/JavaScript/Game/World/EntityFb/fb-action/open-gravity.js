"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenGravity = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class OpenGravity {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsOpenGravity(t, i) {
    return (i || new OpenGravity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsOpenGravity(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new OpenGravity()).__init(t.readInt32(t.position()) + t.position(), t);
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
  positionEntityId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startOpenGravity(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addEntityId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addPositionEntityId(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static endOpenGravity(t) {
    return t.endObject();
  }
  static createOpenGravity(t, i, e, r) {
    OpenGravity.startOpenGravity(t);
    OpenGravity.addType(t, i);
    OpenGravity.addEntityId(t, e);
    OpenGravity.addPositionEntityId(t, r);
    return OpenGravity.endOpenGravity(t);
  }
}
exports.OpenGravity = OpenGravity;
//# sourceMappingURL=open-gravity.js.map