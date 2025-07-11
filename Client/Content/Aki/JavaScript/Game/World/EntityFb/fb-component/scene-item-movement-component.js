"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemMovementComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_movement_mode_js_1 = require("../fb-component/union-movement-mode.js");
class SceneItemMovementComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsSceneItemMovementComponent(e, t) {
    return (t || new SceneItemMovementComponent()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsSceneItemMovementComponent(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new SceneItemMovementComponent()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  disabled() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  patrolType() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_movement_mode_js_1.UnionMovementMode.NONE;
    }
  }
  patrol(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__union(e, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  static startSceneItemMovementComponent(e) {
    e.startObject(3);
  }
  static addDisabled(e, t) {
    e.addFieldInt8(0, +t, 0);
  }
  static addPatrolType(e, t) {
    e.addFieldInt8(1, t, union_movement_mode_js_1.UnionMovementMode.NONE);
  }
  static addPatrol(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static endSceneItemMovementComponent(e) {
    return e.endObject();
  }
  static createSceneItemMovementComponent(e, t, n, o) {
    SceneItemMovementComponent.startSceneItemMovementComponent(e);
    SceneItemMovementComponent.addDisabled(e, t);
    SceneItemMovementComponent.addPatrolType(e, n);
    SceneItemMovementComponent.addPatrol(e, o);
    return SceneItemMovementComponent.endSceneItemMovementComponent(e);
  }
}
exports.SceneItemMovementComponent = SceneItemMovementComponent;
//# sourceMappingURL=scene-item-movement-component.js.map