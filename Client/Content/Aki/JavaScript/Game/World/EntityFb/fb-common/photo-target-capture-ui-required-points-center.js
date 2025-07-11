"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotoTargetCaptureUiRequiredPointsCenter = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PhotoTargetCaptureUiRequiredPointsCenter {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsPhotoTargetCaptureUiRequiredPointsCenter(t, e) {
    return (e || new PhotoTargetCaptureUiRequiredPointsCenter()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPhotoTargetCaptureUiRequiredPointsCenter(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new PhotoTargetCaptureUiRequiredPointsCenter()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startPhotoTargetCaptureUiRequiredPointsCenter(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endPhotoTargetCaptureUiRequiredPointsCenter(t) {
    return t.endObject();
  }
  static createPhotoTargetCaptureUiRequiredPointsCenter(t, e) {
    PhotoTargetCaptureUiRequiredPointsCenter.startPhotoTargetCaptureUiRequiredPointsCenter(t);
    PhotoTargetCaptureUiRequiredPointsCenter.addType(t, e);
    return PhotoTargetCaptureUiRequiredPointsCenter.endPhotoTargetCaptureUiRequiredPointsCenter(t);
  }
}
exports.PhotoTargetCaptureUiRequiredPointsCenter = PhotoTargetCaptureUiRequiredPointsCenter;
//# sourceMappingURL=photo-target-capture-ui-required-points-center.js.map