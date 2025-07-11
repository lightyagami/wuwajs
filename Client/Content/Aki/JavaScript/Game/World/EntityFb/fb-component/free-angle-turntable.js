"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FreeAngleTurntable = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const free_angle_item_js_1 = require("../fb-component/free-angle-item.js");
class FreeAngleTurntable {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsFreeAngleTurntable(e, t) {
    return (t || new FreeAngleTurntable()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsFreeAngleTurntable(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new FreeAngleTurntable()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  rotationSpeed() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  itemConfig(e, t) {
    var r = this.bb.__offset(this.bb_pos, 8);
    if (r) {
      return (t || new free_angle_item_js_1.FreeAngleItem()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + e * 4), this.bb);
    } else {
      return undefined;
    }
  }
  itemConfigLength() {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__vector_len(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  intervalAngle() {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startFreeAngleTurntable(e) {
    e.startObject(4);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addRotationSpeed(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addItemConfig(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static createItemConfigVector(t, r) {
    t.startVector(4, r.length, 4);
    for (let e = r.length - 1; e >= 0; e--) {
      t.addOffset(r[e]);
    }
    return t.endVector();
  }
  static startItemConfigVector(e, t) {
    e.startVector(4, t, 4);
  }
  static addIntervalAngle(e, t) {
    e.addFieldInt32(3, t, 0);
  }
  static endFreeAngleTurntable(e) {
    return e.endObject();
  }
  static createFreeAngleTurntable(e, t, r, n, i) {
    FreeAngleTurntable.startFreeAngleTurntable(e);
    FreeAngleTurntable.addType(e, t);
    FreeAngleTurntable.addRotationSpeed(e, r);
    FreeAngleTurntable.addItemConfig(e, n);
    FreeAngleTurntable.addIntervalAngle(e, i);
    return FreeAngleTurntable.endFreeAngleTurntable(e);
  }
}
exports.FreeAngleTurntable = FreeAngleTurntable;
//# sourceMappingURL=free-angle-turntable.js.map