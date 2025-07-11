"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnCollisionCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const trigger_count_config_js_1 = require("../fb-component/trigger-count-config.js");
class OnCollisionCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsOnCollisionCondition(t, i) {
    return (i || new OnCollisionCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsOnCollisionCondition(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new OnCollisionCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  bulletId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt64(this.bb_pos + t);
    } else {
      return BigInt("0");
    }
  }
  triggerCount(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return (t || new trigger_count_config_js_1.TriggerCountConfig()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  static startOnCollisionCondition(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addBulletId(t, i) {
    t.addFieldInt64(1, i, BigInt("0"));
  }
  static addTriggerCount(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static endOnCollisionCondition(t) {
    return t.endObject();
  }
}
exports.OnCollisionCondition = OnCollisionCondition;
//# sourceMappingURL=on-collision-condition.js.map