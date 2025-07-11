"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RangeSphere = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_online_player_condition_target_js_1 = require("../fb-condition/union-online-player-condition-target.js");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class RangeSphere {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsRangeSphere(t, e) {
    return (e || new RangeSphere()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsRangeSphere(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new RangeSphere()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  center(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  radius() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  onlinePlayerConditionTargetOptionType() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_online_player_condition_target_js_1.UnionOnlinePlayerConditionTarget.NONE;
    }
  }
  onlinePlayerConditionTargetOption(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startRangeSphere(t) {
    t.startObject(5);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addCenter(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addRadius(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static addOnlinePlayerConditionTargetOptionType(t, e) {
    t.addFieldInt8(3, e, union_online_player_condition_target_js_1.UnionOnlinePlayerConditionTarget.NONE);
  }
  static addOnlinePlayerConditionTargetOption(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static endRangeSphere(t) {
    return t.endObject();
  }
}
exports.RangeSphere = RangeSphere;
//# sourceMappingURL=range-sphere.js.map