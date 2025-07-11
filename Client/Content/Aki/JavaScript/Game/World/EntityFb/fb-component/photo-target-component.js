"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotoTargetComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_photo_target_capture_ui_js_1 = require("../fb-common/union-photo-target-capture-ui.js");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class PhotoTargetComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsPhotoTargetComponent(t, e) {
    return (e || new PhotoTargetComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPhotoTargetComponent(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new PhotoTargetComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  requiredPoints(t, e) {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return (e || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  requiredPointsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  targetCapturePromptUiType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_photo_target_capture_ui_js_1.UnionPhotoTargetCaptureUi.NONE;
    }
  }
  targetCapturePromptUi(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  rayCastIgnoreEntities(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    if (e) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + t * 4);
    } else {
      return 0;
    }
  }
  rayCastIgnoreEntitiesLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  rayCastIgnoreEntitiesArray() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  static startPhotoTargetComponent(t) {
    t.startObject(5);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addRequiredPoints(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createRequiredPointsVector(e, r) {
    e.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      e.addOffset(r[t]);
    }
    return e.endVector();
  }
  static startRequiredPointsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addTargetCapturePromptUiType(t, e) {
    t.addFieldInt8(2, e, union_photo_target_capture_ui_js_1.UnionPhotoTargetCaptureUi.NONE);
  }
  static addTargetCapturePromptUi(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static addRayCastIgnoreEntities(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static createRayCastIgnoreEntitiesVector(e, r) {
    e.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      e.addInt32(r[t]);
    }
    return e.endVector();
  }
  static startRayCastIgnoreEntitiesVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endPhotoTargetComponent(t) {
    return t.endObject();
  }
  static createPhotoTargetComponent(t, e, r, o, i, s) {
    PhotoTargetComponent.startPhotoTargetComponent(t);
    PhotoTargetComponent.addDisabled(t, e);
    PhotoTargetComponent.addRequiredPoints(t, r);
    PhotoTargetComponent.addTargetCapturePromptUiType(t, o);
    PhotoTargetComponent.addTargetCapturePromptUi(t, i);
    PhotoTargetComponent.addRayCastIgnoreEntities(t, s);
    return PhotoTargetComponent.endPhotoTargetComponent(t);
  }
}
exports.PhotoTargetComponent = PhotoTargetComponent;
//# sourceMappingURL=photo-target-component.js.map