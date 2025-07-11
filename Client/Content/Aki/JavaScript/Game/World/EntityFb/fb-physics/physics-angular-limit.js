"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhysicsAngularLimit = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_angular_constraint_motion_js_1 = require("../fb-physics/union-angular-constraint-motion.js");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class PhysicsAngularLimit {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsPhysicsAngularLimit(t, i) {
    return (i || new PhysicsAngularLimit()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPhysicsAngularLimit(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new PhysicsAngularLimit()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  swing1MotionType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_angular_constraint_motion_js_1.UnionAngularConstraintMotion.NONE;
    }
  }
  swing1Motion(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  swing2MotionType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_angular_constraint_motion_js_1.UnionAngularConstraintMotion.NONE;
    }
  }
  swing2Motion(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  twistMotionType() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_angular_constraint_motion_js_1.UnionAngularConstraintMotion.NONE;
    }
  }
  twistMotion(t) {
    var i = this.bb.__offset(this.bb_pos, 14);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  angularRotationOffset(t) {
    var i = this.bb.__offset(this.bb_pos, 16);
    if (i) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  static startPhysicsAngularLimit(t) {
    t.startObject(7);
  }
  static addSwing1MotionType(t, i) {
    t.addFieldInt8(0, i, union_angular_constraint_motion_js_1.UnionAngularConstraintMotion.NONE);
  }
  static addSwing1Motion(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addSwing2MotionType(t, i) {
    t.addFieldInt8(2, i, union_angular_constraint_motion_js_1.UnionAngularConstraintMotion.NONE);
  }
  static addSwing2Motion(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addTwistMotionType(t, i) {
    t.addFieldInt8(4, i, union_angular_constraint_motion_js_1.UnionAngularConstraintMotion.NONE);
  }
  static addTwistMotion(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static addAngularRotationOffset(t, i) {
    t.addFieldOffset(6, i, 0);
  }
  static endPhysicsAngularLimit(t) {
    return t.endObject();
  }
}
exports.PhysicsAngularLimit = PhysicsAngularLimit;
//# sourceMappingURL=physics-angular-limit.js.map