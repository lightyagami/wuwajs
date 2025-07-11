"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RestorePlayerCameraAdjustment = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const reset_focus_config_js_1 = require("../fb-action/reset-focus-config.js");
class RestorePlayerCameraAdjustment {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsRestorePlayerCameraAdjustment(e, t) {
    return (t || new RestorePlayerCameraAdjustment()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsRestorePlayerCameraAdjustment(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new RestorePlayerCameraAdjustment()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  resetFocus(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return (e || new reset_focus_config_js_1.ResetFocusConfig()).__init(this.bb.__indirect(this.bb_pos + t), this.bb);
    } else {
      return undefined;
    }
  }
  static startRestorePlayerCameraAdjustment(e) {
    e.startObject(1);
  }
  static addResetFocus(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endRestorePlayerCameraAdjustment(e) {
    return e.endObject();
  }
  static createRestorePlayerCameraAdjustment(e, t) {
    RestorePlayerCameraAdjustment.startRestorePlayerCameraAdjustment(e);
    RestorePlayerCameraAdjustment.addResetFocus(e, t);
    return RestorePlayerCameraAdjustment.endRestorePlayerCameraAdjustment(e);
  }
}
exports.RestorePlayerCameraAdjustment = RestorePlayerCameraAdjustment;
//# sourceMappingURL=restore-player-camera-adjustment.js.map