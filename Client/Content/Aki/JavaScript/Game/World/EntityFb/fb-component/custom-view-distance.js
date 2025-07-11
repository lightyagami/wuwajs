"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomViewDistance = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CustomViewDistance {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsCustomViewDistance(t, s) {
    return (s || new CustomViewDistance()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCustomViewDistance(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new CustomViewDistance()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  distance() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startCustomViewDistance(t) {
    t.startObject(2);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addDistance(t, s) {
    t.addFieldInt32(1, s, 0);
  }
  static endCustomViewDistance(t) {
    return t.endObject();
  }
  static createCustomViewDistance(t, s, e) {
    CustomViewDistance.startCustomViewDistance(t);
    CustomViewDistance.addType(t, s);
    CustomViewDistance.addDistance(t, e);
    return CustomViewDistance.endCustomViewDistance(t);
  }
}
exports.CustomViewDistance = CustomViewDistance;
//# sourceMappingURL=custom-view-distance.js.map