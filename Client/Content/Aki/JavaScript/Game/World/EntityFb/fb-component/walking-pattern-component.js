"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WalkingPatternComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class WalkingPatternComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, n) {
    this.bb_pos = t;
    this.bb = n;
    return this;
  }
  static getRootAsWalkingPatternComponent(t, n) {
    return (n || new WalkingPatternComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsWalkingPatternComponent(t, n) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (n || new WalkingPatternComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  splineEntityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  endEntityId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  scoreVarType() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_var_ref_js_1.UnionVarRef.NONE;
    }
  }
  scoreVar(t) {
    var n = this.bb.__offset(this.bb_pos, 12);
    if (n) {
      return this.bb.__union(t, this.bb_pos + n);
    } else {
      return undefined;
    }
  }
  spineEffectExistDuration() {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  replaySpineEffect(t) {
    var n = this.bb.__offset(this.bb_pos, 16);
    if (n) {
      return this.bb.__string(this.bb_pos + n, t);
    } else {
      return undefined;
    }
  }
  static startWalkingPatternComponent(t) {
    t.startObject(7);
  }
  static addDisabled(t, n) {
    t.addFieldInt8(0, +n, 0);
  }
  static addSplineEntityId(t, n) {
    t.addFieldInt32(1, n, 0);
  }
  static addEndEntityId(t, n) {
    t.addFieldInt32(2, n, 0);
  }
  static addScoreVarType(t, n) {
    t.addFieldInt8(3, n, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addScoreVar(t, n) {
    t.addFieldOffset(4, n, 0);
  }
  static addSpineEffectExistDuration(t, n) {
    t.addFieldFloat32(5, n, 0);
  }
  static addReplaySpineEffect(t, n) {
    t.addFieldOffset(6, n, 0);
  }
  static endWalkingPatternComponent(t) {
    return t.endObject();
  }
  static createWalkingPatternComponent(t, n, e, i, r, a, s, o) {
    WalkingPatternComponent.startWalkingPatternComponent(t);
    WalkingPatternComponent.addDisabled(t, n);
    WalkingPatternComponent.addSplineEntityId(t, e);
    WalkingPatternComponent.addEndEntityId(t, i);
    WalkingPatternComponent.addScoreVarType(t, r);
    WalkingPatternComponent.addScoreVar(t, a);
    WalkingPatternComponent.addSpineEffectExistDuration(t, s);
    WalkingPatternComponent.addReplaySpineEffect(t, o);
    return WalkingPatternComponent.endWalkingPatternComponent(t);
  }
}
exports.WalkingPatternComponent = WalkingPatternComponent;
//# sourceMappingURL=walking-pattern-component.js.map