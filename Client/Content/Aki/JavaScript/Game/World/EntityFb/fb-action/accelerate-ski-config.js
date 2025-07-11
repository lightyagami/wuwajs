"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccelerateSkiConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_target_entity_js_1 = require("../fb-action/union-target-entity.js");
class AccelerateSkiConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsAccelerateSkiConfig(t, e) {
    return (e || new AccelerateSkiConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsAccelerateSkiConfig(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new AccelerateSkiConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  targetType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_target_entity_js_1.UnionTargetEntity.NONE;
    }
  }
  target(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  duration() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  limitSpeed() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  acceleration() {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  instantSpeed() {
    var t = this.bb.__offset(this.bb_pos, 16);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startAccelerateSkiConfig(t) {
    t.startObject(7);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addTargetType(t, e) {
    t.addFieldInt8(1, e, union_target_entity_js_1.UnionTargetEntity.NONE);
  }
  static addTarget(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addDuration(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static addLimitSpeed(t, e) {
    t.addFieldInt32(4, e, 0);
  }
  static addAcceleration(t, e) {
    t.addFieldInt32(5, e, 0);
  }
  static addInstantSpeed(t, e) {
    t.addFieldInt32(6, e, 0);
  }
  static endAccelerateSkiConfig(t) {
    return t.endObject();
  }
  static createAccelerateSkiConfig(t, e, i, r, s, a, c, n) {
    AccelerateSkiConfig.startAccelerateSkiConfig(t);
    AccelerateSkiConfig.addType(t, e);
    AccelerateSkiConfig.addTargetType(t, i);
    AccelerateSkiConfig.addTarget(t, r);
    AccelerateSkiConfig.addDuration(t, s);
    AccelerateSkiConfig.addLimitSpeed(t, a);
    AccelerateSkiConfig.addAcceleration(t, c);
    AccelerateSkiConfig.addInstantSpeed(t, n);
    return AccelerateSkiConfig.endAccelerateSkiConfig(t);
  }
}
exports.AccelerateSkiConfig = AccelerateSkiConfig;
//# sourceMappingURL=accelerate-ski-config.js.map