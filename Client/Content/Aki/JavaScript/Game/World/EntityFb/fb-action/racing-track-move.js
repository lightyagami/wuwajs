"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingTrackMove = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RacingTrackMove {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsRacingTrackMove(t, i) {
    return (i || new RacingTrackMove()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsRacingTrackMove(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new RacingTrackMove()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  maxOffsetDistance() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  isOneWay() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  layerVerticalLimit() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  directionAngleLimit() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startRacingTrackMove(t) {
    t.startObject(5);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addMaxOffsetDistance(t, i) {
    t.addFieldFloat32(1, i, 0);
  }
  static addIsOneWay(t, i) {
    t.addFieldInt8(2, +i, 0);
  }
  static addLayerVerticalLimit(t, i) {
    t.addFieldFloat32(3, i, 0);
  }
  static addDirectionAngleLimit(t, i) {
    t.addFieldFloat32(4, i, 0);
  }
  static endRacingTrackMove(t) {
    return t.endObject();
  }
  static createRacingTrackMove(t, i, a, e, r, s) {
    RacingTrackMove.startRacingTrackMove(t);
    RacingTrackMove.addType(t, i);
    RacingTrackMove.addMaxOffsetDistance(t, a);
    RacingTrackMove.addIsOneWay(t, e);
    RacingTrackMove.addLayerVerticalLimit(t, r);
    RacingTrackMove.addDirectionAngleLimit(t, s);
    return RacingTrackMove.endRacingTrackMove(t);
  }
}
exports.RacingTrackMove = RacingTrackMove;
//# sourceMappingURL=racing-track-move.js.map