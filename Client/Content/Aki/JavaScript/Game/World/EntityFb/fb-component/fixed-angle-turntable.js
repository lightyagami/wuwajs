"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FixedAngleTurntable = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const fixed_angle_item_js_1 = require("../fb-component/fixed-angle-item.js");
class FixedAngleTurntable {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsFixedAngleTurntable(t, e) {
    return (e || new FixedAngleTurntable()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFixedAngleTurntable(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new FixedAngleTurntable()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  rotationSpeed() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  itemConfig(t, e) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return (e || new fixed_angle_item_js_1.FixedAngleItem()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  itemConfigLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startFixedAngleTurntable(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addRotationSpeed(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addItemConfig(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createItemConfigVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addOffset(i[t]);
    }
    return e.endVector();
  }
  static startItemConfigVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endFixedAngleTurntable(t) {
    return t.endObject();
  }
  static createFixedAngleTurntable(t, e, i, r) {
    FixedAngleTurntable.startFixedAngleTurntable(t);
    FixedAngleTurntable.addType(t, e);
    FixedAngleTurntable.addRotationSpeed(t, i);
    FixedAngleTurntable.addItemConfig(t, r);
    return FixedAngleTurntable.endFixedAngleTurntable(t);
  }
}
exports.FixedAngleTurntable = FixedAngleTurntable;
//# sourceMappingURL=fixed-angle-turntable.js.map