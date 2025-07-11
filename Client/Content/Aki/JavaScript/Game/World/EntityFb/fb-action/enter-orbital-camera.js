"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnterOrbitalCamera = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_enter_orbital_camera_option_js_1 = require("../fb-action/union-enter-orbital-camera-option.js");
class EnterOrbitalCamera {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsEnterOrbitalCamera(t, r) {
    return (r || new EnterOrbitalCamera()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEnterOrbitalCamera(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new EnterOrbitalCamera()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  optionType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_enter_orbital_camera_option_js_1.UnionEnterOrbitalCameraOption.NONE;
    }
  }
  option(t) {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return this.bb.__union(t, this.bb_pos + r);
    } else {
      return undefined;
    }
  }
  static startEnterOrbitalCamera(t) {
    t.startObject(2);
  }
  static addOptionType(t, r) {
    t.addFieldInt8(0, r, union_enter_orbital_camera_option_js_1.UnionEnterOrbitalCameraOption.NONE);
  }
  static addOption(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static endEnterOrbitalCamera(t) {
    return t.endObject();
  }
  static createEnterOrbitalCamera(t, r, e) {
    EnterOrbitalCamera.startEnterOrbitalCamera(t);
    EnterOrbitalCamera.addOptionType(t, r);
    EnterOrbitalCamera.addOption(t, e);
    return EnterOrbitalCamera.endEnterOrbitalCamera(t);
  }
}
exports.EnterOrbitalCamera = EnterOrbitalCamera;
//# sourceMappingURL=enter-orbital-camera.js.map