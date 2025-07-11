"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhysicsConstraintComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_physics_attach_target_js_1 = require("../fb-component/union-physics-attach-target.js");
const physics_angular_limit_js_1 = require("../fb-physics/physics-angular-limit.js");
class PhysicsConstraintComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsPhysicsConstraintComponent(t, s) {
    return (s || new PhysicsConstraintComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPhysicsConstraintComponent(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new PhysicsConstraintComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  effectPath(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  attachTargetType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_physics_attach_target_js_1.UnionPhysicsAttachTarget.NONE;
    }
  }
  attachTarget(t) {
    var s = this.bb.__offset(this.bb_pos, 10);
    if (s) {
      return this.bb.__union(t, this.bb_pos + s);
    } else {
      return undefined;
    }
  }
  angularLimit(t) {
    var s = this.bb.__offset(this.bb_pos, 12);
    if (s) {
      return (t || new physics_angular_limit_js_1.PhysicsAngularLimit()).__init(this.bb.__indirect(this.bb_pos + s), this.bb);
    } else {
      return undefined;
    }
  }
  dampingCoefficient() {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startPhysicsConstraintComponent(t) {
    t.startObject(6);
  }
  static addDisabled(t, s) {
    t.addFieldInt8(0, +s, 0);
  }
  static addEffectPath(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static addAttachTargetType(t, s) {
    t.addFieldInt8(2, s, union_physics_attach_target_js_1.UnionPhysicsAttachTarget.NONE);
  }
  static addAttachTarget(t, s) {
    t.addFieldOffset(3, s, 0);
  }
  static addAngularLimit(t, s) {
    t.addFieldOffset(4, s, 0);
  }
  static addDampingCoefficient(t, s) {
    t.addFieldFloat32(5, s, 0);
  }
  static endPhysicsConstraintComponent(t) {
    return t.endObject();
  }
}
exports.PhysicsConstraintComponent = PhysicsConstraintComponent;
//# sourceMappingURL=physics-constraint-component.js.map