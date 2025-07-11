"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnterOrbitalCameraControlByMove = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EnterOrbitalCameraControlByMove {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsEnterOrbitalCameraControlByMove(t, r) {
    return (r || new EnterOrbitalCameraControlByMove()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEnterOrbitalCameraControlByMove(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new EnterOrbitalCameraControlByMove()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  levelSequence(t) {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  blendInTime() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  blendOutTime() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  begEntity() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  endEntity() {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startEnterOrbitalCameraControlByMove(t) {
    t.startObject(6);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static addLevelSequence(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static addBlendInTime(t, r) {
    t.addFieldFloat32(2, r, 0);
  }
  static addBlendOutTime(t, r) {
    t.addFieldFloat32(3, r, 0);
  }
  static addBegEntity(t, r) {
    t.addFieldInt32(4, r, 0);
  }
  static addEndEntity(t, r) {
    t.addFieldInt32(5, r, 0);
  }
  static endEnterOrbitalCameraControlByMove(t) {
    return t.endObject();
  }
  static createEnterOrbitalCameraControlByMove(t, r, e, a, i, n, o) {
    EnterOrbitalCameraControlByMove.startEnterOrbitalCameraControlByMove(t);
    EnterOrbitalCameraControlByMove.addType(t, r);
    EnterOrbitalCameraControlByMove.addLevelSequence(t, e);
    EnterOrbitalCameraControlByMove.addBlendInTime(t, a);
    EnterOrbitalCameraControlByMove.addBlendOutTime(t, i);
    EnterOrbitalCameraControlByMove.addBegEntity(t, n);
    EnterOrbitalCameraControlByMove.addEndEntity(t, o);
    return EnterOrbitalCameraControlByMove.endEnterOrbitalCameraControlByMove(t);
  }
}
exports.EnterOrbitalCameraControlByMove = EnterOrbitalCameraControlByMove;
//# sourceMappingURL=enter-orbital-camera-control-by-move.js.map