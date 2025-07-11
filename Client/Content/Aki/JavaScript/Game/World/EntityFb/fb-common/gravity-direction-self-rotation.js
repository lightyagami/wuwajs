"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GravityDirectionSelfRotation = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class GravityDirectionSelfRotation {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsGravityDirectionSelfRotation(t, i) {
    return (i || new GravityDirectionSelfRotation()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsGravityDirectionSelfRotation(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new GravityDirectionSelfRotation()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startGravityDirectionSelfRotation(t) {
    t.startObject(1);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static endGravityDirectionSelfRotation(t) {
    return t.endObject();
  }
  static createGravityDirectionSelfRotation(t, i) {
    GravityDirectionSelfRotation.startGravityDirectionSelfRotation(t);
    GravityDirectionSelfRotation.addType(t, i);
    return GravityDirectionSelfRotation.endGravityDirectionSelfRotation(t);
  }
}
exports.GravityDirectionSelfRotation = GravityDirectionSelfRotation;
//# sourceMappingURL=gravity-direction-self-rotation.js.map