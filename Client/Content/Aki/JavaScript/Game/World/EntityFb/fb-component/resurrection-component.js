"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResurrectionComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const pos_a_js_1 = require("../fb-action/pos-a.js");
const gravity_flip_teleport_config_js_1 = require("../fb-component/gravity-flip-teleport-config.js");
const union_trigger_shape_js_1 = require("../fb-shape/union-trigger-shape.js");
class ResurrectionComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsResurrectionComponent(t, e) {
    return (e || new ResurrectionComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsResurrectionComponent(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ResurrectionComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  teleportPos(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return (t || new pos_a_js_1.PosA()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  triggerShapeType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_trigger_shape_js_1.UnionTriggerShape.NONE;
    }
  }
  triggerShape(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  reviveId() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  gravityConfig(t) {
    var e = this.bb.__offset(this.bb_pos, 14);
    if (e) {
      return (t || new gravity_flip_teleport_config_js_1.GravityFlipTeleportConfig()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  static startResurrectionComponent(t) {
    t.startObject(6);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addTeleportPos(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addTriggerShapeType(t, e) {
    t.addFieldInt8(2, e, union_trigger_shape_js_1.UnionTriggerShape.NONE);
  }
  static addTriggerShape(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static addReviveId(t, e) {
    t.addFieldInt8(4, e, 0);
  }
  static addGravityConfig(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static endResurrectionComponent(t) {
    return t.endObject();
  }
}
exports.ResurrectionComponent = ResurrectionComponent;
//# sourceMappingURL=resurrection-component.js.map