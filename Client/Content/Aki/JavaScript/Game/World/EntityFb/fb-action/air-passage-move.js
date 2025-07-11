"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AirPassageMove = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AirPassageMove {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(s, t) {
    this.bb_pos = s;
    this.bb = t;
    return this;
  }
  static getRootAsAirPassageMove(s, t) {
    return (t || new AirPassageMove()).__init(s.readInt32(s.position()) + s.position(), s);
  }
  static getSizePrefixedRootAsAirPassageMove(s, t) {
    s.setPosition(s.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new AirPassageMove()).__init(s.readInt32(s.position()) + s.position(), s);
  }
  type(s) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, s);
    } else {
      return undefined;
    }
  }
  maxOffsetDistance() {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return this.bb.readFloat32(this.bb_pos + s);
    } else {
      return 0;
    }
  }
  isOneWay() {
    var s = this.bb.__offset(this.bb_pos, 8);
    return !!s && !!this.bb.readInt8(this.bb_pos + s);
  }
  layerVerticalLimit() {
    var s = this.bb.__offset(this.bb_pos, 10);
    if (s) {
      return this.bb.readFloat32(this.bb_pos + s);
    } else {
      return 0;
    }
  }
  static startAirPassageMove(s) {
    s.startObject(4);
  }
  static addType(s, t) {
    s.addFieldOffset(0, t, 0);
  }
  static addMaxOffsetDistance(s, t) {
    s.addFieldFloat32(1, t, 0);
  }
  static addIsOneWay(s, t) {
    s.addFieldInt8(2, +t, 0);
  }
  static addLayerVerticalLimit(s, t) {
    s.addFieldFloat32(3, t, 0);
  }
  static endAirPassageMove(s) {
    return s.endObject();
  }
  static createAirPassageMove(s, t, e, a, i) {
    AirPassageMove.startAirPassageMove(s);
    AirPassageMove.addType(s, t);
    AirPassageMove.addMaxOffsetDistance(s, e);
    AirPassageMove.addIsOneWay(s, a);
    AirPassageMove.addLayerVerticalLimit(s, i);
    return AirPassageMove.endAirPassageMove(s);
  }
}
exports.AirPassageMove = AirPassageMove;
//# sourceMappingURL=air-passage-move.js.map