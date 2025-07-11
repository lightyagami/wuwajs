"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const flow_template_mode_js_1 = require("../fb-action/flow-template-mode.js");
const set_camera_anim_js_1 = require("../fb-action/set-camera-anim.js");
class CameraData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsCameraData(t, a) {
    return (a || new CameraData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCameraData(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new CameraData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  camera(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    if (a) {
      return (t || new flow_template_mode_js_1.FlowTemplateMode()).__init(this.bb.__indirect(this.bb_pos + a), this.bb);
    } else {
      return undefined;
    }
  }
  cameraAnim(t) {
    var a = this.bb.__offset(this.bb_pos, 6);
    if (a) {
      return (t || new set_camera_anim_js_1.SetCameraAnim()).__init(this.bb.__indirect(this.bb_pos + a), this.bb);
    } else {
      return undefined;
    }
  }
  static startCameraData(t) {
    t.startObject(2);
  }
  static addCamera(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static addCameraAnim(t, a) {
    t.addFieldOffset(1, a, 0);
  }
  static endCameraData(t) {
    return t.endObject();
  }
}
exports.CameraData = CameraData;
//# sourceMappingURL=camera-data.js.map