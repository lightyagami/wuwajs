"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BeamCastComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const cylinder_trigger_shape_js_1 = require("../fb-shape/cylinder-trigger-shape.js");
class BeamCastComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsBeamCastComponent(t, e) {
    return (e || new BeamCastComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBeamCastComponent(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new BeamCastComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  effectPath(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  delayDestroyEffect() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  hitEffectPath(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  range(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    if (e) {
      return (t || new cylinder_trigger_shape_js_1.CylinderTriggerShape()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  targetState(t) {
    var e = this.bb.__offset(this.bb_pos, 14);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  ignoreMonsterCollision() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startBeamCastComponent(t) {
    t.startObject(7);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addEffectPath(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addDelayDestroyEffect(t, e) {
    t.addFieldInt8(2, +e, 0);
  }
  static addHitEffectPath(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static addRange(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static addTargetState(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static addIgnoreMonsterCollision(t, e) {
    t.addFieldInt8(6, +e, 0);
  }
  static endBeamCastComponent(t) {
    return t.endObject();
  }
}
exports.BeamCastComponent = BeamCastComponent;
//# sourceMappingURL=beam-cast-component.js.map