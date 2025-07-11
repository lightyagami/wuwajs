"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdjustPlayerCamera = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_adjust_player_camera_option_js_1 = require("../fb-action/union-adjust-player-camera-option.js");
class AdjustPlayerCamera {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsAdjustPlayerCamera(t, a) {
    return (a || new AdjustPlayerCamera()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsAdjustPlayerCamera(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new AdjustPlayerCamera()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  optionType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_adjust_player_camera_option_js_1.UnionAdjustPlayerCameraOption.NONE;
    }
  }
  option(t) {
    var a = this.bb.__offset(this.bb_pos, 6);
    if (a) {
      return this.bb.__union(t, this.bb_pos + a);
    } else {
      return undefined;
    }
  }
  static startAdjustPlayerCamera(t) {
    t.startObject(2);
  }
  static addOptionType(t, a) {
    t.addFieldInt8(0, a, union_adjust_player_camera_option_js_1.UnionAdjustPlayerCameraOption.NONE);
  }
  static addOption(t, a) {
    t.addFieldOffset(1, a, 0);
  }
  static endAdjustPlayerCamera(t) {
    return t.endObject();
  }
  static createAdjustPlayerCamera(t, a, e) {
    AdjustPlayerCamera.startAdjustPlayerCamera(t);
    AdjustPlayerCamera.addOptionType(t, a);
    AdjustPlayerCamera.addOption(t, e);
    return AdjustPlayerCamera.endAdjustPlayerCamera(t);
  }
}
exports.AdjustPlayerCamera = AdjustPlayerCamera;
//# sourceMappingURL=adjust-player-camera.js.map