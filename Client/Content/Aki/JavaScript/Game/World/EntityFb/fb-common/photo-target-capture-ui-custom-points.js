"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotoTargetCaptureUiCustomPoints = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class PhotoTargetCaptureUiCustomPoints {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, o) {
    this.bb_pos = t;
    this.bb = o;
    return this;
  }
  static getRootAsPhotoTargetCaptureUiCustomPoints(t, o) {
    return (o || new PhotoTargetCaptureUiCustomPoints()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPhotoTargetCaptureUiCustomPoints(t, o) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new PhotoTargetCaptureUiCustomPoints()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var o = this.bb.__offset(this.bb_pos, 4);
    if (o) {
      return this.bb.__string(this.bb_pos + o, t);
    } else {
      return undefined;
    }
  }
  points(t, o) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return (o || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  pointsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startPhotoTargetCaptureUiCustomPoints(t) {
    t.startObject(2);
  }
  static addType(t, o) {
    t.addFieldOffset(0, o, 0);
  }
  static addPoints(t, o) {
    t.addFieldOffset(1, o, 0);
  }
  static createPointsVector(o, s) {
    o.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      o.addOffset(s[t]);
    }
    return o.endVector();
  }
  static startPointsVector(t, o) {
    t.startVector(4, o, 4);
  }
  static endPhotoTargetCaptureUiCustomPoints(t) {
    return t.endObject();
  }
  static createPhotoTargetCaptureUiCustomPoints(t, o, s) {
    PhotoTargetCaptureUiCustomPoints.startPhotoTargetCaptureUiCustomPoints(t);
    PhotoTargetCaptureUiCustomPoints.addType(t, o);
    PhotoTargetCaptureUiCustomPoints.addPoints(t, s);
    return PhotoTargetCaptureUiCustomPoints.endPhotoTargetCaptureUiCustomPoints(t);
  }
}
exports.PhotoTargetCaptureUiCustomPoints = PhotoTargetCaptureUiCustomPoints;
//# sourceMappingURL=photo-target-capture-ui-custom-points.js.map