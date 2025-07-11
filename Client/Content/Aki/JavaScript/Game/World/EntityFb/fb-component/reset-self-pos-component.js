"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetSelfPosComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ResetSelfPosComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsResetSelfPosComponent(e, t) {
    return (t || new ResetSelfPosComponent()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsResetSelfPosComponent(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new ResetSelfPosComponent()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  disabled() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  resetRadius() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readFloat32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  isDisableResetPosAfterThrow() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  isResetPosAfterThrow() {
    var e = this.bb.__offset(this.bb_pos, 10);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  resetPosDelayTime() {
    var e = this.bb.__offset(this.bb_pos, 12);
    if (e) {
      return this.bb.readFloat32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startResetSelfPosComponent(e) {
    e.startObject(5);
  }
  static addDisabled(e, t) {
    e.addFieldInt8(0, +t, 0);
  }
  static addResetRadius(e, t) {
    e.addFieldFloat32(1, t, 0);
  }
  static addIsDisableResetPosAfterThrow(e, t) {
    e.addFieldInt8(2, +t, 0);
  }
  static addIsResetPosAfterThrow(e, t) {
    e.addFieldInt8(3, +t, 0);
  }
  static addResetPosDelayTime(e, t) {
    e.addFieldFloat32(4, t, 0);
  }
  static endResetSelfPosComponent(e) {
    return e.endObject();
  }
  static createResetSelfPosComponent(e, t, s, o, i, r) {
    ResetSelfPosComponent.startResetSelfPosComponent(e);
    ResetSelfPosComponent.addDisabled(e, t);
    ResetSelfPosComponent.addResetRadius(e, s);
    ResetSelfPosComponent.addIsDisableResetPosAfterThrow(e, o);
    ResetSelfPosComponent.addIsResetPosAfterThrow(e, i);
    ResetSelfPosComponent.addResetPosDelayTime(e, r);
    return ResetSelfPosComponent.endResetSelfPosComponent(e);
  }
}
exports.ResetSelfPosComponent = ResetSelfPosComponent;
//# sourceMappingURL=reset-self-pos-component.js.map