"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdjustDialogCamera = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const base_curve_js_1 = require("../fb-action/base-curve.js");
const union_gravity_direction_js_1 = require("../fb-common/union-gravity-direction.js");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class AdjustDialogCamera {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsAdjustDialogCamera(t, i) {
    return (i || new AdjustDialogCamera()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsAdjustDialogCamera(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new AdjustDialogCamera()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  priority() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  fadeInTime() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  fadeInCurve(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return (t || new base_curve_js_1.BaseCurve()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  fadeOutTime() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  fadeOutCurve(t) {
    var i = this.bb.__offset(this.bb_pos, 14);
    if (i) {
      return (t || new base_curve_js_1.BaseCurve()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  armLength() {
    var t = this.bb.__offset(this.bb_pos, 16);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  minumArmLength() {
    var t = this.bb.__offset(this.bb_pos, 18);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  maxiumArmLength() {
    var t = this.bb.__offset(this.bb_pos, 20);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  offset(t) {
    var i = this.bb.__offset(this.bb_pos, 22);
    if (i) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  armOffset(t) {
    var i = this.bb.__offset(this.bb_pos, 24);
    if (i) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  fov() {
    var t = this.bb.__offset(this.bb_pos, 26);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  isDisableResetFocus() {
    var t = this.bb.__offset(this.bb_pos, 28);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  gravityDirectionType() {
    var t = this.bb.__offset(this.bb_pos, 30);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_gravity_direction_js_1.UnionGravityDirection.NONE;
    }
  }
  gravityDirection(t) {
    var i = this.bb.__offset(this.bb_pos, 32);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  yawAngle() {
    var t = this.bb.__offset(this.bb_pos, 34);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  pitchAngle() {
    var t = this.bb.__offset(this.bb_pos, 36);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  centerPos(t) {
    var i = this.bb.__offset(this.bb_pos, 38);
    if (i) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  static startAdjustDialogCamera(t) {
    t.startObject(18);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addPriority(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addFadeInTime(t, i) {
    t.addFieldFloat32(2, i, 0);
  }
  static addFadeInCurve(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addFadeOutTime(t, i) {
    t.addFieldFloat32(4, i, 0);
  }
  static addFadeOutCurve(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static addArmLength(t, i) {
    t.addFieldFloat32(6, i, 0);
  }
  static addMinumArmLength(t, i) {
    t.addFieldFloat32(7, i, 0);
  }
  static addMaxiumArmLength(t, i) {
    t.addFieldFloat32(8, i, 0);
  }
  static addOffset(t, i) {
    t.addFieldOffset(9, i, 0);
  }
  static addArmOffset(t, i) {
    t.addFieldOffset(10, i, 0);
  }
  static addFov(t, i) {
    t.addFieldFloat32(11, i, 0);
  }
  static addIsDisableResetFocus(t, i) {
    t.addFieldInt8(12, +i, 0);
  }
  static addGravityDirectionType(t, i) {
    t.addFieldInt8(13, i, union_gravity_direction_js_1.UnionGravityDirection.NONE);
  }
  static addGravityDirection(t, i) {
    t.addFieldOffset(14, i, 0);
  }
  static addYawAngle(t, i) {
    t.addFieldFloat32(15, i, 0);
  }
  static addPitchAngle(t, i) {
    t.addFieldFloat32(16, i, 0);
  }
  static addCenterPos(t, i) {
    t.addFieldOffset(17, i, 0);
  }
  static endAdjustDialogCamera(t) {
    return t.endObject();
  }
}
exports.AdjustDialogCamera = AdjustDialogCamera;
//# sourceMappingURL=adjust-dialog-camera.js.map