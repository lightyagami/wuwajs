"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetPlayerCameraFocus = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_reset_player_focus_type_js_1 = require("../fb-action/union-reset-player-focus-type.js");
class ResetPlayerCameraFocus {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsResetPlayerCameraFocus(e, t) {
    return (t || new ResetPlayerCameraFocus()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsResetPlayerCameraFocus(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new ResetPlayerCameraFocus()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  resetTypeType() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_reset_player_focus_type_js_1.UnionResetPlayerFocusType.NONE;
    }
  }
  resetType(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__union(e, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  fadeInTime() {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readFloat32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  cannotInterrupt() {
    var e = this.bb.__offset(this.bb_pos, 10);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  duration() {
    var e = this.bb.__offset(this.bb_pos, 12);
    if (e) {
      return this.bb.readFloat32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startResetPlayerCameraFocus(e) {
    e.startObject(5);
  }
  static addResetTypeType(e, t) {
    e.addFieldInt8(0, t, union_reset_player_focus_type_js_1.UnionResetPlayerFocusType.NONE);
  }
  static addResetType(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static addFadeInTime(e, t) {
    e.addFieldFloat32(2, t, 0);
  }
  static addCannotInterrupt(e, t) {
    e.addFieldInt8(3, +t, 0);
  }
  static addDuration(e, t) {
    e.addFieldFloat32(4, t, 0);
  }
  static endResetPlayerCameraFocus(e) {
    return e.endObject();
  }
  static createResetPlayerCameraFocus(e, t, s, r, a, i) {
    ResetPlayerCameraFocus.startResetPlayerCameraFocus(e);
    ResetPlayerCameraFocus.addResetTypeType(e, t);
    ResetPlayerCameraFocus.addResetType(e, s);
    ResetPlayerCameraFocus.addFadeInTime(e, r);
    ResetPlayerCameraFocus.addCannotInterrupt(e, a);
    ResetPlayerCameraFocus.addDuration(e, i);
    return ResetPlayerCameraFocus.endResetPlayerCameraFocus(e);
  }
}
exports.ResetPlayerCameraFocus = ResetPlayerCameraFocus;
//# sourceMappingURL=reset-player-camera-focus.js.map