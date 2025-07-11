"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SlideTrackMove = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SlideTrackMove {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSlideTrackMove(t, e) {
    return (e || new SlideTrackMove()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSlideTrackMove(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SlideTrackMove()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
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
  edgeLimitCurveFactor() {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startSlideTrackMove(t) {
    t.startObject(6);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addMaxOffsetDistance(t, e) {
    t.addFieldFloat32(1, e, 0);
  }
  static addIsOneWay(t, e) {
    t.addFieldInt8(2, +e, 0);
  }
  static addLayerVerticalLimit(t, e) {
    t.addFieldFloat32(3, e, 0);
  }
  static addDirectionAngleLimit(t, e) {
    t.addFieldFloat32(4, e, 0);
  }
  static addEdgeLimitCurveFactor(t, e) {
    t.addFieldFloat32(5, e, 0);
  }
  static endSlideTrackMove(t) {
    return t.endObject();
  }
  static createSlideTrackMove(t, e, i, r, s, a, c) {
    SlideTrackMove.startSlideTrackMove(t);
    SlideTrackMove.addType(t, e);
    SlideTrackMove.addMaxOffsetDistance(t, i);
    SlideTrackMove.addIsOneWay(t, r);
    SlideTrackMove.addLayerVerticalLimit(t, s);
    SlideTrackMove.addDirectionAngleLimit(t, a);
    SlideTrackMove.addEdgeLimitCurveFactor(t, c);
    return SlideTrackMove.endSlideTrackMove(t);
  }
}
exports.SlideTrackMove = SlideTrackMove;
//# sourceMappingURL=slide-track-move.js.map