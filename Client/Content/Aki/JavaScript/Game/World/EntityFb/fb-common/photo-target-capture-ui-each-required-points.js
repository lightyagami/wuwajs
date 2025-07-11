"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotoTargetCaptureUiEachRequiredPoints = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PhotoTargetCaptureUiEachRequiredPoints {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsPhotoTargetCaptureUiEachRequiredPoints(t, e) {
    return (e || new PhotoTargetCaptureUiEachRequiredPoints()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPhotoTargetCaptureUiEachRequiredPoints(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new PhotoTargetCaptureUiEachRequiredPoints()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startPhotoTargetCaptureUiEachRequiredPoints(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endPhotoTargetCaptureUiEachRequiredPoints(t) {
    return t.endObject();
  }
  static createPhotoTargetCaptureUiEachRequiredPoints(t, e) {
    PhotoTargetCaptureUiEachRequiredPoints.startPhotoTargetCaptureUiEachRequiredPoints(t);
    PhotoTargetCaptureUiEachRequiredPoints.addType(t, e);
    return PhotoTargetCaptureUiEachRequiredPoints.endPhotoTargetCaptureUiEachRequiredPoints(t);
  }
}
exports.PhotoTargetCaptureUiEachRequiredPoints = PhotoTargetCaptureUiEachRequiredPoints;
//# sourceMappingURL=photo-target-capture-ui-each-required-points.js.map