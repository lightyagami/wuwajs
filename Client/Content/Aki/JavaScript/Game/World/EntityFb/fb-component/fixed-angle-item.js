"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FixedAngleItem = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FixedAngleItem {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsFixedAngleItem(e, t) {
    return (t || new FixedAngleItem()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsFixedAngleItem(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new FixedAngleItem()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  initAngle() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  targetAngle() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  rotateAngle() {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startFixedAngleItem(e) {
    e.startObject(3);
  }
  static addInitAngle(e, t) {
    e.addFieldInt32(0, t, 0);
  }
  static addTargetAngle(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addRotateAngle(e, t) {
    e.addFieldInt32(2, t, 0);
  }
  static endFixedAngleItem(e) {
    return e.endObject();
  }
  static createFixedAngleItem(e, t, i, s) {
    FixedAngleItem.startFixedAngleItem(e);
    FixedAngleItem.addInitAngle(e, t);
    FixedAngleItem.addTargetAngle(e, i);
    FixedAngleItem.addRotateAngle(e, s);
    return FixedAngleItem.endFixedAngleItem(e);
  }
}
exports.FixedAngleItem = FixedAngleItem;
//# sourceMappingURL=fixed-angle-item.js.map